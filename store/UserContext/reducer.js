import types from './types';

const reducer = (state, action) => {
	if (action.type === types.SET_DATA_FIRST_TIME) {
		const { user, token, userExist, isVerifyingUserLoading } = action.payload;

		return {
			...state,
			user,
			token,
			userExist,
			isVerifyingUserLoading,
		};
	}

	if (action.type === types.SET_DATA) {
		const { user, token, userExist, isVerifyingUserLoading } = action.payload;

		return {
			...state,
			user,
			token,
			userExist,
			isVerifyingUserLoading,
		};
	}

	if (action.type === types.RESET_DATA) {
		return {
			...state,
			user: {},
			token: '',
			userExist: false,
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
};

export default reducer;