import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { setCookie, getCookie, deleteCookie } from '../lib/cookie';

const UserContext = createContext({
	user: {},
	isLoading: true,
	verifyUserTokenFromCookie: () => {},
	handleSignUp: () => {},
	handleSignIn: () => {},
	handleLogOut: () => {},
	handUpdateProfilePictureURL: () => {},
	handUpdateCoverPhotoURL: () => {},
	handleUpdatePassword: () => {},
});

export const UserContextProvider = ({ children }) => {
	const router = useRouter();

	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const verifyUserTokenFromCookie = async () => {
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

	const handleUserSign = async (path, bodyObj) => {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(path, {
				method: 'POST',
				body: JSON.stringify(bodyObj),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const { status, message, user, jwt } = await response.json();

			console.log(status, message, user, jwt);

			if (status === 'error') {
				return reject({ status, message });
			}

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

			resolve({ status, message, user, jwt });
		})
			.then(({ status, message, user, jwt }) => {
				setUser({
					...user,
					token: jwt.token,
				});
				return { status, message };
			})
			.catch(({ status, message }) => {
				console.error({ status, message });
				return { status, message };
			});
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
			setUser({});
			resolve();
		}).then(() => {
			// router.replace('/');
			return;
		});
		// .then(() => {
		// 	// setIsLoading(false);
		// 	return;
		// });
	};

	const handUpdateProfilePictureURL = async (id, url) => {
		return (
			new Promise(async (resolve, reject) => {
				const response = await fetch(
					`${process.env.BACK_END_ROOT_URL}/api/v1/user/update-profile-picture/${id}`,
					{
						method: 'PATCH',
						body: JSON.stringify({ url }),
						headers: {
							'Content-Type': 'application/json',
							token: user.token,
						},
					}
				);

				if (!response.ok) {
					reject({
						status: 'error',
						message: response.message || 'Something went wrong!',
					});
				}

				resolve(response);
			})
				.then((response) => response.json())
				.then(({ status, data, isVerified, message }) => {
					if (isVerified) {
						const updatedUser = {
							...user,
							profile_picture: data.profile_picture,
						};
						setUser(updatedUser);
						setCookie('mazecode_user_data', JSON.stringify(updatedUser));
						return { status, message };
					} else {
						handleLogOut();
						throw new Error({ status: 'error', message });
					}
				})
				// .then(() => router.replace(`/profile/${user.user_name}`))
				.catch(({ status, message }) => {
					console.log(status, message);
					return { status, message };
				})
		);
	};

	const handUpdateCoverPhotoURL = async (id, url) => {
		return (
			new Promise(async (resolve, reject) => {
				const response = await fetch(
					`${process.env.BACK_END_ROOT_URL}/api/v1/user/update-cover-photo/${id}`,
					{
						method: 'PATCH',
						body: JSON.stringify({ url }),
						headers: {
							'Content-Type': 'application/json',
							token: user.token,
						},
					}
				);

				if (!response.ok) {
					reject({
						status: 'error',
						message: response.message || 'Something went wrong!',
					});
				}

				resolve(response);
			})
				.then((response) => response.json())
				.then(({ status, data, isVerified, message }) => {
					if (isVerified) {
						const updatedUser = {
							...user,
							cover_photo: data.cover_photo,
						};
						setUser(updatedUser);
						setCookie('mazecode_user_data', JSON.stringify(updatedUser));
						return { status, message };
					} else {
						handleLogOut();
						throw new Error({ status: 'error', message });
					}
				})
				// .then(() => router.replace(`/profile/${user.user_name}`))
				.catch(({ status, message }) => {
					console.log(status, message);
					return { status, message };
				})
		);
	};

	const handleUpdatePassword = async (oldPassword, newPassword) => {
		console.log(oldPassword, newPassword, user.token);
		return new Promise(async (resolve, reject) => {
			const response = await fetch(
				`${process.env.BACK_END_ROOT_URL}/api/v1/user/change-user-password`,
				{
					method: 'PATCH',
					body: JSON.stringify({
						oldPassword,
						newPassword,
					}),
					headers: {
						'Content-Type': 'application/json',
						token: user.token,
					},
				}
			);

			if (!response.ok) {
				reject({
					status: 'error',
					message: response.message || 'Something went wrong!',
				});
			}

			resolve(response);
		})
			.then((response) => response.json())
			.then(({ status, message, isVerified }) => {
				console.log(status, message, isVerified);
				if (isVerified) {
					return { status, message };
				} else {
					handleLogOut();
					throw new Error({ status: 'error', message });
				}
			})
			.catch(({ status, message }) => {
				console.log(status, message);
				return { status, message };
			});
	};

	const context = {
		user,
		isLoading,
		verifyUserTokenFromCookie,
		handleSignUp,
		handleSignIn,
		handleLogOut,
		handUpdateProfilePictureURL,
		handUpdateCoverPhotoURL,
		handleUpdatePassword,
	};

	return (
		<UserContext.Provider value={context}>{children}</UserContext.Provider>
	);
};

export default UserContext;
