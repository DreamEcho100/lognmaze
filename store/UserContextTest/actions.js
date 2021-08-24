import types from './types';

export const something = async ({ dispatch }) => {
	dispatch({
		type: types.SOMETHING,
		payload: {},
	});
};
