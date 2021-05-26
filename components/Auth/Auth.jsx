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

	useEffect(() => {
		if (!UserCxt.isLoading && user.id) {
			router.replace('/');
		} else {
			setIsLoading(false);
		}
	}, [user]);

	if (UserCxt.isLoading || isLoading /*user.id*/) {
		return <p className={`${classes.auth} ${classes.loading}`}>Loading...</p>;
	}

	return (
		<section className={classes.auth}>
			<SignIn />
		</section>
	);
};

export default Auth;
