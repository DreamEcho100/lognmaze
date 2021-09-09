import dynamic from 'next/dynamic';

import { UserContextProvider } from '@store/UserContext';

const DynamicMainNavigation = dynamic(() =>
	import('./MainNavigation/MainNavigation')
);
const DynamicMainIntro = dynamic(() => import('./MainIntro'));

const Layout = ({ children }) => {
	return (
		<UserContextProvider>
			<DynamicMainNavigation />
			{children}
			<DynamicMainIntro />
		</UserContextProvider>
	);
};

export default Layout;
