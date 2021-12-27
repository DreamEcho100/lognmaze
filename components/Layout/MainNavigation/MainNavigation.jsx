import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './MainNavigation.module.css';

import { setDataFirstTime, handleSignOut } from '@store/UserContext/actions';
import { useUserSharedState } from '@store/UserContext';

// import NavOnBigScreens from './NavOnBigScreens/NavOnBigScreens';
// import NavOnSmallScreens from './NavOnSmallScreens/NavOnSmallScreens';
import Button from '@components/UI/V1/Button';
const MainNavigation = () => {
	const [userState, userDispatch] = useUserSharedState();

	const [showNavOnSmallScreens, setShowNavOnSmallScreens] = useState(false);

	const CBSetDataFirstTime = useCallback(
		() => setDataFirstTime({ dispatch: userDispatch }),
		[userDispatch]
	);

	useEffect(() => {
		CBSetDataFirstTime();
	}, [CBSetDataFirstTime]);

	return (
		<header
			className={`${classes.header} ${
				showNavOnSmallScreens ? classes.showNavOnSmallScreens : ''
			}`}
		>
			<nav className={classes['nav']}>
				<div className={classes['logo']}>
					<Link href='/' passHref>
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
					{!userState.isVerifyingUserLoading && userState.user.id && (
						<li>
							<span onClick={() => setShowNavOnSmallScreens(false)}>
								<Link href={`/profile/${userState.user.user_name_id}`} passHref>
									<a title={`${userState.user.user_name_id} profile`}>
										<FontAwesomeIcon icon={['fas', 'user']} /> Profile
									</a>
								</Link>
							</span>
						</li>
					)}
					{!userState.isVerifyingUserLoading && !userState.user.id && (
						<li>
							<span onClick={() => setShowNavOnSmallScreens(false)}>
								<Link href='/auth'>
									<a title='Sign In/Up'>Sign In/Up</a>
								</Link>
							</span>
						</li>
					)}
					{!userState.isVerifyingUserLoading && userState.user.id && (
						<li>
							<span onClick={() => setShowNavOnSmallScreens(false)}>
								<Button
									title='Sign Out'
									className={classes.button}
									onClick={() => handleSignOut({ dispatch: userDispatch })}
								>
									Sign Out
								</Button>
							</span>
						</li>
					)}
				</ul>
				{/* <NavOnBigScreens
				userState.user={userState.userState.user}
				userState.isVerifyingUserLoading={userState.userState.isVerifyingUserLoading}
				handleSignOut={() => handleSignOut({ dispatch: userDispatch })}
			/>
			<NavOnSmallScreens
				userState.user={userState.userState.user}
				isVerifyinUserLoading={userState.userState.isVerifyingUserLoading}
				handleSignOugt={() => handleSignOut({ dispatch: userDispatch })}
			/> */}
			</nav>
		</header>
	);
};

export default MainNavigation;
