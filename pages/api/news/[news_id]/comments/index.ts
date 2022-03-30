import nextConnect from '@coreLib/nextConnect';
import { NextApiRequestExtended } from '@coreLib/ts/global';
import newsController from '@nextAPIs/controllers/news';
// import commentsController from '@nextAPIs/controllers/news/[news_id]/comments';
import { isAuthorizedMiddleware } from '@nextAPIs/middleware/auth';

const commentsAPIRouteHandler = nextConnect();
const auth = nextConnect().post<NextApiRequestExtended>(
	'/api/news/:news_id/comments',
	isAuthorizedMiddleware
);

commentsAPIRouteHandler
	.use(auth)
	.get(newsController.item.comments.get)
	.post(newsController.item.comment.create);

export default commentsAPIRouteHandler;
