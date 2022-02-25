import { handleFetch } from '@commonLib/networkReq';
import { signInReqArgs } from '@coreLib/_app/networkReqArgs';
import { ISignInReqArgsProps } from '@coreLib/_app/networkReqArgs/ts';

interface IHandleSignIn {
	reqBody: ISignInReqArgsProps['bodyContent'];
	onError: (response: Response) => void;
	onSuccess: (response: Response) => void;
}

const handleSignIn = async ({ reqBody, onSuccess, onError }: IHandleSignIn) =>
	handleFetch({
		handleFetchArgs: signInReqArgs,
		handleFetchArgsProps: {
			bodyContent: reqBody,
		},
		onError,
		onSuccess,
	});

const networkReq = {
	signIn: handleSignIn,
};

export default networkReq;
