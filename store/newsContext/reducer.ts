import { TNewsContextReducerAction, INewsContextState } from './ts';

const reducer = (
	state: INewsContextState,
	actions: TNewsContextReducerAction
) => {
	// if (process.env.NODE_ENV !== 'production')
	// 	console.log('actions.type', actions.type);

	switch (actions) {
		default:
			return state;
	}
};

export default reducer;
