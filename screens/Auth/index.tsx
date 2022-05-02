import { FC, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import classes from './index.module.css';
import helpersClasses from '@styles/helpers.module.css';
import borderClasses from '@styles/border.module.css';
import boxShadowClasses from '@styles/boxShadow.module.css';

import { TAuthPageProps } from 'pages/auth';
import { useUserSharedState } from '@store/UserContext';
import {
	loginUserRequestResetAction,
	signupUserRequestResetAction,
} from '@store/UserContext/actions';

import ButtonComponent from '@commonComponentsIndependent/Button';
import LoginComponent from '@coreComponents/Auth/Login';
import SignUpComponent from '@coreComponents/Auth/SignUp';

const AuthScreen: FC<TAuthPageProps> = (props) => {
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
		redirectPath,
		router,
		isRedirectingFromAuth,
	]);

	return (
		<>
			<NextSeo
				openGraph={{
					type: 'website',
					url: 'https://lognmaze.com/auth/',
					title: 'Login or Sign up to LogNMaze',
					description:
						'Login or Sign up to LogNMaze | Create blogs, blogs using Markdown and share them in your social media',
					images: [
						{
							url: 'https://lognmaze.com/favicon.ico',
							width: 250,
							height: 250,
							alt: 'LogNMaze Logo',
						},
					],
				}}
			/>
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
				{(!isRedirectingFromAuth &&
					{
						login: <LoginComponent />,
						signup:
							props.status === 'success' ? (
								<SignUpComponent {...props} />
							) : (
								<section>
									<p className='heading-2'>{props.errMsg}</p>
								</section>
							),
					}[objective]) || <></>}
			</main>
		</>
	);
};

export default AuthScreen;
