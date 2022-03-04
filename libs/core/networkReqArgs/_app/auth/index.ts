import { headersDefault } from '@coreLib/networkReqArgs/__utils';
import {
	ILoginReqArgsProps,
	ILogoutReqArgsProps,
	ISignupReqArgsProps,
} from './ts';

export const loginReqArgs = ({ bodyContent }: ILoginReqArgsProps) => {
	const requestInfo: RequestInfo = `/api/auth`;
	const requestInit: RequestInit = {
		method: 'POST',
		headers: headersDefault,
		body: JSON.stringify(bodyContent),
	};

	return {
		requestInfo,
		requestInit,
	};
};

export const signupReqArgs = ({ bodyContent }: ISignupReqArgsProps) => {
	const requestInfo: RequestInfo = `/api/auth`;
	const requestInit: RequestInit = {
		method: 'POST',
		headers: headersDefault,
		body: JSON.stringify(bodyContent),
	};

	return {
		requestInfo,
		requestInit,
	};
};

export const logoutReqArgs = ({
	bodyContent,
	headersList,
}: ILogoutReqArgsProps) => {
	const requestInfo: RequestInfo = `/api/auth`;
	const requestInit: RequestInit = {
		method: 'PUT',
		headers: {
			...headersDefault,
			...headersList,
		},
		body: JSON.stringify(bodyContent),
	};

	return {
		requestInfo,
		requestInit,
	};
};

const networkReqAuthArgs = {
	login: loginReqArgs,
	logout: logoutReqArgs,
	signup: signupReqArgs,
};

export default networkReqAuthArgs;
