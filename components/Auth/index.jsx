import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import classes from './index.module.css';

import UserContext from '../../store/UserContext';

const DynamicSignUp = dynamic(() => import('./SignUp/SignUp'));
const DynamicSignIn = dynamic(() => import('./SignIn/SignIn'));

// import SignIn from './SignIn/SignIn';
// import SignUp from './SignUp/SignUp';
import Button from '@components/UI/V1/Button';

const Auth = ({
	UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
	// signType,
	...props
}) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [signType, setSignType] = useState('');

	useEffect(() => {
		// if (signType === 'up') {
		// 	setSignInComponent(false);
		// }
		setSignType(props.signType || 'in');
	}, []);

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
			{signType === 'in' && <DynamicSignIn />}
			{signType === 'up' && (
				<DynamicSignUp
					UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN={
						UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN
					}
				/>
			)}
		</main>
	);
};

export default Auth;
