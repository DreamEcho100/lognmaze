import { useContext, useEffect, useState } from 'react';

import classes from './auth.module.css';

import UserContext from '../../store/UserContext';

import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import Button from '@components/UI/V1/Button';

const Auth = ({
	UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
	signType,
}) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [signInComponent, setSignInComponent] = useState(true);

	useEffect(() => {
		if (signType === 'up') {
			setSignInComponent(false);
		}
	}, []);

	return (
		<section className={classes.auth}>
			<header className={classes.header}>
				<nav>
					<ul>
						<li
							onClick={() => {
								setSignInComponent(true);
							}}
						>
							<Button>Sign In</Button>
						</li>
						<li
							onClick={() => {
								setSignInComponent(false);
							}}
						>
							<Button>Sign Up</Button>
						</li>
					</ul>
				</nav>
			</header>
			{signInComponent ? (
				<SignIn />
			) : (
				<SignUp
					UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN={
						UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN
					}
				/>
			)}
		</section>
	);
};

export default Auth;
