import { NextApiRequestExtended } from '@coreLib/ts/global';
import nextConnect from '@coreLib/nextConnect';
import authController from '@nextAPIs/controllers/auth';
import { isAuthorizedMiddleware } from '@nextAPIs/middleware/auth';

const authAPIRouteHandler = nextConnect().put<NextApiRequestExtended>(
	'/api/auth',
	isAuthorizedMiddleware
);

authAPIRouteHandler
	.post((req, res) => {
		switch (req.body.auth_type) {
			case 'login':
				return authController.login(req, res);
			case 'signup':
				return authController.signup(req, res);
			default:
				throw new Error('auth_type is undefined!');
		}
	})
	.put(authController.logout);

export default authAPIRouteHandler;
