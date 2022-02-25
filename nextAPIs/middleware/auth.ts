import { NextApiResponse } from 'next';

import { isAuthorized } from '@coreLib/auth';
import { Middleware } from 'next-connect';
import { NextApiRequestExtended } from '@coreLib/ts/global';

export const isAuthorizedMiddleware: Middleware<
	NextApiRequestExtended,
	NextApiResponse
> = async (req, res, next) => {
	try {
		const user = await isAuthorized(res, req.headers.authorization);

		if (!user) {
			res.status(401);
			next(Error('Not Authorized!'));
		}

		req.user = user;
		next();
	} catch (error) {
		res.status(401);
		next(
			error instanceof Error
				? Error(error.message)
				: Error('Something went wrong!')
		);
	}
};
