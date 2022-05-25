import networkReqArgs from '@coreLib/networkReqArgs';
import { INewsItemTypeBlogContent } from '@coreLib/ts/global';
import {
	TInitGetNewsItemTypeBlogContent,
	TDeleteNewsItem,
	TResetDeleteNewsItemAction,
} from '../ts';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';

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
		onSuccess: () => {
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
