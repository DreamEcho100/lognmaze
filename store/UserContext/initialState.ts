import { IUserContextState } from './ts';

export const returnUserContextInitialState = (): IUserContextState => ({
	data: {},
	actions: {
		requests: {
			login: {
				errorMessage: '',
				isLoading: false,
				success: false,
			},
			signup: {
				errorMessage: '',
				isLoading: false,
				success: false,
			},
			logout: {
				errorMessage: '',
				isLoading: false,
				success: false,
			},
		},

		init: {
			storeData: {
				errorMessage: '',
				isLoading: true,
				success: false,
			},
		},
	},
});
