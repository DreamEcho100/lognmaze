import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { setCookie, getCookie, deleteCookie } from '../lib/cookie';

const UserContext = createContext({
	user: {},
	isLoading: true,
	verfyUserTokenFromCookie: () => {},
	handleSignUp: () => {},
	handleSignIn: () => {},
	handleLogOut: () => {},
	handUpdateProfilePictureURL: () => {},
});

const postData = async (path, bodyObj) => {
	const response = await fetch(path, {
		method: 'POST',
		body: JSON.stringify(bodyObj),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || 'Something went wrong!');
	}

	return data;
};

export const UserContextProvider = ({ children }) => {
	const router = useRouter();

	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const verfyUserTokenFromCookie = async () => {
		new Promise((resolve, reject) => {
			setIsLoading(true);
			const tokenCookie = getCookie('mazecode_user_token');
			return resolve(tokenCookie);
		})
			.then(async (cookie) => {
				if (cookie.length !== 0) {
					// return JSON.parse(cookie);
					const token = cookie;
					const response = await fetch(
						`${process.env.BACK_END_ROOT_URL}/api/v1/auth/verify-token`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								token,
							},
						}
					);

					const { status, message, data } = await response.json();

					if (status === 'success' /* || data.isVerified*/) {
						const userCookie = getCookie('mazecode_user_data');
						const user = JSON.parse(userCookie);
						setUser({
							...user,
							token,
						});
					}

					if (status === 'error' /* || !data.isVerified*/) {
						handleLogOut();
					}
				} else {
					handleLogOut();
					throw new Error('No user stored in cookie!');
				}
			})
			.catch((error) => {
				console.error(error.message);
				handleLogOut();
				return error.message;
			})
			.finally(() => setIsLoading(false));
	};

	const handleUserSign = async (path, data) => {
		try {
			const { status, message, user, jwt } = await postData(path, data);

			setCookie(
				'mazecode_user_data',
				JSON.stringify(user),
				'none', // jwt.expiriesAfter,
				process.env.FRONT_END_ROOT_URL
			);

			setCookie(
				'mazecode_user_token',
				jwt.token,
				jwt.expiriesAfter,
				process.env.FRONT_END_ROOT_URL
			);

			setUser({
				...user,
				token: jwt.token,
			});

			return { status, message };
		} catch (error) {
			console.error(error.message);
			return { status: 'error', message: error.message };
		}
	};

	const handleSignUp = async (data) =>
		handleUserSign('api/v1/auth/signup', data);

	const handleSignIn = async (data) =>
		handleUserSign('api/v1/auth/signin', data);

	const handleLogOut = () => {
		new Promise((resolve, reject) => {
			// setIsLoading(true);
			deleteCookie('mazecode_user_data', process.env.FRONT_END_ROOT_URL);
			deleteCookie('mazecode_user_token', process.env.FRONT_END_ROOT_URL);
			resolve();
		}).then(() => {
			setUser({});
			// router.replace('/');
			return;
		});
		// .then(() => {
		// 	// setIsLoading(false);
		// 	return;
		// });
	};

	const handUpdateProfilePictureURL = async (id, url) => {
		const body = JSON.stringify({ url: url });

		new Promise(async (resolve, reject) => {
			const response = await fetch(
				`http://localhost:3000/api/v1/user/update-profile-picture/${id}`,
				{
					method: 'PATCH',
					body,
					headers: {
						'Content-Type': 'application/json',
						token: user.token,
					},
				}
			);

			if (!response.ok) {
				reject(response.message || 'Something went wrong!');
			}

			resolve(response);
		})
			.then((response) => response.json())
			.then(({ data }) => {
				const updatedUser = {
					...user,
					profile_picture: data.profile_picture,
				};
				setUser(updatedUser);
				setCookie('mazecode_user_data', JSON.stringify(updatedUser));
			})
			// .then(() => router.replace(`/profile/${user.user_name}`))
			.catch((error) => console.error(error));
	};

	const context = {
		user,
		isLoading,
		verfyUserTokenFromCookie,
		handleSignUp,
		handleSignIn,
		handleLogOut,
		handUpdateProfilePictureURL,
	};

	return (
		<UserContext.Provider value={context}>{children}</UserContext.Provider>
	);
};

export default UserContext;
