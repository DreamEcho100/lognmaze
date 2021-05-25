import { useContext } from 'react';

import classes from './Layout.module.css';

import { UserContextProvider } from '../../store/UserContext';
import MainNavigation from './MainNavigation/MainNavigation';

const Layout = ({ children }) => {
	return (
		<UserContextProvider>
			<MainNavigation />
			<main className={classes.main}>{children}</main>
		</UserContextProvider>
	);
};

export default Layout;
