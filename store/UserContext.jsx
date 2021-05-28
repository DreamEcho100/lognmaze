import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { setCookie, getCookie, deleteCookie } from '../lib/cookie';

const UserContext = createContext({
	user: {},
	isLoading: true,
	handleSignUp: () => {},
	handleSignIn: () => {},
	handleLogOut: () => {},
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

	useEffect(() => {
		// setIsLoading(true);
		const cookie = getCookie('mazecode_user');
		if (typeof cookie === 'object' || cookie.length !== 0) {
			const user = JSON.parse(cookie);
			if (!user) {
				handleLogOut();
			} else {
				setUser(user);
			}
		}
		setIsLoading(false);
		new Promise((resolve, reject) => {
			resolve(getCookie('mazecode_user'));
		})
			.then((cookie) => {
				if (cookie.length !== 0) {
					return JSON.parse(cookie);
				} else {
					throw new Error('No user stored in cookie!');
				}
			})
			.then((user) => setUser(user))
			.catch((error) => {
				console.error(error.message);
				return error.message;
			})
			.finally(() => setIsLoading(false));
	}, []);

	const handleUser = async (path, data) => {
		try {
			const { status, message, user, jwt } = await postData(path, data);

			setCookie(
				'mazecode_user',
				JSON.stringify({
					...user,
					token: jwt.token,
				}),
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

	const handleSignUp = async (data) => handleUser('api/v1/auth/signup', data);

	const handleSignIn = async (data) => handleUser('api/v1/auth/signin', data);

	const handleLogOut = () => {
		new Promise((resolve, reject) => {
			setIsLoading(true);
			deleteCookie('mazecode_user', process.env.FRONT_END_ROOT_URL);
			setUser({});
			resolve();
		})
			.then(() => {
				router.replace('/');
				// console.log(getCookie('mazecode_user'));
				return;
			})
			.then(() => {
				setIsLoading(false);
				return;
			});
	};

	const context = {
		user,
		isLoading,
		handleSignUp,
		handleSignIn,
		handleLogOut,
	};

	return (
		<UserContext.Provider value={context}>{children}</UserContext.Provider>
	);
};

export default UserContext;
