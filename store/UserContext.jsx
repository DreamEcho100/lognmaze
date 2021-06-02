import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { setCookie, getCookie, deleteCookie, checkCookie } from '../lib/cookie';

const UserContext = createContext({
	user: {},
	isLoading: true,
	verifyUserTokenFromCookie: () => {},
	handleSignUp: () => {},
	handleSignIn: () => {},
	handleLogOut: () => {},
	handUpdateProfilePictureURL: () => {},
	handUpdateCoverPhotoURL: () => {},
	handleUpdateEmail: () => {},
	handleUpdatePassword: () => {},
});

export const UserContextProvider = ({ children }) => {
	const router = useRouter();

	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const verifyUserTokenFromCookie = async () => {
		new Promise((resolve, reject) => {
			!isLoading && setIsLoading(true);
			const tokenCookie = getCookie('mazecode_user_token');
			return resolve(tokenCookie);
		})
			.then(async (tokenCookie) => {
				if (tokenCookie.length !== 0) {
					// return JSON.parse(tokenCookie);
					const token = tokenCookie;
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
					setIsLoading(false);
				} else {
					handleLogOut();
					setIsLoading(false);
					throw new Error('No user stored in cookie!');
				}
			})
			.catch((error) => {
				console.error(error.message);
				handleLogOut();
				setIsLoading(false);
				return error.message;
			});
		// .finally(() => setIsLoading(false));

		setTimeout(() => {}, 4000);
	};

	const handleUserSign = async (path, bodyObj) => {
		setTimeout(() => {}, 5000);
		return new Promise(async (resolve, reject) => {
			const response = await fetch(path, {
				method: 'POST',
				body: JSON.stringify(bodyObj),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const { status, message, data, jwt } = await response.json();

			if (status === 'error') {
				return reject({ status, message });
			}

			setCookie(
				'mazecode_user_data',
				JSON.stringify(data),
				'none', // jwt.expiriesAfter,
				process.env.FRONT_END_ROOT_URL
			);

			setCookie(
				'mazecode_user_token',
				jwt.token,
				jwt.expiriesAfter,
				process.env.FRONT_END_ROOT_URL
			);

			resolve({ status, message, data, jwt });
		})
			.then(({ status, message, data, jwt }) => {
				setUser({
					...data,
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
		await handleUserSign('api/v1/auth/signup', data);

	const handleSignIn = async (data) =>
		await handleUserSign('api/v1/auth/signin', data);

	const handleLogOut = () => {
		setIsLoading(true);

		// setCookie(
		// 	'mazecode_user_data',
		// 	'',
		// 	-30, // jwt.expiriesAfter,
		// 	process.env.FRONT_END_ROOT_URL
		// );
		// setCookie('mazecode_user_token', '', -30, process.env.FRONT_END_ROOT_URL);

		deleteCookie('mazecode_user_data', process.env.FRONT_END_ROOT_URL);
		deleteCookie('mazecode_user_token', process.env.FRONT_END_ROOT_URL);

		console.log(getCookie('mazecode_user_data'));
		new Promise(async (resolve, reject) => {
			// setUser({});

			resolve();
		}).then(() => {
			// router.replace('/');
			setIsLoading(false);
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
					`${process.env.BACK_END_ROOT_URL}/api/v1/user/update-profile-picture`,
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
					return { status, message };
				})
		);
	};

	const handUpdateCoverPhotoURL = async (id, url) => {
		return (
			new Promise(async (resolve, reject) => {
				const response = await fetch(
					`${process.env.BACK_END_ROOT_URL}/api/v1/user/update-cover-photo`,
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
					return { status, message };
				})
		);
	};

	const handleUpdateEmail = async (email, password) => {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(
				`${process.env.BACK_END_ROOT_URL}/api/v1/user/change-email`,
				{
					method: 'PATCH',
					body: JSON.stringify({
						email,
						password,
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
			.then(({ data, status, message, isVerified }) => {
				if (isVerified) {
					const updatedUser = {
						...user,
						email: data.email,
					};
					setUser(updatedUser);
					setCookie('mazecode_user_data', JSON.stringify(updatedUser));
					return { status, message };
				} else {
					handleLogOut();
					throw new Error({ status: 'error', message });
				}
			})
			.catch(({ status, message }) => {
				return { status, message };
			});
	};

	const handleUpdatePassword = async (oldPassword, newPassword) => {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(
				`${process.env.BACK_END_ROOT_URL}/api/v1/user/change-password`,
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
				if (isVerified) {
					return { status, message };
				} else {
					handleLogOut();
					throw new Error({ status: 'error', message });
				}
			})
			.catch(({ status, message }) => {
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
		handleUpdateEmail,
		handleUpdatePassword,
	};

	return (
		<UserContext.Provider value={context}>{children}</UserContext.Provider>
	);
};

export default UserContext;
