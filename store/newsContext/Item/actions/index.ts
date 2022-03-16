import networkReqArgs from '@coreLib/networkReqArgs';
import { INewsItemTypeBlogContent } from '@coreLib/ts/global';
import { TInitGetNewsItemTypeBlogContent } from '../ts';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';

export const initGetNewsItemTypeBlogContent: TInitGetNewsItemTypeBlogContent =
	async (newsItemDispatch, { urlOptions }) => {
		newsItemDispatch({
			type: NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_PENDING,
		});

		const { requestInfo, requestInit } =
			networkReqArgs._app.news.item.type.blog.getContent({
				urlOptions,
			});

		const response = await fetch(requestInfo, requestInit);

		if (!response.ok)
			return newsItemDispatch({
				type: NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_FAIL,
				payload: { error: await response.text() },
			});

		const {
			content: newsItemTypeBlogContent,
		}: { content: INewsItemTypeBlogContent } = await response.json();

		newsItemDispatch({
			type: NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_SUCCESS,
			payload: { newsItemTypeBlogContent },
		});
	};
