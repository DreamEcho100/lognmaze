import { IGetNewsItemBlogContentReqArgs } from './ts';

export const getNewsItemTypeBlogBlogContentReqArgs = ({
	urlOptions,
}: IGetNewsItemBlogContentReqArgs) => {
	const requestInfo: RequestInfo = `/api/news/${urlOptions.params.news_id}/blog/content`;
	const requestInit: RequestInit = {
		method: 'GET',
	};

	return {
		requestInfo,
		requestInit,
	};
};
