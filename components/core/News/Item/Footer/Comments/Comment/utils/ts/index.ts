import { INewsItemExtraDataContextReducerAction } from '@coreComponents/News/Item/context/ts';
import { IGetNewsItemCommentsReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/comments/ts';
import {
	IUserBasicData,
	TNewsItemCommentBasicData,
	TNewsItemCommentTypeMain,
	TNewsItemCommentTypeReplyMain,
	TNewsItemData,
} from '@coreLib/ts/global';
import { Dispatch } from 'react';
import ECommentConstants from '../constants';

export interface IRequestInit {
	isLoading: boolean;
	error: string;
	success: boolean;
}

interface ICommentRequestsStateTypeMain {
	type: TNewsItemCommentTypeMain['type'];
	getReplies?: IRequestInit;
	create?: IRequestInit;
	update?: IRequestInit;
	delete?: IRequestInit;
}
interface ICommentRequestsStateTypeMainReply {
	type: TNewsItemCommentTypeReplyMain['type'];
	create?: IRequestInit;
	update?: IRequestInit;
	delete?: IRequestInit;
}

export type TCommentRequestsState =
	| ICommentRequestsStateTypeMain
	| ICommentRequestsStateTypeMainReply;

interface ICreateNewsItemReplyForMainComment {
	type: ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT;
}
interface ICreateNewsItemReplyForMainCommentPending {
	type: ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT_PENDING;
}
interface ICreateNewsItemReplyForMainCommentSuccess {
	type: ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT_SUCCESS;
}
interface ICreateNewsItemReplyForMainCommentFail {
	type: ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT_FAIL;
	payload: { error: string };
}

interface IUpdateNewsItemMainOrMainReplyComment {
	type: ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT;
}
interface IUpdateNewsItemMainOrMainReplyCommentPending {
	type: ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING;
}
interface IUpdateNewsItemMainOrMainReplyCommentSuccess {
	type: ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS;
}
interface IUpdateNewsItemMainOrMainReplyCommentFail {
	type: ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL;
	payload: { error: string };
}

interface IGetRepliesForMainComment {
	type: ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT;
}
interface IGetRepliesForMainCommentPending {
	type: ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_PENDING;
}
interface IGetRepliesForMainCommentSuccess {
	type: ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_SUCCESS;
}
interface IGetRepliesForMainCommentFail {
	type: ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_FAIL;
	payload: { error: string };
}

interface IDeleteNewsItemMainOrMainReplyComment {
	type: ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT;
}
interface IDeleteNewsItemMainOrMainReplyCommentPending {
	type: ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING;
}
interface IDeleteNewsItemMainOrMainReplyCommentSuccess {
	type: ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS;
}
interface IDeleteNewsItemMainOrMainReplyCommentFail {
	type: ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL;
	payload: {
		error: string;
	};
}

export type TCommentRequestsReducerAction =
	| ICreateNewsItemReplyForMainComment
	| ICreateNewsItemReplyForMainCommentPending
	| ICreateNewsItemReplyForMainCommentSuccess
	| ICreateNewsItemReplyForMainCommentFail
	| IUpdateNewsItemMainOrMainReplyComment
	| IUpdateNewsItemMainOrMainReplyCommentPending
	| IUpdateNewsItemMainOrMainReplyCommentSuccess
	| IUpdateNewsItemMainOrMainReplyCommentFail
	| IDeleteNewsItemMainOrMainReplyComment
	| IDeleteNewsItemMainOrMainReplyCommentPending
	| IDeleteNewsItemMainOrMainReplyCommentSuccess
	| IDeleteNewsItemMainOrMainReplyCommentFail
	| IGetRepliesForMainComment
	| IGetRepliesForMainCommentPending
	| IGetRepliesForMainCommentSuccess
	| IGetRepliesForMainCommentFail;

export type TCommentRequestsDispatch =
	| Dispatch<TCommentRequestsReducerAction>
	| ((value: TCommentRequestsReducerAction) => void);

export type TCreateNewsItemReplyForMainComment = (
	commentDispatch: TCommentRequestsDispatch,
	props: {
		requiredData: {
			news_id: TNewsItemData['news_id'];
			content: TNewsItemCommentBasicData['content'];
			author_id: IUserBasicData['id'];
			author_user_name_id: IUserBasicData['user_name_id'];
			author_first_name: IUserBasicData['first_name'];
			author_last_name: IUserBasicData['last_name'];
			author_profile_picture?: IUserBasicData['profile_picture'];
			parent_id: TNewsItemCommentTypeReplyMain['parent_id'];
			reply_to_user_id: TNewsItemCommentTypeReplyMain['reply_to_user_id'];
			reply_to_comment_id?: TNewsItemCommentTypeReplyMain['reply_to_comment_id'];
		};

		newsItemExtraDataDispatch:
			| Dispatch<INewsItemExtraDataContextReducerAction>
			| ((value: INewsItemExtraDataContextReducerAction) => void);
		token?: string;
	}
) => Promise<boolean>;
/* */

export type TUpdateNewsItemMainOrMainReplyComment = (
	commentDispatch: TCommentRequestsDispatch,
	props: {
		requiredData: {
			news_id: TNewsItemData['news_id'];
			newContent: TNewsItemCommentBasicData['content'];
			news_comment_id: TNewsItemCommentBasicData['news_comment_id'];
		} & (
			| {
					type: TNewsItemCommentTypeReplyMain['type'];
					parent_id: TNewsItemCommentTypeReplyMain['parent_id'];
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  }
			| { type: TNewsItemCommentTypeMain['type'] }
		);
		newsItemExtraDataDispatch:
			| Dispatch<INewsItemExtraDataContextReducerAction>
			| ((value: INewsItemExtraDataContextReducerAction) => void);
		token?: string;
	}
) => Promise<boolean>;

export type TDeleteNewsItemMainOrMainReplyComment = (
	commentDispatch: TCommentRequestsDispatch,
	props: {
		requiredData: {
			news_comment_id: TNewsItemCommentBasicData['news_comment_id'];
			news_id: TNewsItemData['news_id'];
		} & (
			| { type: TNewsItemCommentTypeMain['type'] }
			| Pick<TNewsItemCommentTypeReplyMain, 'type' | 'parent_id'>
		);
		newsItemExtraDataDispatch:
			| Dispatch<INewsItemExtraDataContextReducerAction>
			| ((value: INewsItemExtraDataContextReducerAction) => void);
		token?: string;
	}
) => Promise<boolean>;

export type TGetRepliesForMainComment = (
	commentDispatch: TCommentRequestsDispatch,
	props: {
		newsItemExtraDataDispatch:
			| Dispatch<INewsItemExtraDataContextReducerAction>
			| ((value: INewsItemExtraDataContextReducerAction) => void);

		parent_id: TNewsItemCommentTypeReplyMain['parent_id'];
		urlOptions: IGetNewsItemCommentsReqArgs['urlOptions'];
	}
) => Promise<boolean>;

export type TCommentRequestsStateReducer = (
	state: TCommentRequestsState,
	actions: TCommentRequestsReducerAction
) => TCommentRequestsState;
