import {
	handleRequestStateChanges,
	returnBearerTokenIfExist,
} from '@commonLibIndependent/fetch';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import networkReqArgs from '@coreLib/networkReqArgs';
import {
	TNewsItemCommentBasicData,
	TNewsItemCommentMainReplies,
	TNewsItemData,
} from '@coreLib/ts/global';
import ECommentConstants from './constants';
import {
	TCreateNewsItemReplyForMainComment,
	TDeleteNewsItemMainOrMainReplyComment,
	TGetRepliesForMainComment,
	TUpdateNewsItemMainOrMainReplyComment,
} from './ts';

interface IGetMoreNewsItemCommentRepliesMainExtraProps {
	news_id: TNewsItemData['news_id'];
	parent_id: TNewsItemCommentBasicData['news_comment_id'];
}

interface IGetRepliesForMainCommentSuccessData {
	hit_replies_limit: boolean;
	comments: TNewsItemCommentMainReplies;
}

export const createNewsItemReplyForMainComment: TCreateNewsItemReplyForMainComment =
	async (commentDispatch, { newsDispatch, requiredData, token }) => {
		return await handleRequestStateChanges<
			{
				news_comment_id: TNewsItemCommentBasicData['news_comment_id'];
			},
			boolean,
			IGetMoreNewsItemCommentRepliesMainExtraProps,
			IGetMoreNewsItemCommentRepliesMainExtraProps,
			IGetMoreNewsItemCommentRepliesMainExtraProps
		>({
			onInit: async () => {
				commentDispatch({
					type: ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT_PENDING,
				});

				const { requestInfo, requestInit } =
					networkReqArgs._app.news.item.comment.create({
						urlOptions: {
							params: {
								// news_comment_id: requiredData.news_comment_id,
								news_id: requiredData.news_id,
							},
						},
						bodyContent: {
							...(requiredData.type === 'comment_main_reply'
								? {
										comment_type: requiredData.type,
										parent_id: requiredData.parent_id,
										reply_to_user_id: requiredData.reply_to_user_id,
										reply_to_comment_id: requiredData.reply_to_comment_id,
										content: requiredData.content,
										news_id: requiredData.news_id,
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  }
								: {
										comment_type: 'comment_main',
										content: requiredData.content,
										news_id: requiredData.news_id,
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  }),
						},
						headersList: {
							Authorization: token && returnBearerTokenIfExist(token),
						},
					});

				return await fetch(requestInfo, requestInit);
			},
			onError: (error) => {
				commentDispatch({
					type: ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT_FAIL,
					payload: {
						error,
						...requiredData,
					},
				});
			},
			onSuccess: ({ news_comment_id }) => {
				commentDispatch({
					type: ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT_SUCCESS,
				});
				newsDispatch({
					type: NewsItemContextConstants.ADD_NEW_MAIN_COMMENT,
					payload: {
						news_comment_id,
						...requiredData,
					},
				});
			},
		});
	};

export const updateNewsItemMainOrMainReplyComment: TUpdateNewsItemMainOrMainReplyComment =
	async (commentDispatch, { newsDispatch, requiredData, token }) => {
		return await handleRequestStateChanges<
			{
				comments: TNewsItemCommentMainReplies;
				hit_replies_limit: boolean;
			},
			true
		>({
			onInit: async () => {
				commentDispatch({
					type: ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING,
				});

				const { requestInfo, requestInit } =
					networkReqArgs._app.news.item.comment.update({
						urlOptions: {
							params: {
								news_comment_id: requiredData.news_comment_id,
								news_id: requiredData.news_id,
							},
						},
						bodyContent: {
							content: requiredData.newContent,
						},
						headersList: {
							Authorization: token && returnBearerTokenIfExist(token),
						},
					});

				return await fetch(requestInfo, requestInit);
			},
			onError: (error) => {
				commentDispatch({
					type: ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL,
					payload: {
						error,
						...requiredData,
					},
				});
			},
			onSuccess: () => {
				commentDispatch({
					type: ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS,
				});
				newsDispatch({
					type: NewsItemContextConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT,
					payload: {
						...requiredData,
						newContent: requiredData.newContent,
					},
				});
			},
		});
	};

export const getRepliesForMainComment: TGetRepliesForMainComment = async (
	commentDispatch,
	{ newsDispatch, urlOptions, news_id, parent_id }
) => {
	return await handleRequestStateChanges<IGetRepliesForMainCommentSuccessData>({
		onInit: async () => {
			commentDispatch({
				type: ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_PENDING,
			});

			const { requestInfo, requestInit } =
				networkReqArgs._app.news.item.comments.get({
					urlOptions,
				});

			return await fetch(requestInfo, requestInit);
		},
		onError: (error) => {
			commentDispatch({
				type: ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_FAIL,
				payload: {
					error,
				},
			});
			return false;
		},
		onSuccess: ({ comments, hit_replies_limit }) => {
			commentDispatch({
				type: ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_SUCCESS,
			});

			newsDispatch({
				type: NewsItemContextConstants.ADD_REPLIES_TO_COMMENT_MAIN,
				payload: {
					newCommentMainRepliesData: comments,
					hit_replies_limit,
					news_id,
					parent_id,
				},
			});
		},
	});
};

export const deleteNewsItemMainOrMainReplyComment: TDeleteNewsItemMainOrMainReplyComment =
	async (commentDispatch, { newsDispatch, requiredData, token }) => {
		return await handleRequestStateChanges<
			{
				comments: TNewsItemCommentMainReplies;
				hit_replies_limit: boolean;
			},
			true
		>({
			onInit: async () => {
				commentDispatch({
					type: ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING,
				});

				const { requestInfo, requestInit } =
					networkReqArgs._app.news.item.comment.delete({
						urlOptions: {
							params: {
								news_comment_id: requiredData.news_comment_id,
								news_id: requiredData.news_id,
							},
						},
						bodyContent:
							requiredData.type === 'comment_main_reply'
								? {
										type: requiredData.type,
										parent_id: requiredData.parent_id,
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  }
								: {
										type: requiredData.type,
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  },
						headersList: {
							Authorization: token && returnBearerTokenIfExist(token),
						},
					});

				return await fetch(requestInfo, requestInit);
			},
			onError: (error) => {
				commentDispatch({
					type: ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL,
					payload: {
						error,
						...requiredData,
					},
				});
			},
			onSuccess: () => {
				commentDispatch({
					type: ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS,
				});
				newsDispatch({
					type: NewsItemContextConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT,
					payload: {
						...requiredData,
					},
				});
			},
		});
	};
