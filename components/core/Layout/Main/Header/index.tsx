import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

import { useUserSharedState } from '@store/UserContext';
import {
	logoutUserRequestAction,
	logoutUserRequestResetAction,
} from '@store/UserContext/actions';
import ButtonComponent from '@commonComponentsIndependent/Button';
import { IUserAuthenticatedData } from '@coreLib/ts/global';

const MainNavigation = () => {
	const [
		{
			data: { user: userData, token },
			actions: {
				init: { storeData: initStoreData },
				requests: {
					logout: logoutRequest,
					login: loginRequest,
					signup: signupRequest,
				},
			},
		},
		userDispatch,
	] = useUserSharedState();

	const [showNavOnSmallScreens, setShowNavOnSmallScreens] = useState(false);

	const handleLogout = (id: IUserAuthenticatedData['id'], token?: string) => {
		logoutUserRequestAction(userDispatch, {
			bodyContent: { id },
			token,
		});

		const logoutUserRequestResetActionTimeoutId = setTimeout(
			() => logoutUserRequestResetAction(userDispatch),
			1000
		);

		return () => clearTimeout(logoutUserRequestResetActionTimeoutId);
	};

	return (
		<header
			className={`${classes.header} ${
				showNavOnSmallScreens ? classes.showNavOnSmallScreens : ''
			}`}
		>
			<nav className={classes['nav']}>
				<div className={classes['logo']}>
					<Link href='/' prefetch={false}>
						<a title='LogNMaze | Home Page' className={classes.logo_anchor}>
							<strong>LogNMaze</strong>
						</a>
					</Link>
				</div>
				<button
					title='Click To Show Side Navbar'
					onClick={() => setShowNavOnSmallScreens(!showNavOnSmallScreens)}
					className={`${classes['menu-toggle-button']}`}
				>
					<span className={`${classes['line-1']} ${classes['line']}`}></span>
					<span className={`${classes['line-2']} ${classes['line']}`}></span>
					<span className={`${classes['line-3']} ${classes['line']}`}></span>
				</button>
				<div
					className={`${classes['wrapper']} ${
						showNavOnSmallScreens ? classes['showWrapperOnSmallScreens'] : ''
					}`}
					onClick={() => setShowNavOnSmallScreens(!showNavOnSmallScreens)}
				></div>
				<ul
					className={`${classes['nav-list']} ${
						showNavOnSmallScreens ? classes['show-nav'] : ''
					}`}
				>
					{userData?.id && (
						<li>
							<Link href={`/users/${userData?.user_name_id}`} prefetch={false}>
								<a
									onClick={() => setShowNavOnSmallScreens(false)}
									title={`${userData?.user_name_id} profile`}
								>
									<FontAwesomeIcon icon={['fas', 'user']} /> Profile
								</a>
							</Link>
						</li>
					)}
					{!userData?.id && (
						<li>
							<Link className={classes.button} href='/auth' prefetch={false}>
								<a title='Go to sign In/Up page'>Sign In/Up</a>
							</Link>
						</li>
					)}
					{userData?.id && (
						<li>
							<ButtonComponent
								title='Sign Out'
								className={classes.button}
								onClick={() => {
									handleLogout(userData.id, token);
									setShowNavOnSmallScreens(false);
								}}
								disabled={
									initStoreData.isLoading ||
									loginRequest.isLoading ||
									signupRequest.isLoading ||
									logoutRequest.isLoading
								}
							>
								Sign Out
							</ButtonComponent>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
