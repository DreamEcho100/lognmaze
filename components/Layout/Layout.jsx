// import classes from './Layout.module.css';

import { UserContextProvider } from '@store/UserContext';

import MainNavigation from './MainNavigation/MainNavigation';
import MainIntro from './MainIntro';

const Layout = ({ children /*, isAuthenticated*/ }) => {
	return (
		<UserContextProvider>
			<MainNavigation /*isAuthenticated={isAuthenticated}*/ />
			{children}
			<MainIntro />
		</UserContextProvider>
	);
};

export default Layout;
