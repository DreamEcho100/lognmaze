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

const actionsMap = (actionType: string, commentType?: string) => {
	if (
		actionType.startsWith(ECommentConstants.CREATE_MAIN_OR_MAIN_REPLY_COMMENT)
	)
		return 'create';
	if (
		actionType.startsWith(ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT)
	)
		return 'delete';
	if (
		actionType.startsWith(ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT)
	)
		return 'update';

	// if (actionType.startsWith(ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT))
	return 'getReplies';
};

const commentRequestsReducer = (
	state: TCommentRequestsState = {
		type: 'comment_main',
	},
	action: TCommentRequestsReducerAction
): TCommentRequestsState => {
	switch (action.type) {
		case ECommentConstants.CREATE_MAIN_OR_MAIN_REPLY_COMMENT:
		case ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT:
		case ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT:

		case ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT: {
			return {
				...state,
				[actionsMap(action.type)]: requestInit(),
			};
		}
		case ECommentConstants.CREATE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING:
		case ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING:
		case ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING:

		case ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_PENDING: {
			return {
				...state,
				[actionsMap(action.type)]: requestInit({ isLoading: true }),
			};
		}
		case ECommentConstants.CREATE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS:
		case ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS:
		case ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS:

		case ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_SUCCESS: {
			return {
				...state,
				[actionsMap(action.type)]: requestInit({ success: true }),
			};
		}
		case ECommentConstants.CREATE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL:
		case ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL:
		case ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL:

		case ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_FAIL: {
			const { error } = action.payload;
			return {
				...state,
				[actionsMap(action.type)]: requestInit({ error }),
			};
		}

		default: {
			return state;
		}
	}
};

export default commentRequestsReducer;
