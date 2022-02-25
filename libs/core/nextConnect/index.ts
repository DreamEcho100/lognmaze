import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import nc from 'next-connect';

type TReq = NextApiRequest; // & IncomingMessage;
type TRes = NextApiResponse; // & ServerResponse;
type TNext = NextApiHandler; // & ServerResponse;

const onError = (err: Error, req: TReq, res: TRes, next: TNext) => {
	if (res.statusCode < 400) res.status(500);

	const returnObject: {
		message: Error['message'];
		name?: Error['name'];
		stack?: Error['stack'];
		status: 'error';
		statusCode?: number;
	} = {
		message: err.message,
		status: 'error',
	};

	if (process.env.NODE_ENV === 'development') {
		returnObject.stack = err.stack;
		returnObject.name = err.name;
		returnObject.statusCode = res.statusCode;

		console.error(`Status code: ${returnObject.statusCode}`);
		console.error(`Name: ${returnObject.name}`);
		console.error(`Message: ${returnObject.message}`);
		console.error(`Status: ${returnObject.status}`);
		console.error(`Stack: ${returnObject.stack}`);
	}

	res.json(returnObject);
};

const onNoMatch = (req: TReq, res: TRes) => {
	res.status(404).end('Page is not found!');
};

interface INextConnectOptions {
	attachParams?: boolean;
	onError?: typeof onError;
	onNoMatch?: typeof onNoMatch;
}

const nextConnect = (
	options: INextConnectOptions = {
		onError,
		onNoMatch,
	}
) => nc<TReq, NextApiResponse>(options);

export default nextConnect;
