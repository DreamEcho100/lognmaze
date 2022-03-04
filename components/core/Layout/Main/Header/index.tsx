import {
	// useCallback,
	//  useEffect,
	useState,
} from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './styles.module.css';

import { useUserSharedState } from 'store/UserContext';
import {
	logoutUserRequestAction,
	logoutUserRequestResetAction,
} from 'store/UserContext/actions';
import ButtonComponent from '@commonComponentsIndependent/Button';
import { IUser } from '@coreLib/ts/global';

// import { setDataFirstTime, handleSignOut } from '@store/UserContext/actions';
// import { useUserSharedState } from '@store/UserContext';

// import NavOnBigScreens from './NavOnBigScreens/NavOnBigScreens';
// import NavOnSmallScreens from './NavOnSmallScreens/NavOnSmallScreens';
// import Button from '@components/UI/V1/Button';
const MainNavigation = () => {
	const [
		{
			data: { user: userData, token },
		},
		userDispatch,
	] = useUserSharedState();

	const [showNavOnSmallScreens, setShowNavOnSmallScreens] = useState(false);

	// const CBSetDataFirstTime = useCallback(
	// 	() => setDataFirstTime({ dispatch: userDispatch }),
	// 	[userDispatch]
	// );

	// useEffect(() => {
	// 	CBSetDataFirstTime();
	// }, [CBSetDataFirstTime]);

	const handleLogout = (id: IUser['id'], token: string) => {
		logoutUserRequestAction(userDispatch, {
			bodyContent: { id: id },
			token,
		});

		setTimeout(() => logoutUserRequestResetAction(userDispatch), 3000);
	};

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
					{
						/*!userData.isVerifyingUserLoading && */ userData?.id && token && (
							<li>
								<span onClick={() => setShowNavOnSmallScreens(false)}>
									<Link href={`/users/${userData?.user_name_id}`} passHref>
										<a title={`${userData?.user_name_id} profile`}>
											<FontAwesomeIcon icon={['fas', 'user']} /> Profile
										</a>
									</Link>
								</span>
							</li>
						)
					}
					{
						/*!userData.isVerifyingUserLoading && */ (!userData?.id ||
							!token) && (
							<li>
								<span onClick={() => setShowNavOnSmallScreens(false)}>
									<Link href='/auth'>
										<a title='Sign In/Up'>Sign In/Up</a>
									</Link>
								</span>
							</li>
						)
					}
					{
						/*!userData.isVerifyingUserLoading && */ userData?.id && token && (
							<li>
								<span onClick={() => setShowNavOnSmallScreens(false)}>
									<ButtonComponent
										title='Sign Out'
										className={classes.button}
										onClick={() => handleLogout(userData.id, token)}
									>
										Sign Out
									</ButtonComponent>
								</span>
							</li>
						)
					}
				</ul>
				{/* <NavOnBigScreens
				userData?={userData?State.user}
				userData.isVerifyingUserLoading={userData?State.isVerifyingUserLoading}
				handleSignOut={() => handleSignOut({ dispatch: userDispatch })}
			/>
			<NavOnSmallScreens
				userData?={userData?State.user}
				isVerifyinUserLoading={userData?State.isVerifyingUserLoading}
				handleSignOugt={() => handleSignOut({ dispatch: userDispatch })}
			/> */}
			</nav>
		</header>
	);
};

export default MainNavigation;
