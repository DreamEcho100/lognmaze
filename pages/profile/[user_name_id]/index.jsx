import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getCookie } from '@lib/v1/cookie';

import UserContext from '@store/UserContext';

const DynamicProfile = dynamic(() => import('@components/Profile'));

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const ProfilePage = ({ user = {}, ...props }) => {
	const router = useRouter();

	const UserCxt = useContext(UserContext);

	const [posts, setPosts] = useState(
		props.posts.length !== 0
			? // props.posts.data.reverse()
			  (() => {
					const formattedData = props.posts.data.map((obj) => {
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
	const [identity, setIdentity] = useState(user.visitorIdentity);
	const [userData, setUserData] = useState(user.data);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(async () => {
		if (!UserCxt.isLoading) {
			if (!UserCxt.userExist) {
				if (userData.id) {
					if (handleIsAuthorized) setHandleIsAuthorized(false);
					if (identity === OWNER) setIdentity(GUEST);
				}
			} else {
				if (
					(JSON.stringify(UserCxt.user) !== JSON.stringify(userData) ||
						Object.keys(userData).length === 0) &&
					UserCxt.user.user_name_id === router.query.user_name_id
				)
					setUserData(UserCxt.user);

				if (router.query.user_name_id === UserCxt.user.user_name_id) {
					if (identity === GUEST) setIdentity(OWNER);
					if (!handleIsAuthorized) setHandleIsAuthorized(true);
				} else if (router.query.user_name_id !== UserCxt.user.user_name_id) {
					if (identity === OWNER) setIdentity(GUEST);
					if (handleIsAuthorized) setHandleIsAuthorized(false);
				}
			}

			let userProfileData;

			if (
				router.query.user_name_id &&
				// userData.user_name_id &&
				router.query.user_name_id !== userData.user_name_id
			) {
				setIsLoading(true);

				if (UserCxt?.user?.user_name_id === router.query.user_name_id) {
					userProfileData = UserCxt.user;
					if (identity === GUEST) setIdentity(OWNER);
					if (!handleIsAuthorized) setHandleIsAuthorized(true);
					if (identity === OWNER) setIdentity(GUEST);
					if (handleIsAuthorized) setHandleIsAuthorized(false);
				} else {
					const userResult = await fetch(
						`/api/v1/users/profiles/profile/${router.query.user_name_id}`
					).then((response) => response.json());

					if (
						!userResult.data ||
						!userResult.data.user_name_id ||
						(userResult.status && userResult.status === 'error')
					) {
						setUserData({});
						setPosts([]);
						setIsLoading(false);
						return;
					}

					userProfileData = userResult.data;
				}

				setUserData(userProfileData);

				// if (UserCxt?.user?.user_name_id === userProfileData.user_name_id) {
				// 	if (identity === GUEST) setIdentity(OWNER);
				// 	if (!handleIsAuthorized) setHandleIsAuthorized(true);
				// } else {
				// 	if (identity === OWNER) setIdentity(GUEST);
				// 	if (handleIsAuthorized) setHandleIsAuthorized(false);
				// }

				let postInputQuery = '/?filter_by_user_id=';
				// if (user.data && user.data.id) postInputQuery += user.data.id;
				// else
				postInputQuery += userProfileData.id;

				if (UserCxt?.user?.id) postInputQuery += `&voter_id=${UserCxt.user.id}`;

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
					postsResult.data.map((item) => {
						return {
							...item,
							...item.type_data,
							type_data: {},
						};
					})
				);

				setIsLoading(false);
			}

			// if (
			// 	UserCxt.userExist &&
			// 	posts &&
			// 	posts.length !== 0 &&
			// 	(posts.author_id !== userData.id ||
			// 		posts.author_user_name_id !== userData.user_name_id ||
			// 		posts.author_first_name !== userData.first_name ||
			// 		posts.author_last_name !== userData.last_name ||
			// 		posts.author_profile_picture !== userData.profile_picture)
			// ) {
			// 	setPosts((prev) =>
			// 		prev.map((item) => ({
			// 			...item,
			// 			author_id: userData.id,
			// 			author_user_name_id: userData.user_name_id,
			// 			author_first_name: userData.first_name,
			// 			author_last_name: userData.last_name,
			// 			author_profile_picture: userData.profile_picture,
			// 		}))
			// 	);
			// }

			if (isLoading) setIsLoading(false);
		}
	}, [UserCxt.userExist, UserCxt.isLoading, router.query.user_name_id]);

	useEffect(() => {
		if (identity === OWNER && !UserCxt.user.id) {
			return setIdentity(GUEST);
		}

		if (
			UserCxt.user.id &&
			userData.id &&
			UserCxt.user.id === userData.id &&
			JSON.stringify(userData) !== JSON.stringify(UserCxt.user)
		) {
			setUserData(UserCxt.user);
			// return router.reload(window.location.pathname);
		}
	}, [UserCxt.user]);

	if (UserCxt.isLoading || isLoading) {
		return <p>Loading...</p>;
	}

	if (
		Object.keys(userData).length === 0 &&
		!userData.id &&
		!handleIsAuthorized
	) {
		return (
			<div className=''>
				<p>No User found!</p>
			</div>
		);
	}

	return (
		<DynamicProfile
			userData={userData}
			visitorIdentity={identity}
			news={posts}
		/>
	);
};

export const getServerSideProps = async ({ req, res, query }) => {
	/*
		const baseUrl = `${
			process.env.NODE_ENV !== 'production' ? 'http' : 'https'
		}://${ctx.req.headers.host}`;
	*/
	const fetcher = async (tokenCookieString, userCookieString, user_name_id) => {
		const input = `${process.env.BACK_END_ROOT_URL}/api/v1/users/profiles/profile/${user_name_id}`;

		let user;
		let userCookieObj;
		let visitor_id;

		if (tokenCookieString.length !== 0 && userCookieString.length !== 0) {
			userCookieObj = JSON.parse(userCookieString);
			if (userCookieObj && userCookieObj.id) visitor_id = userCookieObj.id;

			if (
				typeof userCookieObj === 'object' &&
				userCookieObj.user_name_id === user_name_id
			) {
				user = {
					status: 'succuss',
					message: 'You are the owner of this profile!',
					data: {},
					isAuthorized: true,
					visitorIdentity: OWNER,
				};
			}
		}

		if (!user) {
			user = await fetch(input)
				.then((response) => response.json())
				.catch((error) => {
					console.error(error);
					return {
						status: 'error',
						message: error.message,
						data: {},
						isAuthorized: false,
						visitorIdentity: GUEST,
					};
				});
		}

		if (!user || (user && user.status === 'error')) {
			return {
				user,
				posts: {
					status: 'error',
					message: "Can't get the posts!",
					data: [],
				},
			};
		}

		let postInputQuery = '/?filter_by_user_id=';
		if (user.data && user.data.id) postInputQuery += user.data.id;
		else postInputQuery += userCookieObj.id;

		if (visitor_id) postInputQuery += `&voter_id=${visitor_id}`;

		const posts = await fetch(
			`${process.env.BACK_END_ROOT_URL}/api/v1/news${postInputQuery}`,
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

		return { user, posts };
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
			posts: data.posts ? data.posts : [],
		}, // will be passed to the page component as props
	};
};

export default ProfilePage;
