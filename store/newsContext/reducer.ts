import { INewsContextReducerAction, INewsContextState } from './ts';

const reducer = (
	state: INewsContextState,
	actions: INewsContextReducerAction
) => {
	if (process.env.NODE_ENV !== 'production')
		console.log('actions.type', actions.type);

	switch (actions.type) {
		default:
			return state;
	}
};

export default reducer;
