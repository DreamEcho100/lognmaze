import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '../../../lib/v1/cookie';

import UserContext from '../../../store/UserContext';

import Profile from '../../../components/Profile/Profile';

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const ProfilePage = ({
	status,
	message,
	data,
	isAuthorized,
	visitorIdentity,
}) => {
	const router = useRouter();

	const { user, ...UserCxt } = useContext(UserContext);

	const [handleIsAuthorized, setHandleIsAuthorized] = useState(isAuthorized);
	const [identity, setIdentity] = useState(visitorIdentity);
	const [userData, setUserData] = useState(data);

	const [isLoading, setIsLoading] = useState(true);

	// useEffect(() => {
	// 	if (!UserCxt.isLoading) {
	// 		if (Object.keys(user).length === 0 && !userData.id) {
	// 			if (isAuthorized) {
	// 				router.query.user_name_id === user.user_name_id && setIdentity(OWNER);
	// 				!handleIsAuthorized && setHandleIsAuthorized(true);
	// 			}
	// 			setUserData(user);
	// 		}
	// 		setIsLoading(false);
	// 	}
	// }, []);

	useEffect(() => {
		// console.log(router.query.user_name_id);
		if (!UserCxt.isLoading) {
			if (!user.id && userData.id) {
				identity === OWNER && setIdentity(GUEST);
				handleIsAuthorized && setHandleIsAuthorized(false);
			} else if (user.id && !userData.id) {
				setUserData(user);
			}
			setIsLoading(false);
		}
	}, [user.id, UserCxt.isLoading]);

	// 	data,
	// 	Object.keys(userData).length === 0,
	// 	handleIsAuthorized,
	// 	!userData.id
	// );

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
			<Profile userData={userData} visitorIdentity={identity} />
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
		const input = `${process.env.BACK_END_ROOT_URL}/api/v1/users/profile/get/${user_name_id}`;
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

		return await fetch(input, init)
			.then((response) => response.json())
			.catch((error) => {
				console.error(error);
				return {
					status: 'error',
					message: error.message,
					data: {},
					isAuthorized: false,
					visitorIdentity: 'GUEST',
				};
			});
	};

	let tokenCookieString = '';
	let userCookieString = '';
	if (req.headers.cookie) {
		tokenCookieString = getCookie('mazecode_user_token', req.headers.cookie);
		userCookieString = getCookie('mazecode_user_data', req.headers.cookie);
	}

	const { status, message, data, isAuthorized, visitorIdentity } =
		await fetcher(tokenCookieString, userCookieString, query.user_name_id);

	return {
		props: {
			status,
			message,
			data,
			isAuthorized,
			visitorIdentity,
		}, // will be passed to the page component as props
	};
};

export default ProfilePage;

/* 
export const getServerSideProps = async (context, r, s, w) => {
	// getStaticProps
	// const {
	// 	params: { user_name_id },
	// } = context;


	if (!user_name_id) {
		return {
			// notFound: true,
			props: { data: {} },
		};
	}

	const data = await fetch(
		`${process.env.BACK_END_ROOT_URL}/api/v1/users/profile/${user_name_id}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)
		.then((response) => response.json())
		.then(({ status, message, data }) => {
			if (status === 'error') {
				console.error(message);
				return;
			}
			return data;
		})
		.catch((error) => {
			console.error(error);
			return;
		});

	if (!data || !Object.keys(data)) {
		return {
			// notFound: true,
			props: { data: {} },
		};
	}

	return {
		props: {
			data,
		},
		revalidate: 6000,
	};
};
*/
/*
export const getStaticPaths = async () => {
	const { status, message, data } = await fetch(
		`${process.env.BACK_END_ROOT_URL}/api/v1/user/profile/get-all`
	)
		.then((response) => response.json())
		.catch((error) => {
			console.error(error);
			return;
		});

	// .then(({ status, message, data }) => {
	// 	if (status === 'error') {
	// 		console.error(message);
	// 		return [{ params: { slug: '1' } }];
	// 	}
	// 	return data.map((item) => ({ params: { slug: item.slug } }));
	// })
	// .catch((error) => {
	// 	console.error(error);
	// 	return [{ params: { slug: '1' } }];
	// });

	const paths = data.map((item) => ({
		params: { user_name_id: item.user_name_id },
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

*/

/*

	useEffect(async () => {
		let user_name_id = router.query.user_name_id;

		if (typeof user_name_id === 'string' && !UserCxt.isLoading) {
			if (
				Object.keys(user).length !== 0 &&
				user_name_id === user.user_name_id
			) {
				const response = await fetch(`/api/v1/user/get-profile`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${user.token}`,
					},
				});

				const { status, message, data, isVerified, visitorIdentity } =
					await response.json();

				setUserData(user);
				setVisitorIdentity(visitorIdentity);
			}

			if (user_name_id !== user.user_name_id) {
				const headersObj = user.token
					? {
							authorization: `Bearer ${user.token}`,
							user_name_id,
					  }
					: {
							user_name_id,
					  };

				const response = await fetch(`/api/v1/user/get-profile`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						...headersObj,
					},
				});

				const { status, message, data, isVerified, visitorIdentity } =
					await response.json();

				setUserData(data);
				setVisitorIdentity(visitorIdentity);
			}

			if (visitorIdentity === OWNER && (!user || user.id)) {
				setVisitorIdentity(GUEST);
			}

			// setIsLoading(false);
		}
	}, [user.user_name_id, UserCxt.isLoading, router.query.user_name_id]);

	*/
