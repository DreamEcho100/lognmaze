import { GetStaticProps, NextPage } from 'next';

import AuthScreen from '@screens/Auth';

export type TAuthPageProps =
	| {
			status: 'success';
			UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN: string;
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  }
	| {
			status: 'error';
			errMsg: string;
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  };

const AuthPage: NextPage<TAuthPageProps> = (props) => {
	return <AuthScreen {...props} />;
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		if (
			!process.env
				.UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_API_TOKEN ||
			!process.env.UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_USER_EMAIL
		)
			throw new Error(
				"UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_API_TOKEN or UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_USER_EMAIL doesn't exist in the environment variables!"
			);

		const UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN =
			await fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
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
			})
				.then((response) => response.json())
				.then(({ auth_token }) => auth_token);
		return {
			props: {
				status: 'success',
				UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
				date: new Date().toISOString(),
			},
			revalidate: 86400,
		};
	} catch (err) {
		return {
			props: {
				status: 'error',
				errMsg:
					err instanceof Error
						? err.message
						: 'Ops, We&apos;re facing some technical problems \u{1F62D}, please try again later!',
				date: new Date().toISOString(),
			},
			revalidate: 86400,
		};
	}
};

export default AuthPage;
