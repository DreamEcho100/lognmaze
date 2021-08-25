// import classes from './Layout.module.css';

import { UserContextTestProvider } from '@store/UserContextTest';
import { NewsContextProvider } from '@store/NewsContext';

import MainNavigation from './MainNavigation/MainNavigation';
import MainIntro from './MainIntro';

const Layout = ({ children /*, isAuthenticated*/ }) => {
	return (
		<UserContextTestProvider>
			<NewsContextProvider>
				<MainNavigation /*isAuthenticated={isAuthenticated}*/ />
				{children}
				<MainIntro />
			</NewsContextProvider>
		</UserContextTestProvider>
	);
};

export default Layout;
