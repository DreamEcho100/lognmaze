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
	if (actionType.startsWith(ECommentConstants.INIT_GET_COMMENTS_MAIN))
		return 'initGetComments';
	if (actionType.startsWith(ECommentConstants.CREATE_MAIN_COMMENT))
		return 'create';
	return 'create';
};

const commentsRequestsReducer = (
	state: TCommentRequestsState = {},
	actions: TCommentRequestsReducerAction
): TCommentRequestsState => {
	if (process.env.NODE_ENV !== 'production') {
		console.log('actions.type', actions.type);
	}

	switch (actions.type) {
		case ECommentConstants.INIT_GET_COMMENTS_MAIN:
		case ECommentConstants.CREATE_MAIN_COMMENT: {
			const actionType = actionsTypeMap(actions.type);

			if (!actionType) return state;

			return {
				...state,
				[actionType]: requestInit(),
			};
		}
		case ECommentConstants.INIT_GET_COMMENTS_MAIN_PENDING:
		case ECommentConstants.CREATE_MAIN_COMMENT_PENDING: {
			const actionType = actionsTypeMap(actions.type);

			if (!actionType) return state;

			return {
				...state,
				[actionType]: requestInit({ isLoading: true }),
			};
		}
		case ECommentConstants.INIT_GET_COMMENTS_MAIN_SUCCESS:
		case ECommentConstants.CREATE_MAIN_COMMENT_SUCCESS: {
			const actionType = actionsTypeMap(actions.type);

			if (!actionType) return state;

			return {
				...state,
				[actionType]: requestInit({ success: true }),
			};
		}
		case ECommentConstants.INIT_GET_COMMENTS_MAIN_FAIL:
		case ECommentConstants.CREATE_MAIN_COMMENT_FAIL: {
			const { error } = actions.payload;
			const actionType = actionsTypeMap(actions.type);

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

export default commentsRequestsReducer;
