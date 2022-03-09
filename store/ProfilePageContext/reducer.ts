import {
	IUserProfilePageContextReducerAction,
	IUserProfilePageContextState,
} from './ts';

const reducer = (
	state: IUserProfilePageContextState,
	actions: IUserProfilePageContextReducerAction
) => {
	if (process.env.NODE_ENV !== 'production')
		console.log('actions.type', actions.type);

	switch (actions.type) {
		default:
			return state;
	}
};

export default reducer;
