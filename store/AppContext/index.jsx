import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import types from './types';
import reducer from './reducer';

const initialState = {
	routerStage: types.INIT,
	routerIsReady: false,
	types,
};

const useAppState = () => useReducer(reducer, initialState);

export const {
	Provider: AppContextSharedProvider,
	useTracked: useAppSharedState,
} = createContainer(useAppState);

const obj = {
	AppContextSharedProvider,
	useAppSharedState,
};

export default obj;
