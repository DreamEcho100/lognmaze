import { useContext, useEffect } from 'react';

import MainNavigationClasses from './MainNavigation.module.css';

import UserContext from '../../../store/UserContext';
import NavOnBigScreens from './NavOnBigScreens/NavOnBigScreens';
import NavOnSmallScreens from './NavOnSmallScreens/NavOnSmallScreens';

const MainNavigation = () => {
	const { verifyUserTokenFromCookie, user, isLoading, handleSignOut } =
		useContext(UserContext);

	useEffect(() => verifyUserTokenFromCookie(), []);

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
