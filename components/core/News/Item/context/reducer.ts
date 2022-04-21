import ENewsItemExtraData from './constants';
import { returnNewsItemExtraDataInitialState } from './initialState';

import {
	INewsItemExtraDataContext,
	INewsItemExtraDataContextReducerAction,
} from './ts';

const reducer = (
	state: INewsItemExtraDataContext = returnNewsItemExtraDataInitialState(),
	actions: INewsItemExtraDataContextReducerAction
): INewsItemExtraDataContext => {
	if (process.env.NODE_ENV !== 'production') {
		console.log('actions.type', actions.type);
	}

	switch (actions.type) {
		case ENewsItemExtraData.ADD_MAIN_COMMENTS: {
			const { commentsMainData, hit_comments_limit } = actions.payload;

			return {
				...state,
				data: {
					...state.data,
					comments: [...(state.data.comments || []), ...commentsMainData],
					hit_comments_limit,
				},
			};
		}

		case ENewsItemExtraData.ADD_NEW_MAIN_OR_MAIN_REPLY_COMMENT: {
			const { newCommentData } = actions.payload;

			return {
				...state,
				data: {
					...state.data,
					...(() => {
						if (newCommentData.type === 'comment_main')
							return {
								comments: [newCommentData, ...(state.data.comments || [])],
								comments_counter:
									parseInt(state.data.comments_counter + '') + 1,
							};

						return {
							comments: state.data.comments.map((comment) => {
								if (comment.news_comment_id === newCommentData.parent_id) {
									return {
										...comment,
										replies: [...(comment.replies || []), newCommentData],
										replies_counter: parseInt(comment.replies_counter + '') + 1,
									};
								}

								return comment;
							}),
						};
					})(),
				},
			};
		}
		//
		case ENewsItemExtraData.ADD_REPLIES_TO_COMMENT_MAIN: {
			const { hit_replies_limit, newCommentMainRepliesData, parent_id } =
				actions.payload;

			return {
				...state,
				data: {
					...state.data,
					...(() => {
						return {
							...state.data,
							comments: state.data?.comments.map((comment) => {
								if (comment.news_comment_id === parent_id) {
									return {
										...comment,
										replies: [
											...(comment?.replies || []),
											...newCommentMainRepliesData,
										],
										hit_replies_limit: !!hit_replies_limit,
									};
								}

								return comment;
							}),
						};
					})(),
				},
			};
		}

		case ENewsItemExtraData.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT: {
			const payload = actions.payload;

			return {
				...state,
				data: {
					...state.data,

					comments: state.data.comments.map((comment) => {
						if (
							payload.type === 'comment_main' &&
							comment.news_comment_id === payload.news_comment_id
						) {
							return {
								...comment,
								content: payload.newContent,
							};
						} else if (
							payload.type === 'comment_main_reply' &&
							comment.news_comment_id === payload.parent_id
						) {
							return {
								...comment,
								replies: (comment.replies || []).map((reply) => {
									if (reply.news_comment_id === payload.news_comment_id) {
										return {
											...reply,
											content: payload.newContent,
										};
									}

									return reply;
								}),
							};
						}

						return comment;
					}),
				},
			};
		}

		case ENewsItemExtraData.DELETE_MAIN_OR_MAIN_REPLY_COMMENT: {
			const payload = actions.payload;

			return {
				...state,
				data: {
					...state.data,

					...(() => {
						if (payload.type === 'comment_main') {
							return {
								comments: (state.data.comments || []).filter(
									(comment) =>
										comment.news_comment_id !== payload.news_comment_id
								),
								comments_counter: state.data.comments_counter - 1,
							};
						}

						return {
							comments: (state.data.comments || []).map((comment) => {
								if (comment.news_comment_id === payload.parent_id) {
									return {
										...comment,
										replies: (comment.replies || []).filter(
											(reply) =>
												reply.news_comment_id !== payload.news_comment_id
										),
										replies_counter: comment.replies_counter - 1,
									};
								}

								return comment;
							}),
						};
					})(),
				},
			};
		}

		default:
			return state;
	}
};

export default reducer;
