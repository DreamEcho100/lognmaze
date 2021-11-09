import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useUserSharedState } from '@store/UserContext';

// import Auth from '@components/Auth';
import Auth from '@components/Auth';

import Button from '@components/UI/V1/Button';

const AuthPage = ({
	UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
}) => {
	const router = useRouter();

	const [userState, userDispatch] = useUserSharedState();

	const [isLoading, setIsLoading] = useState(true);

	const [signType, setSignType] = useState('in');

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const querySignType = params.get('sign-type');
		if (querySignType === 'up') {
			setSignType(querySignType);
		}
	}, []);

	useEffect(() => {
		if (!isLoading) return;

		if (!userState.isVerifyingUserLoading) {
			if (isLoading) setIsLoading(false);
			return;
		} // else if (userState.userExist) router.replace('/');

		// if (!isLoading) return setIsLoading(true);
	}, [
		isLoading,
		userState.isVerifyingUserLoading,
		// userState.userExist,
		// router,
	]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (userState.userExist) {
		return (
			<>
				<p>You Are Already Signed In!</p>
				<Button title='Return To Home Page' onClick={() => router.replace('/')}>
					Return To Home Page
				</Button>{' '}
				or{' '}
				<Button
					title='Sign Out'
					onClick={() => handleSignOut({ dispatch: userDispatch })}
				>
					Sign Out
				</Button>
			</>
		);
	}

	return (
		<>
			<Auth
				setSignType={setSignType}
				signType={signType}
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
			Accept: 'application/json',
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
		.then((response) => {
			return response;
		})
		.then((response) => response.json())
		.then((data) => data.auth_token)
		.catch((error) => {
			console.error(error);
			return null;
		});

	return {
		props: {
			UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
		},
		revalidate: 86400,
	};
};

export default AuthPage;
