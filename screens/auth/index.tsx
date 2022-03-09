import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import classes from './index.module.css';
import helpersClasses from '@styles/helpers.module.css';
import borderClasses from '@styles/border.module.css';
import boxShadowClasses from '@styles/boxShadow.module.css';

import { useUserSharedState } from 'store/UserContext';
import {
	loginUserRequestResetAction,
	signupUserRequestResetAction,
} from 'store/UserContext/actions';

import ButtonComponent from '@commonComponentsIndependent/Button';
import LoginComponent from '@coreComponents/Auth/Login';
import SignUpComponent from '@coreComponents/Auth/SignUp';

type Props = {
	UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN: string;
};

const AuthScreen = ({
	UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
}: Props) => {
	const router = useRouter();
	const [
		{
			data: { user: userData },
			actions: {
				requests: { login: loginRequest, signup: signupRequest },
			},
		},
		userDispatch,
	] = useUserSharedState();

	const [objective, setObjective] = useState<'login' | 'signup'>('login');
	const [redirectPath, setRedirectPath] = useState('');
	const [isRedirecting, setIsRedirecting] = useState(false);

	useEffect(() => {
		setObjective(
			new URLSearchParams(window.location.search).get('objective') === 'signup'
				? 'signup'
				: 'login'
		);
		setRedirectPath(
			new URLSearchParams(window.location.search).get('redirectPath') || ''
		);
	}, []);

	const isRedirectingFromAuth = useMemo(
		() => loginRequest.success || signupRequest.success || userData?.id,
		[loginRequest.success, signupRequest.success, userData?.id]
	);

	useEffect(() => {
		if (!isRedirectingFromAuth) return;

		if (loginRequest.success) loginUserRequestResetAction(userDispatch);
		if (signupRequest.success) signupUserRequestResetAction(userDispatch);

		router.push(redirectPath || '/');
	}, [
		loginRequest.success,
		signupRequest.success,
		userDispatch,
		isRedirecting,
		redirectPath,
		router,
		isRedirectingFromAuth,
	]);

	return (
		<main className={helpersClasses.main}>
			<header className={classes.header}>
				<h1>
					Peace,{' '}
					{
						{
							login: 'Already a user ?',
							signup: 'New here :o ?',
							default: loginRequest.success
								? 'logged in successfully! Welcome back!'
								: signupRequest.success
								? 'Singed Up in successfully!'
								: 'Already a user logout first!',
						}[!isRedirectingFromAuth ? objective : 'default']
					}
				</h1>
				{!isRedirectingFromAuth && (
					<div className={classes.buttonsHolder}>
						<ButtonComponent
							className={
								objective === 'login'
									? `${borderClasses.border2} ${boxShadowClasses.boxShadow2}`
									: ''
							}
							onClick={() => setObjective('login')}
						>
							Login
						</ButtonComponent>
						<ButtonComponent
							className={
								objective === 'signup'
									? `${borderClasses.border2} ${boxShadowClasses.boxShadow2}`
									: ''
							}
							onClick={() => setObjective('signup')}
						>
							Sign Up
						</ButtonComponent>
					</div>
				)}
			</header>
			{
				(!isRedirectingFromAuth &&
					{
						login: <LoginComponent />,
						signup: (
							<SignUpComponent
								UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN={
									UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN
								}
							/>
						),
					}[objective]) || <></>
				// (objective === 'login' ? (
				// 	<LoginComponent />
				// ) : objective === 'signup' ? (
				// 	<SignUpComponent
				// 		UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN={
				// 			UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN
				// 		}
				// 	/>
				// ))
			}
		</main>
	);
};

export default AuthScreen;
