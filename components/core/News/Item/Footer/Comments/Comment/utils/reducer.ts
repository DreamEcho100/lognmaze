/* eslint-disable no-fallthrough */
import ECommentConstants from './constants';
import {
	IRequestInit,
	TCommentRequestsReducerAction,
	TCommentRequestsState,
} from './ts';

const requestInit = (props?: Partial<IRequestInit>): IRequestInit => ({
	isLoading: props?.isLoading || false,
	error: props?.error || '',
	success: props?.success || false,
});

const actionsTypeMap = (actionType: string) => {
	if (actionType.startsWith(ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT))
		return 'create';
	if (
		actionType.startsWith(ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT)
	)
		return 'delete';
	if (
		actionType.startsWith(ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT)
	)
		return 'update';

	if (actionType.startsWith(ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT))
		return 'getReplies';
};

const commentRequestsReducer = (
	state: TCommentRequestsState = {
		type: 'comment_main',
	},
	action: TCommentRequestsReducerAction
): TCommentRequestsState => {
	switch (action.type) {
		case ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT:
		case ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT:
		case ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT:

		case ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT: {
			const actionType = actionsTypeMap(action.type);

			if (!actionType) return state;

			return {
				...state,
				[actionType]: requestInit(),
			};
		}
		case ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT_PENDING:
		case ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING:
		case ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING:

		case ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_PENDING: {
			const actionType = actionsTypeMap(action.type);

			if (!actionType) return state;

			return {
				...state,
				[actionType]: requestInit({ isLoading: true }),
			};
		}
		case ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT_SUCCESS:
		case ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS:
		case ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS:

		case ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_SUCCESS: {
			const actionType = actionsTypeMap(action.type);

			if (!actionType) return state;

			return {
				...state,
				[actionType]: requestInit({ success: true }),
			};
		}
		case ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT_FAIL:
		case ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL:
		case ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL:

		case ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_FAIL: {
			const { error } = action.payload;
			const actionType = actionsTypeMap(action.type);

			if (!actionType) return state;

			return {
				...state,
				[actionType]: requestInit({ error }),
			};
		}

		default: {
			return state;
		}
	}
};

export default commentRequestsReducer;
