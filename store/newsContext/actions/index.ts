import networkReqArgs from '@coreLib/networkReqArgs';
import { INewsItemTypeBlogContent, TNewsData } from '@coreLib/ts/global';
import {
	TGetMoreNewsItems,
	TInitGetNewsItemTypeBlogContent,
	// TNewsContextReducerAction,
} from '../ts';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import NewsContextConstants from '@coreLib/constants/store/types/NewsContext';

export const initGetNewsItemTypeBlogContent: TInitGetNewsItemTypeBlogContent =
	async (newsDispatch, { news_id, urlOptions }) => {
		newsDispatch({
			type: NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_PENDING,
			payload: { news_id },
		});

		const { requestInfo, requestInit } =
			networkReqArgs._app.news.item.type.blog.getContent({
				urlOptions,
			});

		const response = await fetch(requestInfo, requestInit);

		if (!response.ok)
			return newsDispatch({
				type: NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_FAIL,
				payload: { news_id, error: await response.text() },
			});

		const {
			content: newsItemTypeBlogContent,
		}: { content: INewsItemTypeBlogContent } = await response.json();

		newsDispatch({
			type: NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_SUCCESS,
			payload: { news_id, newsItemTypeBlogContent },
		});
	};

// type TDispatcher = (value: TNewsContextReducerAction) => void;

const handleLoadingChanges = async <T>({
	onInit,
	onError,
	onSuccess,
}: {
	onInit: () => Promise<Response>;
	onError: (error: string) => void; // TDispatcher;
	onSuccess: (data: T) => void; // TDispatcher;
}) => {
	const response = await onInit();

	if (!response.ok) return onError(await response.text());

	onSuccess(await response.json());
};

export const getMoreNewsItemsAction: TGetMoreNewsItems = async (
	newsDispatch,
	{ urlOptions }
) => {
	await handleLoadingChanges<{
		news: TNewsData;
		hit_news_items_limit: boolean;
	}>({
		onInit: async () => {
			newsDispatch({
				type: NewsContextConstants.GET_MORE_ITEMS_PENDING,
			});

			const { requestInfo, requestInit } = networkReqArgs._app.news.get({
				urlOptions,
			});

			return await fetch(requestInfo, requestInit);
		},
		onError: (error) => {
			return newsDispatch({
				type: NewsContextConstants.GET_MORE_ITEMS_FAIL,
				payload: { error },
			});
		},
		onSuccess: ({ news, hit_news_items_limit }) => {
			newsDispatch({
				type: NewsContextConstants.GET_MORE_ITEMS_SUCCESS,
				payload: { newNewsItems: news, hit_news_items_limit },
			});
		},
	});
};
