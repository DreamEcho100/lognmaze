import { UserContextProvider } from '@store/UserContext';

import MainNavigation from './MainNavigation/MainNavigation';
import MainIntro from './MainIntro';

const Layout = ({ children }) => {
	return (
		<UserContextProvider>
			<MainNavigation />
			{children}
			<MainIntro />
		</UserContextProvider>
	);
};

export default Layout;
