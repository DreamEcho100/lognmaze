import UserContextConstants from '@coreLib/constants/store/types/userContext';
import { IUserContextReducerAction, IUserContextState } from './ts';

const reducer = (
	state: IUserContextState,
	actions: IUserContextReducerAction
) => {
	switch (actions.type) {
		case UserContextConstants.LOGOUT_REQUEST_RESET:
		case UserContextConstants.SIGNUP_REQUEST_PENDING:
		case UserContextConstants.LOGIN_REQUEST_PENDING: {
			return {
				...state,
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						[actions.type === UserContextConstants.LOGIN_REQUEST_PENDING
							? 'login'
							: actions.type === UserContextConstants.SIGNUP_REQUEST_PENDING
							? 'signup'
							: 'logout']: {
							errorMessage: '',
							isLoading: true,
							success: false,
						},
					},
				},
			};
		}
		case UserContextConstants.SIGNUP_REQUEST_SUCCESS:
		case UserContextConstants.LOGIN_REQUEST_SUCCESS: {
			const { user, token } = actions.payload;
			return {
				...state,
				data: {
					user,
					token,
				},
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						[actions.type === UserContextConstants.LOGIN_REQUEST_SUCCESS
							? 'login'
							: 'signup']: {
							errorMessage: '',
							isLoading: false,
							success: true,
						},
					},
				},
			};
		}
		case UserContextConstants.SIGNUP_REQUEST_FAIL:
		case UserContextConstants.LOGIN_REQUEST_FAIL: {
			const { errorMessage } = actions.payload;

			return {
				...state,
				data: {},
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						[actions.type === UserContextConstants.LOGIN_REQUEST_FAIL
							? 'login'
							: actions.type === UserContextConstants.SIGNUP_REQUEST_FAIL
							? 'signup'
							: 'logout']: {
							errorMessage,
							isLoading: false,
							success: false,
						},
					},
				},
			};
		}
		case UserContextConstants.LOGOUT_REQUEST_RESET:
		case UserContextConstants.SIGNUP_REQUEST_RESET:
		case UserContextConstants.LOGIN_REQUEST_RESET: {
			return {
				...state,
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						[actions.type === UserContextConstants.LOGIN_REQUEST_RESET
							? 'login'
							: actions.type === UserContextConstants.SIGNUP_REQUEST_RESET
							? 'signup'
							: 'logout']: {
							errorMessage: '',
							isLoading: false,
							success: false,
						},
					},
				},
			};
		}

		case UserContextConstants.LOGOUT_REQUEST_SUCCESS: {
			return {
				...state,
				data: {},
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						logout: {
							errorMessage: '',
							isLoading: false,
							success: true,
						},
					},
				},
			};
		}
		case UserContextConstants.LOGOUT_REQUEST_FAIL: {
			const { errorMessage } = actions.payload;

			return {
				...state,
				actions: {
					...state.actions,
					requests: {
						...state.actions.requests,
						logout: {
							errorMessage,
							isLoading: false,
							success: false,
						},
					},
				},
			};
		}

		default:
			return state;
	}
};

export default reducer;
