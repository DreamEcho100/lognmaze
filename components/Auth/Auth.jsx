import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import classes from './auth.module.css';

import UserContext from '../../store/UserContext';

import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const Auth = () => {
	const router = useRouter();

	const { user, ...UserCxt } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(true);
	const [signInComponent, setSignInComponent] = useState(true);
	const [signUpComponent, setSignUpComponent] = useState(false);

	useEffect(() => {
		console.log(!UserCxt.isLoading);
		console.log(user);
		console.log(user.id);
		console.log(!UserCxt.isLoading && user && user.id);
		if (!UserCxt.isLoading && user && user.id) {
			router.replace('/');
		} else {
			setIsLoading(false);
		}
	}, [user]);

	useEffect(() => {
		console.log(!UserCxt.isLoading);
		console.log(user);
		console.log(user.id);
		if (user && user.id) {
			router.replace('/');
		}
	}, []);

	if (UserCxt.isLoading || isLoading /*user.id*/) {
		return <p className={`${classes.auth} ${classes.loading}`}>Loading...</p>;
	}

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
