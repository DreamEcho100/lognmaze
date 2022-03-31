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
	TCreateNewsItemMainOrMainReplyComment,
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

export const createNewsItemMainOrMainReplyComment: TCreateNewsItemMainOrMainReplyComment =
	async (commentDispatch, { newsDispatch, requiredData, token }) => {
		await handleRequestStateChanges<
			{
				news_comment_id: TNewsItemCommentBasicData['news_comment_id'];
			},
			void,
			IGetMoreNewsItemCommentRepliesMainExtraProps,
			IGetMoreNewsItemCommentRepliesMainExtraProps,
			IGetMoreNewsItemCommentRepliesMainExtraProps
		>({
			onInit: async () => {
				commentDispatch({
					type: ECommentConstants.CREATE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING,
				});

				const { requestInfo, requestInit } =
					networkReqArgs._app.news.item.comment.create({
						urlOptions: {
							params: {
								// comment_id: requiredData.news_comment_id,
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
								  }
								: {
										comment_type: 'comment_main',
										content: requiredData.content,
										news_id: requiredData.news_id,
								  }),
						},
						headersList: {
							Authorization: token && returnBearerTokenIfExist(token),
						},
					});

				return await fetch(requestInfo, requestInit);
			},
			onError: (error) => {
				return commentDispatch({
					type: ECommentConstants.CREATE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL,
					payload: {
						error,
						...requiredData,
					},
				});
			},
			onSuccess: ({ news_comment_id }) => {
				commentDispatch({
					type: ECommentConstants.CREATE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS,
				});
				newsDispatch({
					type: NewsItemContextConstants.ADD_NEW_COMMENT_TYPE_MAIN_OR_MAIN_REPLY,
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
		return await handleRequestStateChanges<{
			comments: TNewsItemCommentMainReplies;
			hit_replies_limit: boolean;
		}>({
			onInit: async () => {
				commentDispatch({
					type: ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING,
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
							Authorization: token && returnBearerTokenIfExist(token),
						},
					});

				return await fetch(requestInfo, requestInit);
			},
			onError: (error) => {
				return commentDispatch({
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
						// type: requiredData.type,
						// news_id: requiredData.news_id,
						// news_comment_id: requiredData.news_comment_id,
						// ...(requiredData.type === 'comment_main_reply'
						// 	? {
						// 			type: requiredData.type,
						// 			parent_id: requiredData.parent_id,
						// 	  }
						// 	: {}),
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
			return commentDispatch({
				type: ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_FAIL,
				payload: {
					error,
				},
			});
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
