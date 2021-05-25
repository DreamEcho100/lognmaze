import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import classes from './auth.module.css';

import UserContext from '../../store/UserContext';

import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

const Auth = () => {
	const router = useRouter();

	const { user, isLoading } = useContext(UserContext);

	useEffect(() => {
		if (user.id) {
			router.replace('/');
		}
	}, [user]);

	if (isLoading || user.id) {
		return <p className={`${classes.auth} ${classes.loading}`}>Loading...</p>;
	}

	return (
		<section className={classes.auth}>
			<SignUp />
		</section>
	);
};

export default Auth;
