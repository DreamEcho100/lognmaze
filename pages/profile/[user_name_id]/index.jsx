import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '@lib/v1/cookie';

import UserContext from '@store/UserContext';

import Profile from '@components/Profile/Profile';

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const ProfilePage = ({ user = {}, /*posts = []*/ ...props }) => {
	const router = useRouter();

	const UserCxt = useContext(UserContext);

	const [posts, setPosts] = useState(
		props.posts.length !== 0 ? props.posts.data : []
	);
	const [handleIsAuthorized, setHandleIsAuthorized] = useState(
		user.isAuthorized
	);
	const [identity, setIdentity] = useState(user.visitorIdentity);
	const [userData, setUserData] = useState(user.data);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
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

				if (
					router.query.user_name_id === UserCxt.user.user_name_id &&
					identity === GUEST
				) {
					setIdentity(OWNER);
					if (!handleIsAuthorized) setHandleIsAuthorized(true);
				} else if (
					router.query.user_name_id !== UserCxt.user.user_name_id &&
					identity === OWNER
				) {
					setIdentity(GUEST);
					if (handleIsAuthorized) setHandleIsAuthorized(false);
				}
			}

			if (
				UserCxt.userExist &&
				posts.length !== 0 &&
				(posts.author_id !== userData.id ||
					posts.author_user_name_id !== userData.user_name_id ||
					posts.author_first_name !== userData.first_name ||
					posts.author_last_name !== userData.last_name ||
					posts.author_profile_picture !== userData.profile_picture)
			) {
				setPosts((prev) =>
					prev.map((item) => ({
						...item,
						author_id: userData.id,
						author_user_name_id: userData.user_name_id,
						author_first_name: userData.first_name,
						author_last_name: userData.last_name,
						author_profile_picture: userData.profile_picture,
					}))
				);
			}

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
			return setUserData(UserCxt.user);
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
		<Profile userData={userData} visitorIdentity={identity} news={posts} />
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
		const init = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		let user;
		let userCookieObj;
		let visitor_id;

		if (tokenCookieString.length !== 0 && userCookieString.length !== 0) {
			userCookieObj = JSON.parse(userCookieString);
			if (userCookieObj && userCookieObj.id) visitor_id = userCookieObj.id;

			/*
			if (
				userCookieObj &&
				userCookieObj.id &&
				user_name_id === userCookieObj.user_name_id
			) {
				init.headers.authorization = `Bearer ${tokenCookieString}`;
			}
			*/

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
			user = await fetch(input, init)
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

		let posqInputQuery = '/?filter_by_user_id=';
		if (user.data && user.data.id) posqInputQuery += user.data.id;
		else posqInputQuery += userCookieObj.id;

		if (visitor_id) posqInputQuery += `&news_reactor_id=${visitor_id}`;

		const posts = await fetch(
			`${process.env.BACK_END_ROOT_URL}/api/v1/news${posqInputQuery}`,
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
