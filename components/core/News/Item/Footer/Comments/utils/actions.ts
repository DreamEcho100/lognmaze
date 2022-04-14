import {
	handleRequestStateChanges,
	returnBearerTokenIfExist,
} from '@commonLibIndependent/fetch';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import networkReqArgs from '@coreLib/networkReqArgs';
import {
	TNewsItemCommentBasicData,
	TNewsItemCommentsMain,
	// TNewsItemCommentMainReplies,
	TNewsItemData,
} from '@coreLib/ts/global';
import ECommentConstants from './constants';
import { TCreateNewsItemMainComment, TAddMainCommentsToNewsItem } from './ts';

interface IGetMoreNewsItemCommentRepliesMainExtraProps {
	news_id: TNewsItemData['news_id'];
	parent_id: TNewsItemCommentBasicData['news_comment_id'];
}

// interface IGetRepliesForMainCommentSuccessData {
// 	hit_replies_limit: boolean;
// 	comments: TNewsItemCommentMainReplies;
// }

export const initGetNewsItemCommentsMain: TAddMainCommentsToNewsItem = async (
	commentDispatch,
	{ newsDispatch, news_id, urlOptions }
) => {
	await handleRequestStateChanges<
		{ comments: TNewsItemCommentsMain; hit_comments_limit: boolean },
		undefined,
		{ news_id: TNewsItemData['news_id'] },
		{ news_id: TNewsItemData['news_id'] }
	>({
		onInit: async () => {
			commentDispatch({
				type: ECommentConstants.INIT_GET_COMMENTS_MAIN_PENDING,
			});

			const { requestInfo, requestInit } =
				networkReqArgs._app.news.item.comments.get({
					urlOptions,
				});

			return await fetch(requestInfo, requestInit);
		},
		onError: (error) => {
			return commentDispatch({
				type: ECommentConstants.INIT_GET_COMMENTS_MAIN_FAIL,
				payload: { error },
			});
		},
		onSuccess: ({ comments, hit_comments_limit }) => {
			commentDispatch({
				type: ECommentConstants.INIT_GET_COMMENTS_MAIN_SUCCESS,
			});
			newsDispatch({
				type: NewsItemContextConstants.ADD_MAIN_COMMENTS,
				payload: {
					news_id,
					commentsMainData: comments,
					hit_comments_limit,
				},
			});
		},
	});
};

export const createNewsItemMainComment: TCreateNewsItemMainComment = async (
	commentDispatch,
	{ newsDispatch, bodyContent, requiredExtraData, token }
) => {
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
				type: ECommentConstants.CREATE_MAIN_COMMENT_PENDING,
			});

			const { requestInfo, requestInit } =
				networkReqArgs._app.news.item.comment.create({
					urlOptions: {
						params: {
							// news_comment_id: requiredData.news_comment_id,
							news_id: bodyContent.news_id,
						},
					},
					bodyContent,
					headersList: {
						Authorization: token && returnBearerTokenIfExist(token),
					},
				});

			return await fetch(requestInfo, requestInit);
		},
		onError: (error) => {
			commentDispatch({
				type: ECommentConstants.CREATE_MAIN_COMMENT_FAIL,
				payload: {
					error,
				},
			});
		},
		onSuccess: ({ news_comment_id }) => {
			commentDispatch({
				type: ECommentConstants.CREATE_MAIN_COMMENT_SUCCESS,
			});
			newsDispatch({
				type: NewsItemContextConstants.ADD_NEW_MAIN_COMMENT,
				payload: {
					// type: 'comment_main',
					news_id: bodyContent.news_id,
					newCommentData: {
						...requiredExtraData,
						...bodyContent,
						news_comment_id,
						replies_counter: 0,
						created_at: new Date().getTime(),
						updated_at: new Date().getTime(),
					},
				},
			});
		},
	});
};
