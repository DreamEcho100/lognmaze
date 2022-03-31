import { IGetNewsItemCommentsReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/comments/ts';
import {
	IUserBasicData,
	TNewsItemCommentBasicData,
	TNewsItemCommentMainReplies,
	TNewsItemCommentTypeMain,
	TNewsItemCommentTypeReplyMain,
	TNewsItemData,
} from '@coreLib/ts/global';
import { TNewsContextReducerAction } from '@store/NewsContext/ts';
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

// type TCommentType =
// 	| TNewsItemCommentTypeMain['type']
// 	| TNewsItemCommentTypeReplyMain['type'];

interface ICreateNewsItemMainOrMainReplyComment {
	type: ECommentConstants.CREATE_MAIN_OR_MAIN_REPLY_COMMENT;
	// payload: { type: TCommentType };
}
interface ICreateNewsItemMainOrMainReplyCommentPending {
	type: ECommentConstants.CREATE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING;
	// payload: { type: TCommentType };
}
interface ICreateNewsItemMainOrMainReplyCommentSuccess {
	type: ECommentConstants.CREATE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS;
	// payload: { type: TCommentType };
}
interface ICreateNewsItemMainOrMainReplyCommentFail {
	type: ECommentConstants.CREATE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL;
	payload: { error: string };
}

interface IUpdateNewsItemMainOrMainReplyComment {
	type: ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT;
	// payload: { type: TCommentType };
}
interface IUpdateNewsItemMainOrMainReplyCommentPending {
	type: ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING;
	// payload: { type: TCommentType };
}
interface IUpdateNewsItemMainOrMainReplyCommentSuccess {
	type: ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS;
	// payload: { type: TCommentType };
}
interface IUpdateNewsItemMainOrMainReplyCommentFail {
	type: ECommentConstants.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL;
	payload: { error: string };
}

interface IGetRepliesForMainComment {
	type: ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT;
	// payload: { type: TCommentType };
}
interface IGetRepliesForMainCommentPending {
	type: ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_PENDING;
	// payload: { type: TCommentType };
}
interface IGetRepliesForMainCommentSuccess {
	type: ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_SUCCESS;
	// payload: { type: TCommentType };
}
interface IGetRepliesForMainCommentFail {
	type: ECommentConstants.GET_REPLIES_FOR_MAIN_COMMENT_FAIL;
	payload: { error: string };
}

interface IDeleteNewsItemMainOrMainReplyComment {
	type: ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT;
	payload: { type: TNewsItemCommentTypeMain['type'] };
}
interface IDeleteNewsItemMainOrMainReplyCommentPending {
	type: ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING;
	payload: { type: TNewsItemCommentTypeMain['type'] };
}
interface IDeleteNewsItemMainOrMainReplyCommentSuccess {
	type: ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS;
	payload: { type: TNewsItemCommentTypeMain['type'] };
}
interface IDeleteNewsItemMainOrMainReplyCommentFail {
	type: ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL;
	payload: { type: TNewsItemCommentTypeMain['type']; error: string };
}

export type TCommentRequestsReducerAction =
	| ICreateNewsItemMainOrMainReplyComment
	| ICreateNewsItemMainOrMainReplyCommentPending
	| ICreateNewsItemMainOrMainReplyCommentSuccess
	| ICreateNewsItemMainOrMainReplyCommentFail
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

export type TCreateNewsItemMainOrMainReplyComment = (
	commentDispatch: TCommentRequestsDispatch,
	props: {
		requiredData: (
			| (Pick<TNewsItemCommentTypeReplyMain, 'type' | 'parent_id'> & {
					news_id: TNewsItemData['news_id'];
					content: TNewsItemCommentTypeReplyMain['content'];
					reply_to_user_id: TNewsItemCommentTypeReplyMain['reply_to_user_id'];
					reply_to_comment_id?: TNewsItemCommentTypeReplyMain['reply_to_comment_id'];
			  })
			| (Pick<TNewsItemCommentTypeMain, 'type'> & {
					news_id: TNewsItemData['news_id'];
					content: TNewsItemCommentTypeMain['content'];
			  })
		) & {
			// news_comment_id: string;
			content: TNewsItemCommentBasicData['content'];
			author_id: IUserBasicData['id'];
			author_user_name_id: IUserBasicData['user_name_id'];
			author_first_name: IUserBasicData['first_name'];
			author_last_name: IUserBasicData['last_name'];
			author_profile_picture?: IUserBasicData['profile_picture'];
		};
		newsDispatch: (value: TNewsContextReducerAction) => void;
		token?: string;
	}
) => Promise<void>;
/* */

export type TUpdateNewsItemMainOrMainReplyComment = (
	commentDispatch: TCommentRequestsDispatch,
	props: {
		requiredData: (
			| (TNewsItemCommentTypeReplyMain & {
					newContent: TNewsItemCommentTypeReplyMain['content'];
			  })
			| (TNewsItemCommentTypeMain & {
					newContent: TNewsItemCommentTypeMain['content'];
			  })
		) & {
			news_id: TNewsItemData['news_id'];
		};
		newsDispatch: (value: TNewsContextReducerAction) => void;
		token?: string;
	}
) => Promise<void>;

export type TGetRepliesForMainComment = (
	commentDispatch: TCommentRequestsDispatch,
	{
		news_id,
		urlOptions,
		parent_id,
	}: {
		newsDispatch: (value: TNewsContextReducerAction) => void;
		news_id: TNewsItemData['news_id'];
		parent_id: TNewsItemCommentTypeReplyMain['parent_id'];
		urlOptions: IGetNewsItemCommentsReqArgs['urlOptions'];
	}
) => Promise<void>;

export type TCommentRequestsStateReducer = (
	state: TCommentRequestsState, // | undefined,
	actions: TCommentRequestsReducerAction
) => TCommentRequestsState;
