import { Dispatch } from 'react';

import { UserContextConstants } from '@coreLib/constants';
import {
	ILoginReqArgsProps,
	ILogoutReqArgsProps,
	ISignupReqArgsProps,
} from '@coreLib/networkReqArgs/_app/auth/ts';
import { IUserAuthenticatedData } from '@coreLib/ts/global';

export interface IUserContextState {
	data: {
		user?: IUserAuthenticatedData;
		token?: string;
	};
	actions: {
		requests: {
			login: {
				errorMessage: string;
				isLoading: boolean;
				success: boolean;
			};
			signup: {
				errorMessage: string;
				isLoading: boolean;
				success: boolean;
			};
			logout: {
				errorMessage: string;
				isLoading: boolean;
				success: boolean;
			};
		};

		init: {
			storeData: {
				errorMessage: string;
				isLoading: boolean;
				success: boolean;
			};
		};
	};
}

interface IInitStoreDataPending {
	type: typeof UserContextConstants.INIT_STORE_DATA_PENDING;
}
interface IInitStoreDataSuccess {
	type: typeof UserContextConstants.INIT_STORE_DATA_SUCCESS;
	payload: {
		data: {
			user: IUserAuthenticatedData;
			token: IUserContextState['data'];
		}['token'];
	};
}
interface IInitStoreDataFail {
	type: typeof UserContextConstants.INIT_STORE_DATA_FAIL;
	payload: { errorMessage: string };
}

interface IUserRequestLoginPending {
	type: typeof UserContextConstants.LOGIN_REQUEST_PENDING;
}
interface IUserRequestLoginSuccess {
	type: typeof UserContextConstants.LOGIN_REQUEST_SUCCESS;
	payload: { user: IUserAuthenticatedData; token: string };
}
interface IUserRequestLoginFail {
	type: typeof UserContextConstants.LOGIN_REQUEST_FAIL;
	payload: { errorMessage: string };
}
interface IUserRequestLoginReset {
	type: typeof UserContextConstants.LOGIN_REQUEST_RESET;
}

interface IUserRequestSignupPending {
	type: typeof UserContextConstants.SIGNUP_REQUEST_PENDING;
}
interface IUserRequestSignupSuccess {
	type: typeof UserContextConstants.SIGNUP_REQUEST_SUCCESS;
	payload: { user: IUserAuthenticatedData; token: string };
}
interface IUserRequestSignupFail {
	type: typeof UserContextConstants.SIGNUP_REQUEST_FAIL;
	payload: { errorMessage: string };
}
interface IUserRequestSignupReset {
	type: typeof UserContextConstants.SIGNUP_REQUEST_RESET;
}

interface IUserRequestLogoutPending {
	type: typeof UserContextConstants.LOGOUT_REQUEST_PENDING;
}
interface IUserRequestLogoutSuccess {
	type: typeof UserContextConstants.LOGOUT_REQUEST_SUCCESS;
}
interface IUserRequestLogoutFail {
	type: typeof UserContextConstants.LOGOUT_REQUEST_FAIL;
	payload: { errorMessage: string };
}
interface IUserRequestLogoutReset {
	type: typeof UserContextConstants.LOGOUT_REQUEST_RESET;
}

export type IUserContextReducerAction =
	| IInitStoreDataPending
	| IInitStoreDataSuccess
	| IInitStoreDataFail
	//
	| IUserRequestLoginPending
	| IUserRequestLoginSuccess
	| IUserRequestLoginFail
	| IUserRequestLoginReset
	//
	| IUserRequestSignupPending
	| IUserRequestSignupSuccess
	| IUserRequestSignupFail
	| IUserRequestSignupReset
	//
	| IUserRequestLogoutPending
	| IUserRequestLogoutSuccess
	| IUserRequestLogoutFail
	| IUserRequestLogoutReset;

export type TUserContextDispatch =
	| Dispatch<IUserContextReducerAction>
	| ((value: IUserContextReducerAction) => void);

// Actions
export type TInitStoreDataAction = (dispatch: TUserContextDispatch) => void;

export type TLoginUserRequestAction = (
	dispatch: TUserContextDispatch,
	{ bodyContent }: { bodyContent: ILoginReqArgsProps['bodyContent'] }
) => Promise<void>;
export type TLoginUserRequestResetAction = (
	dispatch: TUserContextDispatch
) => void;

export type TSignupUserRequestAction = (
	dispatch: TUserContextDispatch,
	{ bodyContent }: { bodyContent: ISignupReqArgsProps['bodyContent'] }
) => Promise<void>;
export type TSignupUserRequestResetAction = (
	dispatch: TUserContextDispatch
) => void;

export type TLogoutUserRequestAction = (
	dispatch: TUserContextDispatch,
	{
		bodyContent,
		token,
	}: {
		bodyContent: ILogoutReqArgsProps['bodyContent'];
		token?: string;
	}
) => Promise<void>;
export type TLogoutUserRequestResetAction = (
	dispatch: TUserContextDispatch
) => void;
