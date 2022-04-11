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
	if (actionType.startsWith(ECommentConstants.CREATE_MAIN_COMMENT))
		return 'create';
	return 'create';
};

const commentsRequestsReducer = (
	state: TCommentRequestsState = {},
	action: TCommentRequestsReducerAction
): TCommentRequestsState => {
	switch (action.type) {
		case ECommentConstants.CREATE_MAIN_COMMENT: {
			const actionType = actionsTypeMap(action.type);

			if (!actionType) return state;

			return {
				...state,
				[actionType]: requestInit(),
			};
		}
		case ECommentConstants.CREATE_MAIN_COMMENT_PENDING: {
			const actionType = actionsTypeMap(action.type);

			if (!actionType) return state;

			return {
				...state,
				[actionType]: requestInit({ isLoading: true }),
			};
		}
		case ECommentConstants.CREATE_MAIN_COMMENT_SUCCESS: {
			const actionType = actionsTypeMap(action.type);

			if (!actionType) return state;

			return {
				...state,
				[actionType]: requestInit({ success: true }),
			};
		}
		case ECommentConstants.CREATE_MAIN_COMMENT_FAIL: {
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

export default commentsRequestsReducer;
