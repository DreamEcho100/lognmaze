export enum UserContextConstants {
	INIT_STORE_DATA = 'INIT_STORE_DATA',
	INIT_STORE_DATA_PENDING = 'INIT_STORE_DATA_PENDING',
	INIT_STORE_DATA_SUCCESS = 'INIT_STORE_DATA_SUCCESS',
	INIT_STORE_DATA_FAIL = 'INIT_STORE_DATA_FAIL',

	LOGIN_REQUEST_PENDING = 'USER_LOGIN_REQUEST_PENDING',
	LOGIN_REQUEST_SUCCESS = 'USER_LOGIN_REQUEST_SUCCESS',
	LOGIN_REQUEST_FAIL = 'USER_LOGIN_REQUEST_FAIL',
	LOGIN_REQUEST_RESET = 'USER_LOGIN_REQUEST_RESET',

	SIGNUP_REQUEST_PENDING = 'USER_SIGNUP_REQUEST_PENDING',
	SIGNUP_REQUEST_SUCCESS = 'USER_SIGNUP_REQUEST_SUCCESS',
	SIGNUP_REQUEST_FAIL = 'USER_SIGNUP_REQUEST_FAIL',
	SIGNUP_REQUEST_RESET = 'USER_SIGNUP_REQUEST_RESET',

	LOGOUT_REQUEST_PENDING = 'USER_LOGOUT_REQUEST_PENDING',
	LOGOUT_REQUEST_SUCCESS = 'USER_LOGOUT_REQUEST_SUCCESS',
	LOGOUT_REQUEST_FAIL = 'USER_LOGOUT_REQUEST_FAIL',
	LOGOUT_REQUEST_RESET = 'USER_LOGOUT_REQUEST_RESET',

	UPDATE_DATA_REQUEST_PENDING = 'UPDATE_USER_DATA_REQUEST_PENDING',
	UPDATE_DATA_REQUEST_SUCCESS = 'UPDATE_USER_DATA_REQUEST_SUCCESS',
	UPDATE_DATA_REQUEST_FAIL = 'UPDATE_USER_DATA_REQUEST_FAIL',
	UPDATE_DATA_REQUEST_RESET = 'UPDATE_USER_DATA_REQUEST_RESET',
}

export default UserContextConstants;
