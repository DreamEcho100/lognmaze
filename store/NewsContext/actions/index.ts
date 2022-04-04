import networkReqArgs from '@coreLib/networkReqArgs';
import {
	INewsItemTypeBlogContent,
	TNewsData,
	TNewsItemData,
} from '@coreLib/ts/global';
import {
	TGetMoreNewsItems,
	TInitGetNewsItemTypeBlogContent,
	TCreateNewsItem,
	TUpdateNewsItem,
	TDeleteNewsItem,
	TResetUpdateNewsItemAction,
	TResetCreateNewsItemAction,
	TResetDeleteNewsItemAction,
} from '../ts';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import NewsContextConstants from '@coreLib/constants/store/types/NewsContext';

const returnBearerToken = (token: string) => `Bearer ${token}`;

const handleLoadingChanges = async <
	TData,
	TInitExtraData = undefined,
	TErrorExtraData = undefined,
	TSuccessExtraData = undefined
>({
	onInit,
	onError,
	onSuccess,
	extraData,
	responseSuccessType = 'json',
}: {
	onInit: (extraData: TInitExtraData) => Promise<Response>;
	onError: (error: string, extraData: TErrorExtraData) => void; // TDispatcher;
	onSuccess: (data: TData, extraData: TSuccessExtraData) => void; // TDispatcher;
	extraData?: {
		init?: TInitExtraData;
		error?: TErrorExtraData;
		success?: TSuccessExtraData;
	};
	responseSuccessType?: 'json' | 'text';
}) => {
	const response = await onInit(
		extraData?.init || ({} as unknown as TInitExtraData)
	);

	if (!response.ok)
		return onError(
			await response.text(),
			extraData?.error || ({} as unknown as TErrorExtraData)
		);

	onSuccess(
		responseSuccessType === 'json'
			? await response.json()
			: await response.text(),
		extraData?.success || ({} as unknown as TSuccessExtraData)
	);
};

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

export const getMoreNewsItems: TGetMoreNewsItems = async (
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

export const createNewsItem: TCreateNewsItem = async (
	newsDispatch,
	{ newsItemBasicData, newNewsItemAuthorData, token }
) => {
	await handleLoadingChanges<{
		news_id: TNewsItemData['news_id'];
	}>({
		onInit: async () => {
			newsDispatch({
				type: NewsItemContextConstants.CREATE_PENDING,
			});

			const { requestInfo, requestInit } = networkReqArgs._app.news.item.create(
				{
					bodyContent: {
						newsItemBasicData: newsItemBasicData,
					},
					headersList: {
						Authorization: (token && returnBearerToken(token)) || undefined,
					},
				}
			);

			return await fetch(requestInfo, requestInit);
		},
		onError: (error) => {
			return newsDispatch({
				type: NewsItemContextConstants.CREATE_FAIL,
				payload: { error },
			});
		},
		onSuccess: ({ news_id }) => {
			newsDispatch({
				type: NewsItemContextConstants.CREATE_SUCCESS,
				payload: {
					newNewsItemId: news_id,
					newNewsItemAuthorData,
					newsItemBasicData,
				},
			});
		},
	});
};
export const resetCreateNewsItemAction: TResetCreateNewsItemAction = (
	newsDispatch
) => {
	newsDispatch({
		type: NewsItemContextConstants.CREATE_RESET,
	});
};

export const updateNewsItem: TUpdateNewsItem = async (
	newsDispatch,
	{ bodyContent, news_id, token }
) => {
	await handleLoadingChanges({
		onInit: async () => {
			newsDispatch({
				type: NewsItemContextConstants.UPDATE_PENDING,
				payload: {
					news_id,
				},
			});

			const { requestInfo, requestInit } = networkReqArgs._app.news.item.update(
				{
					bodyContent,
					urlOptions: {
						params: {
							news_id,
						},
					},
					headersList: {
						Authorization: (token && returnBearerToken(token)) || undefined,
					},
				}
			);

			return await fetch(requestInfo, requestInit);
		},
		onError: (error) => {
			return newsDispatch({
				type: NewsItemContextConstants.UPDATE_FAIL,
				payload: {
					news_id,
					error,
				},
			});
		},
		onSuccess: () => {
			newsDispatch({
				type: NewsItemContextConstants.UPDATE_SUCCESS,
				payload: {
					news_id,
					dataToUpdate: bodyContent.dataToUpdate,
				},
			});
		},
	});
};
export const resetUpdateNewsItemAction: TResetUpdateNewsItemAction = (
	newsDispatch,
	{ news_id }
) => {
	newsDispatch({
		type: NewsItemContextConstants.UPDATE_RESET,
		payload: {
			news_id,
		},
	});
};

export const deleteNewsItem: TDeleteNewsItem = async (
	newsDispatch,
	{ bodyContent, news_id, token }
) => {
	await handleLoadingChanges<string>({
		onInit: async () => {
			newsDispatch({
				type: NewsItemContextConstants.DELETE_PENDING,
				payload: {
					news_id,
				},
			});

			const { requestInfo, requestInit } = networkReqArgs._app.news.item.delete(
				{
					bodyContent,
					urlOptions: {
						params: {
							news_id,
						},
					},
					headersList: {
						Authorization: (token && returnBearerToken(token)) || undefined,
					},
				}
			);

			return await fetch(requestInfo, requestInit);
		},
		onError: (error) => {
			return newsDispatch({
				type: NewsItemContextConstants.DELETE_FAIL,
				payload: {
					news_id: news_id,
					error,
				},
			});
		},
		onSuccess: (data) => {
			newsDispatch({
				type: NewsItemContextConstants.DELETE_SUCCESS,
				payload: {
					news_id,
				},
			});
		},
		responseSuccessType: 'text',
	});
};
export const resetDeleteNewsItemAction: TResetDeleteNewsItemAction = (
	newsDispatch,
	{ news_id }
) => {
	newsDispatch({
		type: NewsItemContextConstants.DELETE_RESET,
		payload: {
			news_id: news_id,
		},
	});
};
