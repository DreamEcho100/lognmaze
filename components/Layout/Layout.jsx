import { useEffect, useState } from 'react';

// import classes from './Layout.module.css';

import { UserContextProvider } from '@store/UserContext';
import { NewsContextProvider } from '@store/NewsContext';

import MainNavigation from './MainNavigation/MainNavigation';
import MainIntro from './MainIntro';

const Layout = ({ children /*, isAuthenticated*/ }) => {
	return (
		<UserContextProvider>
			<NewsContextProvider>
				<MainNavigation /*isAuthenticated={isAuthenticated}*/ />
				{children}
				<MainIntro />
			</NewsContextProvider>
		</UserContextProvider>
	);
};

export default Layout;
