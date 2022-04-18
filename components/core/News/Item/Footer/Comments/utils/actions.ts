import {
	handleRequestStateChanges,
	returnBearerTokenIfExist,
} from '@commonLibIndependent/fetch';
import ENewsItemExtraData from '@coreComponents/News/Item/context/constants';
import networkReqArgs from '@coreLib/networkReqArgs';
import {
	TNewsItemCommentBasicData,
	TNewsItemCommentsMain,
	TNewsItemCommentTypeMain,
	TNewsItemData,
} from '@coreLib/ts/global';
import ECommentConstants from './constants';
import { TCreateNewsItemMainComment, TAddMainCommentsToNewsItem } from './ts';

interface IGetMoreNewsItemCommentRepliesMainExtraProps {
	news_id: TNewsItemData['news_id'];
	parent_id: TNewsItemCommentBasicData['news_comment_id'];
}

export const getMoreNewsItemCommentsMain: TAddMainCommentsToNewsItem = async (
	commentDispatch,
	{ newsItemExtraDataDispatch, urlOptions }
) => {
	await handleRequestStateChanges<{
		comments: TNewsItemCommentsMain;
		hit_comments_limit: boolean;
	}>({
		onInit: async () => {
			commentDispatch({
				type: ECommentConstants.GET_COMMENTS_MAIN_PENDING,
			});

			const { requestInfo, requestInit } =
				networkReqArgs._app.news.item.comments.get({
					urlOptions,
				});

			return await fetch(requestInfo, requestInit);
		},
		onError: (error) => {
			return commentDispatch({
				type: ECommentConstants.GET_COMMENTS_MAIN_FAIL,
				payload: { error },
			});
		},
		onSuccess: ({ comments, hit_comments_limit }) => {
			commentDispatch({
				type: ECommentConstants.GET_COMMENTS_MAIN_SUCCESS,
			});
			// console.log('Render?');
			// (async () =>
			// 	await new Promise((resolve) =>
			// 		setTimeout(() => {
			// 			console.log('Render!');
			// 			resolve(null);
			// 		}, 3000)
			// 	))();
			newsItemExtraDataDispatch({
				type: ENewsItemExtraData.ADD_MAIN_COMMENTS,
				payload: {
					commentsMainData: comments,
					hit_comments_limit,
				},
			});
		},
	});
};

export const createNewsItemMainComment: TCreateNewsItemMainComment = async (
	commentDispatch,
	{ newsItemExtraDataDispatch, bodyContent, requiredExtraData, token }
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

			if (requiredExtraData.type === 'comment_main')
				newsItemExtraDataDispatch({
					type: ENewsItemExtraData.ADD_NEW_MAIN_OR_MAIN_REPLY_COMMENT,
					payload: {
						// type: 'comment_main',
						newCommentData: {
							...requiredExtraData,
							...(bodyContent as unknown as TNewsItemCommentTypeMain),
							type: 'comment_main',
							news_comment_id,
							// replies_counter: 0,
							created_at: new Date().getTime(),
							updated_at: new Date().getTime(),
						},
					},
				});
		},
	});
};
