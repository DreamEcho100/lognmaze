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
import { TCreateNewsItemMainComment } from './ts';

interface IGetMoreNewsItemCommentRepliesMainExtraProps {
	news_id: TNewsItemData['news_id'];
	parent_id: TNewsItemCommentBasicData['news_comment_id'];
}

// interface IGetRepliesForMainCommentSuccessData {
// 	hit_replies_limit: boolean;
// 	comments: TNewsItemCommentMainReplies;
// }

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
					news_id: bodyContent.news_id,
					newCommentMainData: {
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
