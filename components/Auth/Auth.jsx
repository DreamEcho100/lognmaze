import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import classes from './auth.module.css';

import UserContext from '../../store/UserContext';

import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const Auth = () => {
	const router = useRouter();

	const { user, ...UserCxt } = useContext(UserContext);

	const [signInComponent, setSignInComponent] = useState(true);
	const [signUpComponent, setSignUpComponent] = useState(false);

	return (
		<section className={classes.auth}>
			<header>
				<nav>
					<ul>
						<li
							onClick={() => {
								setSignInComponent(true);
								setSignUpComponent(false);
							}}
						>
							<button>Sign In</button>
						</li>
						<li
							onClick={() => {
								setSignUpComponent(true);
								setSignInComponent(false);
							}}
						>
							<button>Sign Up</button>
						</li>
					</ul>
				</nav>
			</header>
			{signInComponent && <SignIn />}
			{signUpComponent && <SignUp />}
		</section>
	);
};

export default Auth;
