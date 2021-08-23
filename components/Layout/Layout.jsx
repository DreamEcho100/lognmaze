import { useEffect, useState } from 'react';

// import classes from './Layout.module.css';

import { UserContextProvider } from '@store/UserContext';
import { NewsContextProviderTest } from '@store/NewsContextTest';

import MainNavigation from './MainNavigation/MainNavigation';
import MainIntro from './MainIntro';

const Layout = ({ children /*, isAuthenticated*/ }) => {
	return (
		<UserContextProvider>
			<NewsContextProviderTest>
				<MainNavigation /*isAuthenticated={isAuthenticated}*/ />
				{children}
				<MainIntro />
			</NewsContextProviderTest>
		</UserContextProvider>
	);
};

export default Layout;
