import { headersDefault } from '@coreLib/networkReqArgs/__utils';
import { ISignInReqArgsProps, ISignUpReqArgsProps } from './ts';

export const signInReqArgs = ({ bodyContent }: ISignInReqArgsProps) => {
	const requestInfo: RequestInfo = `/api/auth/signin`;
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

export const signUpReqArgs = ({ bodyContent }: ISignUpReqArgsProps) => {
	const requestInfo: RequestInfo = `/api/auth/signup`;
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

const networkReqAuthArgs = {
	signIn: signInReqArgs,
	signUp: signUpReqArgs,
};

export default networkReqAuthArgs;
