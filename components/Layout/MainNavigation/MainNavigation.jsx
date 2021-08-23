import { useContext, useEffect } from 'react';

import MainNavigationClasses from './MainNavigation.module.css';

import UserContext from '../../../store/UserContext';
import NavOnBigScreens from './NavOnBigScreens/NavOnBigScreens';
import NavOnSmallScreens from './NavOnSmallScreens/NavOnSmallScreens';

const MainNavigation = (/*{ isAuthenticated }*/) => {
	const {
		verifyUserTokenFromCookie,
		// setUserDataAndTokenFomCookie,
		user,
		isLoading,
		// setIsLoading,
		handleSignOut,
	} = useContext(UserContext);

	// useEffect(() => {
	// 	// setTimeout(() => verifyUserTokenFromCookie(), 250);
	// 	if (!isAuthenticated) handleSignOut();
	// 	else setUserDataAndTokenFomCookie();
	// }, []);

	useEffect(() => setTimeout(() => verifyUserTokenFromCookie(), 250), []);

	return (
		<header className={MainNavigationClasses.header}>
			<NavOnBigScreens
				user={user}
				isLoading={isLoading}
				handleSignOut={handleSignOut}
			/>
			<NavOnSmallScreens
				user={user}
				isLoading={isLoading}
				handleSignOut={handleSignOut}
			/>
		</header>
	);
};

export default MainNavigation;
