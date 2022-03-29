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
	TUpdateNewsItemMainOrMainReplyComment,
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
	const response = await onInit(extraData?.init || ({} as TInitExtraData));

	if (!response.ok)
		return onError(
			await response.text(),
			extraData?.error || ({} as TErrorExtraData)
		);

	onSuccess(
		responseSuccessType === 'json'
			? await response.json()
			: await response.text(),
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
	parent_id: TNewsItemCommentBasicData['news_comment_id'];
};
export const getMoreNewsItemCommentRepliesMain: TGetMoreNewsItemCommentRepliesMain =
	async (newsDispatch, { news_id, parent_id, urlOptions }) => {
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
					payload: { news_id, parent_id },
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
						parent_id,
					},
				});
			},
			onSuccess: ({ hit_replies_limit, comments }, errorExtraData) => {
				newsDispatch({
					type: NewsItemContextConstants.GET_MORE_MAIN_COMMENT_REPLIES_SUCCESS,
					payload: {
						news_id: errorExtraData.news_id,
						parent_id,
						hit_replies_limit,
						newCommentMainRepliesData: comments,
						// newCommentsMainData: comments,
						// hit_comments_limit,
					},
				});
			},
			extraData: {
				error: { news_id, parent_id },
				success: { news_id, parent_id },
				init: { news_id, parent_id },
			},
		});
	};

export const updateNewsItemMainOrMainReplyComment: TUpdateNewsItemMainOrMainReplyComment =
	async (newsDispatch, { requiredData, token }) => {
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
					type: NewsItemContextConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING,
					payload: requiredData,
				});

				const { requestInfo, requestInit } =
					networkReqArgs._app.news.item.comment.update({
						urlOptions: {
							params: {
								comment_id: requiredData.news_comment_id,
								news_id: requiredData.news_id,
							},
						},
						bodyContent: {
							content: requiredData.newContent,
						},
						headersList: {
							Authorization: token && returnBearerToken(token),
						},
					});

				return await fetch(requestInfo, requestInit);
			},
			onError: (error) => {
				return newsDispatch({
					type: NewsItemContextConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL,
					payload: {
						error,
						...requiredData,
					},
				});
			},
			onSuccess: () => {
				newsDispatch({
					type: NewsItemContextConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS,
					payload: {
						...requiredData,
						newContent: requiredData.newContent,
					},
				});
			},
		});
	};
