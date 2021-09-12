import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import UserContext from '@store/UserContext';

// import Auth from '@components/Auth';
const DynamicAuth = dynamic(() => import('@components/Auth'));

import Button from '@components/UI/V1/Button';

const AuthPage = ({
	UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
}) => {
	const router = useRouter();

	const { dispatch: userDispatch, state: userState } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(true);
	const [dynamicComponentReady, setDynamicComponentReady] = useState(false);

	const [signType, setSignType] = useState('in');

	// useEffect(() => {
	// 	if (userState.isVerifyingUserLoading) return;

	// 	if (userState.userExist) router.replace('/');
	// 	else if (isLoading) setIsLoading(false);
	// }, [userState.userExist, userState.isVerifyingUserLoading]);

	useEffect(() => {
		(() => {
			const params = new URLSearchParams(window.location.search);
			const signType = params.get('sign-type');
			if (signType === 'up') {
				setSignType(signType);
			}

			if (userState.isVerifyingUserLoading) return;

			if (userState.userExist) router.replace('/');
			else if (isLoading) setIsLoading(false);
		})();
	}, []);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (userState.userExist) {
		return (
			<>
				<p>You Are Already Signed!</p>
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
			<DynamicAuth
				dynamicComponentReady={dynamicComponentReady}
				setDynamicComponentReady={setDynamicComponentReady}
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

/*
let countriesData = [];

new Promise(async (resolve, reject) => {
new Promise(async (resolve, reject) => {
  await fetch(
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
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(error => {
      console.error(error);
      resolve('');
    })
})
.then(async ({auth_token}) => {
  if (!auth_token && auth_token.length === 0) return [];
  let countries = [];

  countries = await fetch(
    'https://www.universal-tutorial.com/api/countries/',
    {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${auth_token}`,
      },
    }
  ).then((response) => response.json())
    .catch((error) => {
      console.error(error);
      countriesData = [];
    });
  
    countries.forEach(async (country) => {
      country.states = [];
      new Promise(async(resolve, reject) => {
        await fetch(
        `https://www.universal-tutorial.com/api/states/${country.country_name}`,
        {
          method: 'GET',
          headers: {
            'authorization': `Bearer ${auth_token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.error(error);
          reject(data);
        });
      })
      .then( data => {
        country.states = data;
        country.states.forEach((state, stateIndex) => {
          country.states[stateIndex].cities = [];
          new Promise(async (resolve, reject) => {
            await fetch(
                `https://www.universal-tutorial.com/api/states/${country.country_name}`,
                {
                  method: 'GET',
                  headers: {
                    'authorization': `Bearer ${auth_token}`,
                  },
                }
              )
                .then((response) => response.json())
                .then((data) => {
                  resolve(data);
                })
                .catch((error) => {
                  console.error(error);
                  reject(data);
                });
          })
          .then(data => {
            country.states[stateIndex].cities = data;
          });

        });
      });

    });

  countriesData = countries;

})
.then(() => resolve());

});
*/
