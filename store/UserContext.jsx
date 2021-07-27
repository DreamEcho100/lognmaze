import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
	setCookie,
	getCookie,
	deleteCookie,
	checkCookie,
} from '@lib/v1/cookie';

const UserContext = createContext({
	user: {},
	userExist: false,
	isLoading: true,
	isUpdatingProfile: false,
	verifyUserTokenFromCookie: () => {},
	handleSignUp: () => {},
	handleSignIn: () => {},
	handleSignOut: () => {},
	handleChangeUserName: () => {},
	handleChangeUserGender: () => {},
	handleChangeProfilePictureURL: () => {},
	handleChangeCoverPhotoURL: () => {},
	handleChangeEmail: () => {},
	handleChangePassword: () => {},
});

export const UserContextProvider = ({ children }) => {
	const router = useRouter();

	const [user, setUser] = useState({});
	const [userExist, setUserExist] = useState(
		/* Object.keys(user).length === 0 */ user.token ? true : false
	);
	const [isLoading, setIsLoading] = useState(true);
	const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

	const verifyUserTokenFromCookie = async () => {
		new Promise((resolve, reject) => {
			if (!isLoading) setIsLoading(true);
			const tokenCookie = getCookie({
				cookieName: 'user_token',
				cookieString: document.cookie,
			});
			if (tokenCookie.length !== 0) {
				resolve(tokenCookie);
			}
			reject({ status: 'error', message: 'No user stored in cookie!' });
		})
			.then(async (tokenCookie) => {
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
						cookieName: 'user_data',
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
				cookieName: 'user_data',
				cookieValue: JSON.stringify(data),
				domain: process.env.FRONT_END_DOMAIN,
				path: '/',
			});

			setCookie({
				cookieName: 'user_token',
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
				`${process.env.BACK_END_ROOT_URL}/api/v1/users/profiles/profile/update/${path}`,
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
						const ChangedUser = {
							...user,
							...data,
						};

						setUser(ChangedUser);

						setCookie({
							cookieName: 'user_data',
							cookieValue: JSON.stringify(ChangedUser),
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
		await handleUserSign('/api/v1/auth/signup', data);

	const handleSignIn = async (data) =>
		await handleUserSign('/api/v1/auth/signin', data);

	const handleSignOut = () => {
		setIsLoading(true);
		const handleDeleteCookie = async () => {
			new Promise((resolve, reject) => {
				if (
					checkCookie({
						cookieName: 'user_data',
						cookieString: document.cookie,
					}) ||
					checkCookie({
						cookieName: 'user_token',
						cookieString: document.cookie,
					})
				) {
					deleteCookie(
						{
							cookieName: 'user_data',
							domain: process.env.FRONT_END_DOMAIN,
							path: '/',
						},
						process.env.FRONT_END_ROOT_URL
					);

					deleteCookie(
						{
							cookieName: 'user_token',
							domain: process.env.FRONT_END_DOMAIN,
							path: '/',
						},
						process.env.FRONT_END_ROOT_URL
					);

					new Promise((resolve, reject) => {
						setTimeout(() => {
							resolve();
						}, 1000);
					});
				}

				if (
					checkCookie({
						cookieName: 'user_data',
						cookieString: document.cookie,
					}) ||
					checkCookie({
						cookieName: 'user_token',
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
				router.replace(router.asPath);
				return;
			})
			.then(() => {
				setIsLoading(false);
				return;
			});
	};

	const handleChangeUserName = ({ firstName, lastName, password }) =>
		handleUserUpdate({
			path: 'user-name',
			bodyObj: {
				firstName,
				lastName,
				password,
			},
		});

	const handleChangeUserGender = ({ gender, password }) =>
		handleUserUpdate({
			path: 'gender',
			bodyObj: {
				gender,
				password,
			},
		});

	const handleChangeProfilePictureURL = ({ url }) =>
		handleUserUpdate({
			path: 'profile-picture',
			bodyObj: {
				url,
			},
		});

	const handleChangeCoverPhotoURL = ({ url }) =>
		handleUserUpdate({
			path: 'cover-photo',
			bodyObj: {
				url,
			},
		});

	const handleChangeEmail = ({ email, password }) =>
		handleUserUpdate({
			path: 'email',
			bodyObj: {
				email,
				password,
			},
		});

	const handleChangePassword = async (oldPassword, newPassword) =>
		handleUserUpdate({
			path: 'password',
			bodyObj: {
				oldPassword,
				newPassword,
			},
		});

	useEffect(() => {
		if (Object.keys(user).length === 0 && userExist) {
			setUserExist(false);
		} else if (Object.keys(user).length !== 0 && !userExist) {
			setUserExist(true);
		}
	}, [user]);

	const context = {
		user,
		userExist,
		isLoading,
		isUpdatingProfile,
		setIsUpdatingProfile,
		verifyUserTokenFromCookie,
		handleSignUp,
		handleSignIn,
		handleSignOut,
		handleChangeUserName,
		handleChangeUserGender,
		handleChangeProfilePictureURL,
		handleChangeCoverPhotoURL,
		handleChangeEmail,
		handleChangePassword,
	};

	return (
		<UserContext.Provider value={context}>{children}</UserContext.Provider>
	);
};

export default UserContext;
