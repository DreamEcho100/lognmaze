import {
	setCookie,
	getCookie,
	deleteCookie,
	checkCookie,
} from '@lib/v1/cookie';

import types from './types';

const handleUserSign = async ({ dispatch, path, bodyObj }) => {
	const { status, message, data, jwt } = await fetch(path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(bodyObj),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error(error.message);
			return { status: 'error', message: error.message };
		});

	if (!status || (status && status === 'error')) {
		console.error(message);

		return {
			status: 'error',
			message,
		};
	}

	setCookie({
		cookieName: 'user_data',
		cookieValue: JSON.stringify(data),
		expiresDate: new Date(
			new Date().getTime() + jwt.expiriesAfter
		).toUTCString(),
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

	setCookie({
		cookieName: 'user_expiry_deadline',
		cookieValue: new Date().getTime() + jwt.expiriesAfter,
		expiresDate: new Date(
			new Date().getTime() + jwt.expiriesAfter
		).toUTCString(),
		domain: process.env.FRONT_END_DOMAIN,
		path: '/',
	});

	const payload = {
		user: {},
		token: '',
		userExist: false,
		isVerifyingUserLoading: false,
	};

	if (jwt.token && data?.id) {
		payload.user = data;
		payload.token = jwt.token;
		payload.userExist = true;
	}

	dispatch({
		type: types.SET_DATA,
		payload,
	});

	return {
		status,
		message,
	};
};

export const setDataFirstTime = async ({ dispatch }) => {
	const tokenCookie = getCookie({
		cookieName: 'user_token',
		cookieString: document.cookie,
	});

	const userCookie = getCookie({
		cookieName: 'user_data',
		cookieString: document.cookie,
	});

	const payload = {
		user: {},
		token: '',
		userExist: false,
		isVerifyingUserLoading: false,
	};

	if (tokenCookie && userCookie) {
		payload.user = JSON.parse(userCookie);
		payload.token = tokenCookie;
		payload.userExist = true;
	}

	dispatch({
		type: types.SET_DATA_FIRST_TIME,
		payload,
	});

	return {
		status: 'succuss',
		message: '',
	};
};

export const handleSignOut = async ({ dispatch }) => {
	new Promise((resolve, reject) => {
		if (
			checkCookie({
				cookieName: 'user_data',
				cookieString: document.cookie,
			}) ||
			checkCookie({
				cookieName: 'user_token',
				cookieString: document.cookie,
			}) ||
			checkCookie({
				cookieName: 'user_expiry_deadline',
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

			deleteCookie(
				{
					cookieName: 'user_expiry_deadline',
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
			}) ||
			checkCookie({
				cookieName: 'user_expiry_deadline',
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

	dispatch({
		type: types.RESET_DATA,
		// payload: {},
	});
};

export const handleSignUp = async ({ dispatch, data }) =>
	await handleUserSign({
		dispatch,
		path: '/api/v1/auth/signup',
		bodyObh: data,
	});

export const handleSignIn = async ({ dispatch, data }) =>
	await handleUserSign({
		dispatch,
		path: '/api/v1/auth/signin',
		bodyObj: data,
	});

export const handleUpdateUserData = async ({
	dispatch,
	userData,
	values = {},
	password,
	token,
}) => {
	const bodyObj = {
		targets: values,
	};

	if (password) bodyObj.password = password;

	const { status, message, data } = await fetch('/api/v1/users/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			authorization: token ? `Bearer ${token}` : undefined,
		},
		body: JSON.stringify(bodyObj),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error(error.message);
			return { status: 'error', message: error.message };
		});

	if (
		!status ||
		(status && status === 'error') ||
		Object.keys(data).length === 0
	) {
		return {
			status: 'error',
			message,
		};
	}

	const user_expiry_deadline = getCookie({
		cookieName: 'user_expiry_deadline',
		cookieString: document.cookie,
	});

	const user_data = {
		...userData,
		...data,
	};

	setCookie({
		cookieName: 'user_data',
		cookieValue: JSON.stringify(user_data),
		expiresDate: new Date(parseInt(user_expiry_deadline)),
		domain: process.env.FRONT_END_DOMAIN,
		path: '/',
	});

	dispatch({
		type: types.UPDATE_USER_DATA,
		payload: { updatedData: data },
	});

	return {
		status,
		message,
	};
};

export const handleUpdateUserPassword = async ({ bodyObj, token }) => {
	const { status, message, data } = await fetch('/api/v1/users/user', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			authorization: token ? `Bearer ${token}` : undefined,
		},
		body: JSON.stringify(bodyObj),
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error(error.message);
			return { status: 'error', message: error.message };
		});

	if (
		!status ||
		(status && status === 'error') ||
		Object.keys(data).length === 0
	) {
		return {
			status: 'error',
			message,
		};
	}

	return {
		status: 'succuss',
		message: 'Password changed successfully!',
	};
};
