import types from './types';

const reducer = (state, action) => {
	if (action.type === types.SET_DATA_FIRST_TIME) {
		const { user, token, isVerifyingUserLoading } = action.payload;

		return {
			...state,
			user,
			token,

			isVerifyingUserLoading,
		};
	}

	if (action.type === types.SET_DATA) {
		const { user, token, isVerifyingUserLoading } = action.payload;

		return {
			...state,
			user,
			token,

			isVerifyingUserLoading,
		};
	}

	if (action.type === types.RESET_DATA) {
		return {
			...state,
			user: {},
			token: '',
		};
	}

	if (action.type === types.UPDATE_USER_DATA) {
		const { updatedData } = action.payload;

		return {
			...state,
			user: {
				...state.user,
				...updatedData,
			},
		};
	}

	if (action.type === types.UPDATE_USER_DATA_TO_THE_LATEST) {
		const { latestData } = action.payload;

		return {
			...state,
			user: {
				...state.user,
				...latestData,
			},
		};
	}
};

export default reducer;
