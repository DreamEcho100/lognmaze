import networkReqArgs from '@coreLib/networkReqArgs';
import {
	TNewsItemCommentBasicData,
	TNewsItemCommentMainReplies,
	TNewsItemCommentsMain,
	TNewsItemData,
} from '@coreLib/ts/global';
import {
	TGetMoreNewsItemCommentRepliesMain,
	TGetMoreNewsItemCommentsMain,
	TInitGetNewsItemCommentsMain,
} from '../ts';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';

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
}: {
	onInit: (extraData: TInitExtraData) => Promise<Response>;
	onError: (error: string, extraData: TErrorExtraData) => void; // TDispatcher;
	onSuccess: (data: TData, extraData: TSuccessExtraData) => void; // TDispatcher;
	extraData?: {
		init?: TInitExtraData;
		error?: TErrorExtraData;
		success?: TSuccessExtraData;
	};
}) => {
	const response = await onInit(extraData?.init || ({} as TInitExtraData));

	if (!response.ok)
		return onError(
			await response.text(),
			extraData?.error || ({} as TErrorExtraData)
		);

	onSuccess(
		await response.json(),
		extraData?.success || ({} as TSuccessExtraData)
	);
};

export const initGetNewsItemCommentsMain: TInitGetNewsItemCommentsMain = async (
	newsDispatch,
	{ news_id, urlOptions }
) => {
	await handleLoadingChanges<
		{ comments: TNewsItemCommentsMain; hit_comments_limit: boolean },
		undefined,
		{ news_id: TNewsItemData['news_id'] },
		{ news_id: TNewsItemData['news_id'] }
	>({
		onInit: async () => {
			newsDispatch({
				type: NewsItemContextConstants.INIT_GET_COMMENTS_PENDING,
				payload: { news_id },
			});

			const { requestInfo, requestInit } =
				networkReqArgs._app.news.item.comments.get({
					urlOptions,
				});

			return await fetch(requestInfo, requestInit);
		},
		onError: (error, errorExtraData) => {
			return newsDispatch({
				type: NewsItemContextConstants.INIT_GET_COMMENTS_FAIL,
				payload: { error, news_id: errorExtraData.news_id },
			});
		},
		onSuccess: ({ comments, hit_comments_limit }, errorExtraData) => {
			newsDispatch({
				type: NewsItemContextConstants.INIT_GET_COMMENTS_SUCCESS,
				payload: {
					news_id: errorExtraData.news_id,
					commentsMainData: comments,
					hit_comments_limit,
				},
			});
		},
		extraData: {
			error: { news_id },
			success: { news_id },
		},
	});
};

type IGetMoreNewsItemCommentsMainExtraProps = {
	news_id: TNewsItemData['news_id'];
};
export const getMoreNewsItemCommentsMain: TGetMoreNewsItemCommentsMain = async (
	newsDispatch,
	{ news_id, urlOptions }
) => {
	await handleLoadingChanges<
		{ comments: TNewsItemCommentsMain; hit_comments_limit: boolean },
		undefined,
		IGetMoreNewsItemCommentsMainExtraProps,
		IGetMoreNewsItemCommentsMainExtraProps
	>({
		onInit: async () => {
			newsDispatch({
				type: NewsItemContextConstants.GET_MORE_MAIN_COMMENTS_PENDING,
				payload: { news_id },
			});

			const { requestInfo, requestInit } =
				networkReqArgs._app.news.item.comments.get({
					urlOptions,
				});

			return await fetch(requestInfo, requestInit);
		},
		onError: (error, errorExtraData) => {
			return newsDispatch({
				type: NewsItemContextConstants.GET_MORE_MAIN_COMMENTS_FAIL,
				payload: { error, news_id: errorExtraData.news_id },
			});
		},
		onSuccess: ({ comments, hit_comments_limit }, errorExtraData) => {
			newsDispatch({
				type: NewsItemContextConstants.GET_MORE_MAIN_COMMENTS_SUCCESS,
				payload: {
					news_id: errorExtraData.news_id,
					newCommentsMainData: comments,
					hit_comments_limit,
				},
			});
		},
		extraData: {
			error: { news_id },
			success: { news_id },
		},
	});
};

type IGetMoreNewsItemCommentRepliesMainExtraProps = {
	news_id: TNewsItemData['news_id'];
	newsCommentParentId: TNewsItemCommentBasicData['news_comment_id'];
};
export const getMoreNewsItemCommentRepliesMain: TGetMoreNewsItemCommentRepliesMain =
	async (newsDispatch, { news_id, newsCommentParentId, urlOptions }) => {
		await handleLoadingChanges<
			{
				comments: TNewsItemCommentMainReplies;
				hit_replies_limit: boolean;
			},
			IGetMoreNewsItemCommentRepliesMainExtraProps,
			IGetMoreNewsItemCommentRepliesMainExtraProps,
			IGetMoreNewsItemCommentRepliesMainExtraProps
		>({
			onInit: async () => {
				newsDispatch({
					type: NewsItemContextConstants.GET_MORE_MAIN_COMMENT_REPLIES_PENDING,
					payload: { news_id, newsCommentParentId },
				});

				const { requestInfo, requestInit } =
					networkReqArgs._app.news.item.comments.get({
						urlOptions,
					});

				return await fetch(requestInfo, requestInit);
			},
			onError: (error, errorExtraData) => {
				return newsDispatch({
					type: NewsItemContextConstants.GET_MORE_MAIN_COMMENT_REPLIES_FAIL,
					payload: {
						error,
						news_id: errorExtraData.news_id,
						newsCommentParentId,
					},
				});
			},
			onSuccess: ({ hit_replies_limit, comments }, errorExtraData) => {
				newsDispatch({
					type: NewsItemContextConstants.GET_MORE_MAIN_COMMENT_REPLIES_SUCCESS,
					payload: {
						news_id: errorExtraData.news_id,
						newsCommentParentId,
						hit_replies_limit,
						newCommentMainRepliesData: comments,
						// newCommentsMainData: comments,
						// hit_comments_limit,
					},
				});
			},
			extraData: {
				error: { news_id, newsCommentParentId },
				success: { news_id, newsCommentParentId },
				init: { news_id, newsCommentParentId },
			},
		});
	};
