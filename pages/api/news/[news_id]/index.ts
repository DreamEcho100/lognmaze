import nextConnect from '@coreLib/nextConnect';
import { NextApiRequestExtended } from '@coreLib/ts/global';
import newsController from '@nextAPIs/controllers/news';
import { isAuthorizedMiddleware } from '@nextAPIs/middleware/auth';

const newsItemAPIRouteHandler = nextConnect();
const auth = nextConnect()
	.put<NextApiRequestExtended>('/api/news/:news_id', isAuthorizedMiddleware)
	.delete<NextApiRequestExtended>('/api/news/:news_id', isAuthorizedMiddleware);

newsItemAPIRouteHandler
	.use(auth)
	.put(newsController.item.update)
	.delete(newsController.item.delete);

export default newsItemAPIRouteHandler;
