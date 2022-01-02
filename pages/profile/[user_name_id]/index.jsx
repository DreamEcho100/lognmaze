import { useCallback, useEffect, useReducer, useState } from 'react';
import { useRouter } from 'next/router';

import { getCookie } from '@lib/v1/cookie';

import { useAppSharedState } from '@store/AppContext';
import AppTypes from '@store/AppContext/types';
import { useUserSharedState } from '@store/UserContext';

import Profile from '@components/Profile';
import pg from '@lib/v1/pg';

const ProfilePage = ({ user = {}, ...props }) => {
	const router = useRouter();

	const INIT = 'INIT';
	const IS_LOADING = 'IS_LOADING';
	const IS_NOT_LOADING = 'IS_NOT_LOADING';
	const SETTING_USER_AND_POSTS_DATA = 'SETTING_USER_AND_POSTS_DATA';
	const SETTING_AUTHORIZATION_AND_IDENTITY =
		'SETTING_AUTHORIZATION_AND_IDENTITY';

	const GUEST = 'GUEST';
	const OWNER = 'OWNER';

	const profileInitialState = {
		userData: {},
		formattedPosts: [],
		newsFetchRouteQuery: '',
		visitorIdentity: 'Guest',
		isAuthorized: false,
		isLoading: true,
	};

	const profileReducer = (state, action) => {
		switch (action.type) {
			case INIT: {
				return profileInitialState;
			}

			case IS_LOADING: {
				if (!state.isLoading)
					return {
						...state,
						isLoading: true,
					};

				return state;
			}

			case IS_NOT_LOADING: {
				if (state.isLoading)
					return {
						...state,
						isLoading: false,
					};

				return state;
			}

			case SETTING_USER_AND_POSTS_DATA: {
				const {
					userData,
					newsFetchRouteQuery,
					formattedPosts,
					visitorIdentity,
					isAuthorized,
				} = action.payload;

				if (
					state.userData.id !== userData.id ||
					state.newsFetchRouteQuery !== newsFetchRouteQuery ||
					state.formattedPosts.reduce(
						(currString, currPost) => currString + currPost.updated_at,
						''
					) !==
						formattedPosts.reduce(
							(currString, currPost) => currString + currPost.updated_at,
							''
						) ||
					state.visitorIdentity !== visitorIdentity ||
					state.isAuthorized !== isAuthorized
				)
					return {
						...state,
						userData,
						newsFetchRouteQuery,
						formattedPosts,
						visitorIdentity,
						isAuthorized,
						isLoading: false,
					};

				return state;
			}

			case SETTING_AUTHORIZATION_AND_IDENTITY: {
				const { visitorIdentity, isAuthorized } = action.payload;

				if (
					state.visitorIdentity !== visitorIdentity ||
					state.isAuthorized !== isAuthorized
				)
					return {
						...state,
						visitorIdentity,
						isAuthorized,
					};

				return state;
			}

			default: {
				return state;
			}
		}
	};

	const [profileState, profileDispatch] = useReducer(
		profileReducer,
		profileInitialState
	);
	const [userState, userDispatch] = useUserSharedState();

	const handleSettingAuthorizationAndIdentity = useCallback(() => {
		const payload = {
			visitorIdentity: GUEST,
			isAuthorized: false,
		};

		if (
			userState.userExist &&
			router.query.user_name_id === userState.user.user_name_id
		) {
			payload.visitorIdentity = OWNER;
			payload.isAuthorized = true;
		}

		profileDispatch({
			type: SETTING_AUTHORIZATION_AND_IDENTITY,
			payload,
		});
	}, [
		profileDispatch,
		userState.user,
		router.query.user_name_id,
		userState.userExist,
	]);

	const handleSettingUserAndPostsData = useCallback(() => {
		const userData = user?.data?.id ? user.data : {};
		const newsFetchRouteQuery = props.newsFetchRouteQuery || '';
		const formattedPosts = [];
		const visitorIdentity =
			!userState.userExist ||
			router.query.user_name_id !== userState.user?.user_name_id
				? GUEST
				: OWNER;
		const isAuthorized =
			!userState.userExist ||
			router.query.user_name_id !== userState.user?.user_name_id
				? false
				: true;

		if (props?.posts?.length !== 0) {
			props.posts.forEach((obj) => {
				const formattedItem = {};
				let itemA;
				for (itemA in obj) {
					if (itemA !== 'type_data') {
						formattedItem[itemA] = obj[itemA];
					} else {
						let itemB;
						for (itemB in obj['type_data']) {
							formattedItem[itemB] = obj.type_data[itemB];
						}
					}
				}

				formattedPosts.push(formattedItem);
			});

			profileDispatch({
				type: SETTING_USER_AND_POSTS_DATA,
				payload: {
					userData,
					newsFetchRouteQuery,
					formattedPosts,
					visitorIdentity,
					isAuthorized,
				},
			});
		}
	}, [
		profileDispatch,
		userState.user?.user_name_id,
		user.data,
		props.newsFetchRouteQuery,
		userState.userExist,
		router.query.user_name_id,
		props?.posts,
	]);

	useEffect(() => {
		if (!router.isReady && userState.isVerifyingUserLoading) return;

		handleSettingUserAndPostsData();
	}, [
		router.isReady,
		handleSettingUserAndPostsData,
		userState.isVerifyingUserLoading,
	]);

	useEffect(() => {
		if (userState.isVerifyingUserLoading) return;

		handleSettingAuthorizationAndIdentity();
	}, [
		userState.userExist,
		router.query.user_name_id,
		userState.isVerifyingUserLoading,
		userState.user?.user_name_id,
		handleSettingAuthorizationAndIdentity,
	]);

	return (
		<Profile
			userData={profileState.userData}
			isLoadingSkeleton={profileState.isLoading}
			visitorIdentity={profileState.visitorIdentity}
			news={profileState.formattedPosts}
			newsFetchRouteQuery={profileState.newsFetchRouteQuery}
		/>
	);
};

export const getServerSideProps = async ({ req, res, query }) => {
	const GUEST = 'GUEST';
	const OWNER = 'OWNER';
	let newsFetchRouteQuery = '';

	const fetcher = async (tokenCookieString, userCookieString, user_name_id) => {
		const input = `${process.env.BACK_END_ROOT_URL}/api/v1/users/user/?user_name_id=${user_name_id}`;

		let user;
		let userCookieObj;
		let visitor_id;

		if (tokenCookieString.length !== 0 && userCookieString.length !== 0) {
			userCookieObj = JSON.parse(userCookieString);
			if (userCookieObj?.id) visitor_id = userCookieObj.id;
		}

		try {
			user = await pg.users
				.get({
					filterBy: [
						[
							{
								name: 'user_name_id',
								value: user_name_id,
								// priority: 'AND',
							},
						],
					],
				})
				.then((data) => {
					data[0].last_sign_in = '' + data[0].last_sign_in;
					data[0].created_at = '' + data[0].created_at;

					return {
						status: 'succuss',
						data: data[0],
					};
				});
		} catch (error) {
			console.error(error);
			return {
				status: 'error',
				message: error.message,
				data: {},
				isAuthorized: false,
				visitorIdentity:
					userCookieObj.user_name_id === user_name_id ? OWNER : GUEST,
			};
		}

		if (!user?.data?.id || user?.status === 'error') {
			return {
				user,
				posts: {
					status: 'error',
					message: "Can't get the posts!",
					data: { news: undefined },
				},
			};
		}

		if (user?.data?.id)
			newsFetchRouteQuery += `/?filter_by_user_id=${user.data.id}`;
		else if (userCookieObj?.id && userCookieObj?.user_name_id === user_name_id)
			newsFetchRouteQuery += `/?filter_by_user_id=${userCookieObj.id}`;

		if (visitor_id) {
			if (newsFetchRouteQuery.length !== 0)
				newsFetchRouteQuery += `&voter_id=${visitor_id}`;
			else newsFetchRouteQuery += `/?voter_id=${visitor_id}`;
		}

		const posts = await fetch(
			`${process.env.BACK_END_ROOT_URL}/api/v1/news${newsFetchRouteQuery}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
			.then((response) => response.json())
			.catch((error) => {
				console.error(error);
				return {
					status: 'error',
					message: error.message || 'Something went wrong!',
					data: [],
				};
			});

		return {
			user: {
				...user,
				isAuthorized: user.data.user_name_id === user_name_id ? true : false,
				visitorIdentity:
					user.data.user_name_id === user_name_id ? OWNER : GUEST,
			},
			posts,
		};
	};

	let tokenCookieString = '';
	let userCookieString = '';
	if (req.headers.cookie) {
		tokenCookieString = getCookie({
			cookieName: 'user_token',
			cookieString: req.headers.cookie,
		});
		userCookieString = getCookie({
			cookieName: 'user_data',
			cookieString: req.headers.cookie,
		});
	}

	const data = await fetcher(
		tokenCookieString,
		userCookieString,
		query.user_name_id
	);

	return {
		props: {
			user: data.user ? data.user : {},
			posts: data?.posts?.data?.news ? data.posts.data.news : [],
			newsFetchRouteQuery,
		},
	};
};

export default ProfilePage;
