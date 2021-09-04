import { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

import classes from './index.module.css';

// const DynamicSignUp = dynamic(() => import('./SignUp/SignUp'));
// const DynamicSignIn = dynamic(() => import('./SignIn/SignIn'));
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';

import Button from '@components/UI/V1/Button';

const Auth = ({
	UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
	dynamicComponentReady,
	setDynamicComponentReady,
	...props
}) => {
	const [signType, setSignType] = useState('');

	useEffect(() => {
		setSignType(props.signType || 'in');

		if (!dynamicComponentReady && setDynamicComponentReady) {
			setDynamicComponentReady(true);
		}
	}, []);

	if (!dynamicComponentReady) {
		return <p>Loading...</p>;
	}

	return (
		<main className={`${classes.auth} main`}>
			<header className={classes.header}>
				<nav>
					<ul>
						<li
							onClick={() => {
								setSignType('in');
							}}
						>
							<Button title='Sign In'>Sign In</Button>
						</li>
						<li
							onClick={() => {
								setSignType('up');
							}}
						>
							<Button title='Sign Up'>Sign Up</Button>
						</li>
					</ul>
				</nav>
			</header>
			{signType === 'in' && (
				<SignIn
				//DynamicSignIn
				/>
			)}
			{signType === 'up' && (
				<SignUp
					// DynamicSignUp
					UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN={
						UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN
					}
				/>
			)}
		</main>
	);
};

export default Auth;
