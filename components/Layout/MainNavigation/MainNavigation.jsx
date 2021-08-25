import { useContext, useEffect } from 'react';

import MainNavigationClasses from './MainNavigation.module.css';

import {
	setDataFirstTime,
	handleSignOut,
} from '@store/UserContextTest/actions';
import UserContextTest from '@store/UserContextTest';

import NavOnBigScreens from './NavOnBigScreens/NavOnBigScreens';
import NavOnSmallScreens from './NavOnSmallScreens/NavOnSmallScreens';

const MainNavigation = () => {
	const { dispatch: userDispatch, state: userState } =
		useContext(UserContextTest);

	useEffect(
		() =>
			setTimeout(() => {
				setDataFirstTime({ dispatch: userDispatch });
			}, 250),
		[]
	);

	return (
		<header className={MainNavigationClasses.header}>
			<NavOnBigScreens
				user={userState.user}
				isVerifyingUserLoading={userState.isVerifyingUserLoading}
				handleSignOut={() => handleSignOut({ dispatch: userDispatch })}
			/>
			<NavOnSmallScreens
				user={userState.user}
				isVerifyingUserLoading={userState.isVerifyingUserLoading}
				handleSignOut={() => handleSignOut({ dispatch: userDispatch })}
			/>
		</header>
	);
};

export default MainNavigation;
