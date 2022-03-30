import { headersDefault } from '@coreLib/networkReqArgs/__utils';
import networkReqNewsItemTypeBlogArgs from './blog';
// import { getNewsItemTypeBlogBlogContentReqArgs } from './blog/content';
import networkReqNewsItemCommentsArgs from './comments';
import { IDeleteNewsItemReqArgs, IUpdateNewsItemReqArgs } from './ts';

export const updateNewsItemReqArgs = ({
	bodyContent,
	urlOptions,
	headersList,
}: IUpdateNewsItemReqArgs) => {
	const requestInfo: RequestInfo = `/api/news/${urlOptions.params.news_id}`;
	const requestInit: RequestInit = {
		method: 'PUT',
		headers: {
			...headersDefault,
			...headersList,
		},
		body: JSON.stringify(bodyContent),
	};

	return {
		requestInfo,
		requestInit,
	};
};

export const deleteNewsItemReqArgs = ({
	urlOptions,
	headersList,
	bodyContent,
}: IDeleteNewsItemReqArgs) => {
	const requestInfo: RequestInfo = `/api/news/${urlOptions.params.news_id}`;
	const requestInit: RequestInit = {
		method: 'DELETE',
		headers: {
			...headersDefault,
			...headersList,
		},
		body: JSON.stringify(bodyContent),
	};

	return {
		requestInfo,
		requestInit,
	};
};

const networkReqNewsItemArgs = {
	update: updateNewsItemReqArgs,
	delete: deleteNewsItemReqArgs,
	type: {
		blog: networkReqNewsItemTypeBlogArgs,
	},
	...networkReqNewsItemCommentsArgs,
};

export default networkReqNewsItemArgs;
