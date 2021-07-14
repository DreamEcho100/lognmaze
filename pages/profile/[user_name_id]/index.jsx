import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '@/lib/v1/cookie';

import UserContext from '@/store/UserContext';

import Profile from '@/components/Profile/Profile';

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const ProfilePage = ({ user = {}, posts = [] }) => {
	const router = useRouter();

	const UserCxt = useContext(UserContext);

	const [handleIsAuthorized, setHandleIsAuthorized] = useState(
		user.isAuthorized
	);
	const [identity, setIdentity] = useState(user.visitorIdentity);
	const [userData, setUserData] = useState(user.data);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!UserCxt.isLoading) {
			if (!UserCxt.user && !UserCxt.user.id) {
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
			setIsLoading(false);
		}
	}, [UserCxt.user, UserCxt.isLoading, router.query.user_name_id]);

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
		<>
			<Profile userData={userData} visitorIdentity={identity} posts={posts} />
		</>
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

		if (tokenCookieString.length !== 0 && userCookieString.length !== 0) {
			const user = JSON.parse(userCookieString);
			if (user_name_id === user.user_name_id) {
				init.headers.authorization = `Bearer ${tokenCookieString}`;
			}
		}

		const user = await fetch(input, init)
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

		if (user.status === 'error') {
			return {
				user,
				posts: {
					status: 'error',
					message: "Can't get the posts!",
					data: [],
				},
			};
		}

		/*const posts = await fetch(
			`${process.env.BACK_END_ROOT_URL}/api/v1/users/posts/get/by-user-name-id/${user_name_id}`,
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
			});*/

		return { user, posts: [] };
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
