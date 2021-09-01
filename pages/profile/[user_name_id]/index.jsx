import { useContext, useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getCookie } from '@lib/v1/cookie';

import UserContext from '@store/UserContext';

// const DynamicProfile = dynamic(() => import('@components/Profile'));
import Profile from '@components/Profile';

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const ProfilePage = ({ user = {}, ...props }) => {
	const router = useRouter();

	const { state: userState } = useContext(UserContext);

	const [newsFetchRouteQuery, setNewsFetchRouteQuery] = useState(
		props.newsFetchRouteQuery
	);

	const [posts, setPosts] = useState(
		props.posts.length !== 0
			? // props.posts.data.reverse()
			  (() => {
					const formattedData = props.posts.map((obj) => {
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

						return formattedItem;
					});

					// return formattedData.reverse();
					return formattedData;
			  })()
			: []
	);
	const [handleIsAuthorized, setHandleIsAuthorized] = useState(
		user.isAuthorized
	);
	const [identity, setIdentity] = useState(user.visitorIdentity || GUEST);
	const [userData, setUserData] = useState(user.data);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(async () => {
		if (userState.isVerifyingUserLoading || !router.query.user_name_id) return;

		setIsLoading(true);
		let userProfileData;

		if (
			router.query.user_name_id &&
			// userData.user_name_id &&
			router.query.user_name_id !== userData?.user_name_id
			// && router.query.user_name_id !== user?.data?.user_name_id
		) {
			setIsLoading(true);

			if (userState.user?.user_name_id === router.query.user_name_id) {
				userProfileData = userState.user;
				// if (identity === GUEST) setIdentity(OWNER);
				// if (!handleIsAuthorized) setHandleIsAuthorized(true);
			} else {
				const userResult = await fetch(
					`/api/v1/users/user/?user_name_id=${router.query.user_name_id}`
				).then((response) => response.json());

				// if (identity === OWNER) setIdentity(GUEST);
				// if (handleIsAuthorized) setHandleIsAuthorized(false);

				if (
					!userResult.data ||
					!userResult.data.user_name_id ||
					(userResult.status && userResult.status === 'error')
				) {
					setUserData({});
					setPosts([]);
					setIsLoading(false);
					if (handleIsAuthorized) setHandleIsAuthorized(false);
					if (identity !== GUEST) setIdentity(GUEST);
					return;
				}

				userProfileData = userResult.data;
			}

			setUserData(userProfileData);

			let postInputQuery = '/?filter_by_user_id=';
			// if (user.data && user.data.id) postInputQuery += user.data.id;
			// else
			postInputQuery += userProfileData.id;

			if (userState.user?.id)
				postInputQuery += `&voter_id=${userState.user.id}`;

			setNewsFetchRouteQuery(postInputQuery);

			const postsResult = await fetch(`/api/v1/news${postInputQuery}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => response.json())
				.catch((error) => {
					console.error(error);
					return {
						status: 'error',
						message: error.message || 'Something went wrong!',
						data: [],
					};
				});

			setPosts(
				postsResult.data.news.map((item) => {
					return {
						...item,
						...item.type_data,
						type_data: {},
					};
				})
			);

			setIsLoading(false);
		}

		if (isLoading) setIsLoading(false);
	}, [userState.isVerifyingUserLoading, router.query.user_name_id]);

	useEffect(() => {
		if (userState.isVerifyingUserLoading) return;

		if (!userState.userExist) {
			if (handleIsAuthorized) setHandleIsAuthorized(false);
			if (identity !== GUEST) setIdentity(GUEST);
		} else {
			if (router.query.user_name_id === userState.user.user_name_id) {
				setUserData(userState.user);
				if (identity !== OWNER) setIdentity(OWNER);
				if (!handleIsAuthorized) setHandleIsAuthorized(true);
			} else if (router.query.user_name_id !== userState.user.user_name_id) {
				if (identity !== GUEST) setIdentity(GUEST);
				if (handleIsAuthorized) setHandleIsAuthorized(false);
			}
		}
	}, [userState.userExist, userState.isVerifyingUserLoading]);

	if (userState.isVerifyingUserLoading || isLoading) {
		return <p>Loading...</p>;
	}

	if (!userData.id) {
		return (
			<div className=''>
				<p>No User found!</p>
			</div>
		);
	}

	return (
		<Profile
			// DynamicProfile
			userData={
				userState.user?.user_name_id === router.query.user_name_id
					? userState.user
					: userData
			}
			userExist={userState.userExist}
			visitorIdentity={identity}
			news={posts}
			newsFetchRouteQuery={newsFetchRouteQuery}
		/>
	);
};

export const getServerSideProps = async ({ req, res, query }) => {
	let newsFetchRouteQuery = '';
	/*
		const baseUrl = `${
			process.env.NODE_ENV !== 'production' ? 'http' : 'https'
		}://${ctx.req.headers.host}`;
	*/
	const fetcher = async (tokenCookieString, userCookieString, user_name_id) => {
		const input = `${process.env.BACK_END_ROOT_URL}/api/v1/users/user/?user_name_id=${user_name_id}`;

		let user;
		let userCookieObj;
		let visitor_id;

		if (tokenCookieString.length !== 0 && userCookieString.length !== 0) {
			userCookieObj = JSON.parse(userCookieString);
			if (userCookieObj?.id) visitor_id = userCookieObj.id;

			// if (
			// 	typeof userCookieObj === 'object' &&
			// 	userCookieObj.user_name_id === user_name_id
			// ) {
			// 	user = {
			// 		status: 'succuss',
			// 		message: 'You are the owner of this profile!',
			// 		data: {},
			// 		isAuthorized: true,
			// 		visitorIdentity: OWNER,
			// 	};
			// }
		}

		// if (!user) {
		user = await fetch(input)
			.then((response) => response.json())
			.catch((error) => {
				console.error(error);
				return {
					status: 'error',
					message: error.message,
					data: {},
					isAuthorized: false,
					visitorIdentity:
						userCookieObj.user_name_id === user_name_id ? OWNER : GUEST,
				};
			});
		// }

		if (!user?.data?.id || (user && user.status === 'error')) {
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
		}, // will be passed to the page component as props
	};
};

export default ProfilePage;
