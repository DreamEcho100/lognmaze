import { encodeObjectToUrlQueries } from '@commonLibIndependent/object';
import { headersDefault } from '@coreLib/networkReqArgs/__utils';
import {
	ICreateNewsItemCommentReqArgs,
	IGetNewsItemCommentsReqArgs,
} from './ts';
import networkReqNewsItemCommentArgs from './[comment_id]';

export const getNewsItemCommentsReqArgs = ({
	urlOptions,
}: IGetNewsItemCommentsReqArgs) => {
	const requestInfo: RequestInfo = `/api/news/${
		urlOptions.params.news_id
	}/comments${
		urlOptions?.queries
			? '/?' + encodeObjectToUrlQueries(urlOptions.queries)
			: ''
	}`;
	const requestInit: RequestInit = {
		method: 'GET',
	};

	return {
		requestInfo,
		requestInit,
	};
};

export const createNewsItemCommentReqArgs = ({
	urlOptions,
	bodyContent,
	headersList,
}: ICreateNewsItemCommentReqArgs) => {
	const requestInfo: RequestInfo = `/api/news/${urlOptions.params.news_id}/comments`;
	const requestInit: RequestInit = {
		method: 'POST',
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

const networkReqNewsItemCommentsArgs = {
	comments: {
		get: getNewsItemCommentsReqArgs,
	},
	comment: {
		create: createNewsItemCommentReqArgs,
		...networkReqNewsItemCommentArgs,
	},
};

export default networkReqNewsItemCommentsArgs;
