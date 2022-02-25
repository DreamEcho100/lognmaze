import nextConnect from '@coreLib/nextConnect';
import { NextApiRequestExtended } from '@coreLib/ts/global';
import newsController from '@nextAPIs/controllers/news';
import { isAuthorizedMiddleware } from '@nextAPIs/middleware/auth';

const newsAPIRouteHandler = nextConnect();
const auth = nextConnect().post<NextApiRequestExtended>(
	'/api/news',
	isAuthorizedMiddleware
);

newsAPIRouteHandler
	.use(auth)
	.get(newsController.get)
	.post(newsController.item.create);

export default newsAPIRouteHandler;
