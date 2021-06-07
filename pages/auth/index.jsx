import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import UserContext from '../../store/UserContext';

import Auth from '../../components/Auth/Auth';

const AuthPage = ({
	UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
}) => {
	const router = useRouter();

	const { user, ...UserCxt } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!UserCxt.isLoading && user && user.id) {
			router.replace('/');
		} else {
			setIsLoading(false);
		}
	}, [user]);

	useEffect(() => {
		if (user && user.id) {
			router.replace('/');
		}
	}, []);

	if (UserCxt.isLoading || isLoading /*user.id*/) {
		return <p>Loading...</p>;
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
		.catch((error) => console.error(error));

	return {
		props: {
			UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
		},
	};
};

export default AuthPage;
