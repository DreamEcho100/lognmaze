import { IUserContextState } from "./ts";

export const returnUserContextInitialState = (): IUserContextState => ({
	data: {
		// user: ls.get<IUserAuthenticatedData | undefined>('userData', undefined),
		// token: typeof window !== 'undefined' ? getCookie('accessToken') : undefined,
	},
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