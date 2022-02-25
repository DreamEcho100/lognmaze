// import { NextApiRequest } from 'next';

import nextConnect from '@coreLib/nextConnect';
import newsController from '@nextAPIs/controllers/news';

const itemBlogContentAPIRouteHandler = nextConnect().get(
	newsController.item.type.blog.getContent
);

export default itemBlogContentAPIRouteHandler;
