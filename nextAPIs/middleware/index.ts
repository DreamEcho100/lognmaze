import { isAuthorizedMiddleware } from './auth';

const middleware = {
	isAuthorized: isAuthorizedMiddleware,
};

export default middleware;
