import { IGetNewsItemCommentsReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/comments/ts';
import {
	IUserBasicData,
	TNewsItemCommentBasicData,
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

interface ICreateNewsItemReplyForMainComment {
	type: ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT;
	// payload: { type: TCommentType };
}
interface ICreateNewsItemReplyForMainCommentPending {
	type: ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT_PENDING;
	// payload: { type: TCommentType };
}
interface ICreateNewsItemReplyForMainCommentSuccess {
	type: ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT_SUCCESS;
	// payload: { type: TCommentType };
}
interface ICreateNewsItemReplyForMainCommentFail {
	type: ECommentConstants.CREATE_REPLY_FOR_MAIN_COMMENT_FAIL;
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
	// payload: { type: TNewsItemCommentTypeMain['type'] };
}
interface IDeleteNewsItemMainOrMainReplyCommentPending {
	type: ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_PENDING;
	// payload: { type: TNewsItemCommentTypeMain['type'] };
}
interface IDeleteNewsItemMainOrMainReplyCommentSuccess {
	type: ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_SUCCESS;
	// payload: { type: TNewsItemCommentTypeMain['type'] };
}
interface IDeleteNewsItemMainOrMainReplyCommentFail {
	type: ECommentConstants.DELETE_MAIN_OR_MAIN_REPLY_COMMENT_FAIL;
	payload: {
		// type: TNewsItemCommentTypeMain['type'];
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
			// news_comment_id: string;
			news_id: TNewsItemData['news_id'];
			content: TNewsItemCommentBasicData['content'];
			author_id: IUserBasicData['id'];
			author_user_name_id: IUserBasicData['user_name_id'];
			author_first_name: IUserBasicData['first_name'];
			author_last_name: IUserBasicData['last_name'];
			author_profile_picture?: IUserBasicData['profile_picture'];
		} & (
			| {
					type: TNewsItemCommentTypeReplyMain['type'];
					parent_id: TNewsItemCommentTypeReplyMain['parent_id'];
					reply_to_user_id: TNewsItemCommentTypeReplyMain['reply_to_user_id'];
					reply_to_comment_id: TNewsItemCommentTypeReplyMain['reply_to_comment_id'];
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  }
			| {
					type: TNewsItemCommentTypeMain['type'];
					parent_id: TNewsItemCommentTypeMain['news_comment_id'];
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  }
		);
		newsDispatch: (value: TNewsContextReducerAction) => void;
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
		newsDispatch: (value: TNewsContextReducerAction) => void;
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
		newsDispatch: (value: TNewsContextReducerAction) => void;
		token?: string;
	}
) => Promise<boolean>;

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
) => Promise<boolean>;

export type TCommentRequestsStateReducer = (
	state: TCommentRequestsState, // | undefined,
	actions: TCommentRequestsReducerAction
) => TCommentRequestsState;
