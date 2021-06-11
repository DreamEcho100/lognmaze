import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import UserContext from '../../store/UserContext';

import Auth from '../../components/Auth/Auth';

import Button from '../../components/UI/V1/Button/Button';

const AuthPage = ({
	UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
}) => {
	const router = useRouter();

	const { user, handleSignOut, ...UserCxt } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(true);
	const [isSigned, setIsSigned] = useState(false);

	useEffect(() => {
		if (!UserCxt.isLoading) {
			if (user && user.id) {
				setIsSigned(true);
			} else {
				isSigned && setIsSigned(false);
			}
		}
		setIsLoading(false);
	}, [user, user.id, UserCxt.isLoading]);

	useEffect(() => {
		if (user && user.id) {
			setIsSigned(true);
		} else {
			isSigned && setIsSigned(false);
		}
	}, []);

	// useEffect(() => {

	// }, [isSigned]);

	if (isLoading || UserCxt.isLoading) {
		return <p>Loading...</p>;
	}

	if (isSigned) {
		return (
			<>
				<p>You Are Already Signed!</p>
				<Button onClick={() => router.replace('/')}>
					Return To Home Page
				</Button>{' '}
				or <Button onClick={() => handleSignOut()}>Sign Out</Button>
			</>
		);
	}

	return (
		<>
			<Auth
				UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN={
					UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN
				}
			/>
		</>
	);
};

export const getStaticProps = async (ctx) => {
	const UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN = await fetch(
		'https://www.universal-tutorial.com/api/getaccesstoken',
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'api-token':
					process.env
						.UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_API_TOKEN,
				'user-email':
					process.env
						.UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_USER_EMAIL,
			},
		}
	)
		.then((response) => response.json())
		.then((data) => data.auth_token)
		.catch((error) => {
			console.error(error);
			return '';
		});

	return {
		props: {
			UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
		},
	};
};

export default AuthPage;
