// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// import types from '@store/AppContext/types';
// import { AppContextSharedProvider, useAppSharedState } from '@store/AppContext';
// import { UserContextSharedProvider } from '@store/UserContext';

import { ReactNode, useEffect } from 'react';

// import classes from './index.module.css';

import { useUserSharedState } from '@store/UserContext';
import { initStoreDataAction } from '@store/UserContext/actions';

import MainNavigation from './Header';
import MainIntroComponent from './Intro';

interface ILayoutProps {
	children: ReactNode;
}

const MainLayoutComponent = ({ children }: ILayoutProps) => {
	// const router = useRouter();

	// const [appState, appDispatch] = useAppSharedState();

	// useEffect(() => {
	// 	const handleRouteChangeStart = (url, { shallow }) => {
	// 		appDispatch({
	// 			type: types.ROUTER_CHANGE_EVENT,
	// 			payload: { routerStage: types.ROUTER_CHANGE_START },
	// 		});
	// 	};

	// 	const handleRouteChangeComplete = (url, { shallow }) => {
	// 		appDispatch({
	// 			type: types.ROUTER_CHANGE_EVENT,
	// 			payload: { routerStage: types.ROUTER_CHANGE_Complete },
	// 		});
	// 	};

	// 	router.events.on('routeChangeStart', handleRouteChangeStart);
	// 	router.events.on('routeChangeComplete', handleRouteChangeComplete);

	// 	// If the component is unmounted, unsubscribe
	// 	// from the event with the `off` method:
	// 	return () => {
	// 		router.events.off('routeChangeStart', handleRouteChangeStart);
	// 		router.events.off('routeChangeComplete', handleRouteChangeComplete);
	// 	};
	// }, [router.events, appDispatch]);

	// useEffect(() => {
	// 	if (appState.isReady === router.isReady) return;

	// 	appDispatch({
	// 		type: types.ROUTER_IS_READY,
	// 		payload: { routerIsReady: router.isReady },
	// 	});
	// }, [router.isReady, appState.isReady, appDispatch]);
	const [userState, userDispatch] = useUserSharedState();

	useEffect(() => {
		initStoreDataAction(userDispatch);
	}, [userDispatch]);

	return (
		<>
			<MainNavigation />
			{children}
			<MainIntroComponent />
		</>
	);
};

export default MainLayoutComponent;
