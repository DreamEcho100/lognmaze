import types from './types';

const reducer = (state, action) => {
	if (action.type === types.ROUTER_CHANGE_EVENT) {
		const { routerStage } = action.payload;

		return {
			...state,
			routerStage,
		};
	}

	if (action.type === types.ROUTER_IS_READY) {
		const { routerIsReady } = action.payload;

		return {
			...state,
			routerIsReady,
		};
	}
};

export default reducer;
