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
			setUser(user);
		}
		setIsLoading(false);
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

	const handleSignUp = async (data) => handleUser('api/auth/signup', data);

	const handleSignIn = async (data) => handleUser('api/auth/signin', data);

	const handleLogOut = () => {
		deleteCookie('mazecode_user', process.env.FRONT_END_ROOT_URL);
		setUser({});
		// window.location.href = '/';
		router.replace('/');
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
