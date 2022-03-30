// import { NextApiRequest } from 'next';

import nextConnect from '@coreLib/nextConnect';
import { NextApiRequestExtended } from '@coreLib/ts/global';
import newsController from '@nextAPIs/controllers/news';
import { isAuthorizedMiddleware } from '@nextAPIs/middleware/auth';

const newsAPIRouteHandler = nextConnect();
const auth = nextConnect()
	.put<NextApiRequestExtended>(
		'/api/news/:news_id/comments/:comment_id',
		isAuthorizedMiddleware
	)
	.delete<NextApiRequestExtended>(
		'/api/news/:news_id/comments/:comment_id',
		isAuthorizedMiddleware
	);

newsAPIRouteHandler
	.use(auth)
	.put(newsController.item.comment.update)
	.delete(newsController.item.comment.delete);

export default newsAPIRouteHandler;
