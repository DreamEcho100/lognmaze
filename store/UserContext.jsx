import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
	setCookie,
	getCookie,
	deleteCookie,
	checkCookie,
} from '../lib/v1/cookie';

const UserContext = createContext({
	user: {},
	isLoading: true,
	isUpdatingProfile: false,
	verifyUserTokenFromCookie: () => {},
	handleSignUp: () => {},
	handleSignIn: () => {},
	handleSignOut: () => {},
	handleUpdateBasicInfo: () => {},
	handUpdateProfilePictureURL: () => {},
	handUpdateCoverPhotoURL: () => {},
	handleUpdateEmail: () => {},
	handleUpdatePassword: () => {},
});

export const UserContextProvider = ({ children }) => {
	const router = useRouter();

	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

	const verifyUserTokenFromCookie = async () => {
		new Promise((resolve, reject) => {
			!isLoading && setIsLoading(true);
			const tokenCookie = getCookie({
				cookieName: 'mazecode_user_token',
				cookieString: document.cookie,
			});
			if (tokenCookie.length !== 0) {
				resolve(tokenCookie);
			}
			reject({ status: 'error', message: 'No user stored in cookie!' });
		})
			.then(async (tokenCookie) => {
				// return JSON.parse(tokenCookie);
				const token = tokenCookie;

				const { status, message, data } = await fetch(
					`${process.env.BACK_END_ROOT_URL}/api/v1/auth/verify-token`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							authorization: `Bearer ${token}`,
						},
					}
				).then((response) => response.json());

				if (status === 'success' && data.isAuthorized) {
					const userCookie = getCookie({
						cookieName: 'mazecode_user_data',
						cookieString: document.cookie,
					});
					const user = JSON.parse(userCookie);
					setUser({
						...user,
						token,
					});
				}

				if (status === 'error' || !data.isAuthorized) {
					handleSignOut();
				}
				setIsLoading(false);

				return { status, message, data };
			})
			.catch((error) => {
				console.error(error.message);
				if (Object.keys(user).length !== 0 && !user.id && !user.user_name) {
					handleSignOut();
				}
				setIsLoading(false);
				return { status: 'succuss', message: error.message, data: {} };
			});
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

			const { status, message, data, jwt } = await response.json();

			if (status === 'error') {
				return reject({ status, message });
			}

			setCookie({
				cookieName: 'mazecode_user_data',
				cookieValue: JSON.stringify(data),
				domain: process.env.FRONT_END_DOMAIN,
				path: '/',
			});

			setCookie({
				cookieName: 'mazecode_user_token',
				cookieValue: jwt.token,
				expiresDate: new Date(
					new Date().getTime() + jwt.expiriesAfter
				).toUTCString(),
				domain: process.env.FRONT_END_DOMAIN,
				path: '/',
			});

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

	const handleUserUpdate = ({ path, bodyObj }) => {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(
				`${process.env.BACK_END_ROOT_URL}/api/v1/users/profile/update/${path}`,
				{
					method: 'PATCH',
					body: JSON.stringify(bodyObj),
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${user.token}`,
					},
				}
			);

			resolve(response);
		})
			.then((response) => response.json())
			.then(({ data, status, message, isAuthorized }) => {
				if (isAuthorized) {
					if (status !== 'error' && Object.keys(data).length !== 0) {
						const updatedUser = {
							...user,
							...data,
						};

						setUser(updatedUser);

						setCookie({
							cookieName: 'mazecode_user_data',
							cookieValue: JSON.stringify(updatedUser),
							domain: process.env.FRONT_END_DOMAIN,
							path: '/',
						});
					}
					return { status, message, data };
				} else {
					handleSignOut();
					return { status: 'error', message };
				}
			})
			.catch((error) => {
				return { status: 'error', message: error.message };
			});
	};

	const handleSignUp = async (data) =>
		await handleUserSign('api/v1/auth/signup', data);

	const handleSignIn = async (data) =>
		await handleUserSign('api/v1/auth/signin', data);

	const handleSignOut = () => {
		setIsLoading(true);
		const handleDeleteCookie = async () => {
			new Promise((resolve, reject) => {
				if (
					checkCookie({
						cookieName: 'mazecode_user_data',
						cookieString: document.cookie,
					}) ||
					checkCookie({
						cookieName: 'mazecode_user_token',
						cookieString: document.cookie,
					})
				) {
					deleteCookie(
						{
							cookieName: 'mazecode_user_data',
							domain: process.env.FRONT_END_DOMAIN,
							path: '/',
						},
						process.env.FRONT_END_ROOT_URL
					);

					deleteCookie(
						{
							cookieName: 'mazecode_user_token',
							domain: process.env.FRONT_END_DOMAIN,
							path: '/',
						},
						process.env.FRONT_END_ROOT_URL
					);

					new Promise((resolve, reject) => {
						setTimeout(() => {
							resolve();
						}, 0);
					});
				}

				if (
					checkCookie({
						cookieName: 'mazecode_user_data',
						cookieString: document.cookie,
					}) ||
					checkCookie({
						cookieName: 'mazecode_user_token',
						cookieString: document.cookie,
					})
				) {
					setTimeout(() => {
						handleDeleteCookie();
						resolve();
					}, 2000);
				} else {
					resolve();
				}
			});
		};

		return handleDeleteCookie()
			.then(async () => {
				setUser({});
				return;
			})
			.then(async () => {
				// router.replace('/');
				router.replace(router.asPath);
				return;
			})
			.then(() => {
				// setIsLoading(false);
				setIsLoading(false);
				return;
			});
	};

	const handleUpdateBasicInfo = ({
		firstName,
		lastName,
		userName,
		gender,
		password,
	}) =>
		handleUserUpdate({
			path: 'basic-info',
			bodyObj: {
				firstName,
				lastName,
				userName,
				gender,
				password,
			},
		});

	const handUpdateProfilePictureURL = ({ url }) =>
		handleUserUpdate({
			path: 'profile-picture',
			bodyObj: {
				url,
			},
		});

	const handUpdateCoverPhotoURL = ({ url }) =>
		handleUserUpdate({
			path: 'cover-photo',
			bodyObj: {
				url,
			},
		});

	const handleUpdateEmail = ({ email, password }) =>
		handleUserUpdate({
			path: 'email',
			bodyObj: {
				email,
				password,
			},
		});

	const handleUpdatePassword = async (oldPassword, newPassword) => {
		return new Promise(async (resolve, reject) => {
			const response = await fetch(
				`${process.env.BACK_END_ROOT_URL}/api/v1/users/change-password`,
				{
					method: 'PATCH',
					body: JSON.stringify({
						oldPassword,
						newPassword,
					}),
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${user.token}`,
					},
				}
			);

			resolve(response);
		})
			.then((response) => response.json())
			.then(({ status, message, isAuthorized }) => {
				if (isAuthorized) {
					return { status, message };
				} else {
					handleSignOut();
					return { status: 'error', message };
				}
			})
			.catch((error) => {
				return { status: 'error', message: error.message };
			});
	};

	const context = {
		user,
		isLoading,
		isUpdatingProfile,
		setIsUpdatingProfile,
		verifyUserTokenFromCookie,
		handleSignUp,
		handleSignIn,
		handleSignOut,
		handleUpdateBasicInfo,
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
