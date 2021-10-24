import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import types from '@store/AppContext/types';
import { AppContextSharedProvider, useAppSharedState } from '@store/AppContext';
import { UserContextSharedProvider } from '@store/UserContext';

import MainNavigation from './MainNavigation/MainNavigation';
import MainIntro from './MainIntro';

const Layout = ({ children }) => {
	const router = useRouter();

	const [appState, appDispatch] = useAppSharedState();

	const [isWindowVertical, setIsWindowVertical] = useState(
		!!(typeof window !== 'undefined' && window.innerHeight > window.innerWidth)
	);

	useEffect(() => {
		const handleRouteChangeStart = (url, { shallow }) => {
			appDispatch({
				type: types.ROUTER_CHANGE_EVENT,
				payload: { routerStage: types.ROUTER_CHANGE_START },
			});
		};

		const handleRouteChangeComplete = (url, { shallow }) => {
			appDispatch({
				type: types.ROUTER_CHANGE_EVENT,
				payload: { routerStage: types.ROUTER_CHANGE_Complete },
			});
		};

		router.events.on('routeChangeStart', handleRouteChangeStart);
		router.events.on('routeChangeComplete', handleRouteChangeComplete);

		// If the component is unmounted, unsubscribe
		// from the event with the `off` method:
		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart);
			router.events.off('routeChangeComplete', handleRouteChangeComplete);
		};
	}, []);

	useEffect(() => {
		if (appState.isReady === router.isReady) return;

		appDispatch({
			type: types.ROUTER_IS_READY,
			payload: { routerIsReady: router.isReady },
		});
	}, [router.isReady]);

	return (
		<>
			{/* {Math.random()} */}
			<MainNavigation />
			{children}
			<MainIntro isWindowVertical={isWindowVertical} />
		</>
	);
};

const GlobalContext = ({ children }) => {
	return (
		<AppContextSharedProvider>
			<UserContextSharedProvider>
				<Layout>{children}</Layout>
			</UserContextSharedProvider>
		</AppContextSharedProvider>
	);
};

export default GlobalContext;
