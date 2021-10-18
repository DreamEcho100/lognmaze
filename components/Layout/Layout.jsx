import { UserContextSharedProvider } from '@store/UserContext';

import MainNavigation from './MainNavigation/MainNavigation';
import MainIntro from './MainIntro';

const Layout = ({ children }) => {
	return (
		<UserContextSharedProvider>
			<MainNavigation />
			{children}
			<MainIntro />
		</UserContextSharedProvider>
	);
};

export default Layout;
