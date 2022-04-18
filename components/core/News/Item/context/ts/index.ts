import { Dispatch } from 'react';
import {
	TNewsItemCommentBasicData,
	TNewsItemCommentMainReplies,
	TNewsItemCommentsMain,
	TNewsItemCommentTypeMain,
	TNewsItemCommentTypeReplyMain,
} from '@coreLib/ts/global';
import ENewsItemExtraData from '../constants';
import { TNewsContextReducerAction } from '@store/NewsContext/ts';
import { IUrlOptionsQueriesTypeCommentMain } from '@coreLib/networkReqArgs/_app/news/[news_id]/comments/ts';

export interface INewsItemExtraDataContext {
	data: {
		comments_counter: number;
		comments: TNewsItemCommentsMain;
		hit_comments_limit: boolean;
	};
	actions: {
		/*
		init: {
			modal: {
				getTypeBlogContent?: {
					isLoading: boolean;
					error: string;
					success: boolean;
				};
			};
		};
		*/
	};
}

interface IAddMainCommentsToNewsItem {
	type: ENewsItemExtraData.ADD_MAIN_COMMENTS;
	payload: {
		// news_id: TNewsItemData['news_id'];
		commentsMainData: TNewsItemCommentsMain; // | TNewsItemCommentMainReplies;
		hit_comments_limit: boolean;
	};
}

interface IAddRepliesToCommentMain {
	type: ENewsItemExtraData.ADD_REPLIES_TO_COMMENT_MAIN;
	payload: {
		// news_id: TNewsItemData['news_id'];
		parent_id: TNewsItemCommentTypeReplyMain['parent_id'];
		newCommentMainRepliesData: TNewsItemCommentMainReplies;
		hit_replies_limit: boolean;
	};
}
interface IAddNewCommentTypeMainOrMainReply {
	type: ENewsItemExtraData.ADD_NEW_MAIN_OR_MAIN_REPLY_COMMENT;
	payload:
		| {
				// news_id: TNewsItemData['news_id'];
				newCommentData: TNewsItemCommentTypeMain;
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }
		| {
				// news_id: TNewsItemData['news_id'];
				newCommentData: TNewsItemCommentTypeReplyMain;
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  };
}
interface IUpdateNewsItemMainOrMainReplyComment {
	type: ENewsItemExtraData.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT;
	payload: {
		// news_id: TNewsItemData['news_id'];
		newContent: TNewsItemCommentBasicData['content'];
	} & (
		| {
				type: TNewsItemCommentTypeReplyMain['type'];
				news_comment_id: TNewsItemCommentTypeReplyMain['news_comment_id'];
				parent_id: TNewsItemCommentTypeReplyMain['parent_id'];
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }
		| {
				type: TNewsItemCommentTypeMain['type'];
				news_comment_id: TNewsItemCommentTypeMain['news_comment_id'];
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  }
	);
}

interface IDeleteMainOrReplyComment {
	type: ENewsItemExtraData.DELETE_MAIN_OR_MAIN_REPLY_COMMENT;
	payload: {
		news_comment_id: TNewsItemCommentBasicData['news_comment_id'];
		// news_id: TNewsItemData['news_id'];
	} & (
		| { type: TNewsItemCommentTypeMain['type'] }
		| Pick<TNewsItemCommentTypeReplyMain, 'type' | 'parent_id'>
	);
}

export type INewsItemExtraDataContextReducerAction =
	| IAddMainCommentsToNewsItem
	| IAddRepliesToCommentMain
	| IAddNewCommentTypeMainOrMainReply
	| IUpdateNewsItemMainOrMainReplyComment
	| IDeleteMainOrReplyComment;

export type INewsItemExtraDataContextDispatch =
	| Dispatch<INewsItemExtraDataContextReducerAction>
	| ((value: TNewsContextReducerAction) => void);

export type TGetMoreNewsItemMainComments = (
	newsItemExtraDataContextDispatch: INewsItemExtraDataContextDispatch,
	{
		urlOptions,
	}: {
		urlOptions: {
			params: {
				news_id: string;
			};
			queries: IUrlOptionsQueriesTypeCommentMain;
			// | IUrlOptionsQueriesTypeCommentMainReply;
		} /*IGetNewsItemCommentsReqArgs['urlOptions'];*/;
	}
) => Promise<void>;

/*

export type TInitGetNewsItemTypeBlogContent = (
	newsDispatch: TNewsContextDispatch,
	{
		news_id,
		urlOptions,
	}: {
		// news_id: TNewsItemData['news_id'];
		urlOptions: IGetNewsItemBlogContentReqArgs['urlOptions'];
	}
) => Promise<void>;
export type TGetMoreNewsItems = (
	newsDispatch: TNewsContextDispatch,
	{
		urlOptions,
	}: {
		urlOptions: IGetNewsReqArgs['urlOptions'];
	}
) => Promise<void>;
//
export type TGetMoreNewsItemCommentsMain = (
	newsDispatch: TNewsContextDispatch,
	{
		news_id,
		urlOptions,
	}: {
		// news_id: TNewsItemData['news_id'];
		urlOptions: IGetNewsItemCommentsReqArgs['urlOptions'];
	}
) => Promise<void>;

//
export type TCreateNewsItem = (
	newsDispatch: TNewsContextDispatch,
	{
		newsItemBasicData,
		newNewsItemAuthorData,
		token,
	}: {
		newsItemBasicData: ICreateNewsItemSuccess['payload']['newsItemBasicData'];
		newNewsItemAuthorData: ICreateNewsItemSuccess['payload']['newNewsItemAuthorData'];
		token?: string;
	}
) => Promise<void>;
export type TResetCreateNewsItemAction = (
	newsDispatch: TNewsContextDispatch
) => void;
export type TUpdateNewsItem = (
	newsDispatch: TNewsContextDispatch,
	{
		bodyContent,
		news_id,
		token,
	}: {
		bodyContent: IUpdateNewsItemReqArgs['bodyContent'];
		// news_id: TNewsItemData['news_id'];
		token?: string;
	}
) => Promise<void>;
export type TResetUpdateNewsItemAction = (
	newsDispatch: TNewsContextDispatch,
	{
		news_id,
	}: {
		// news_id: TNewsItemData['news_id'];
	}
) => void;
export type TDeleteNewsItem = (
	newsDispatch: TNewsContextDispatch,
	{
		bodyContent,
		news_id,
		token,
	}: {
		bodyContent: IDeleteNewsItemReqArgs['bodyContent'];
		// news_id: TNewsItemData['news_id'];
		token?: string;
	}
) => Promise<void>;
export type TResetDeleteNewsItemAction = (
	newsDispatch: TNewsContextDispatch,
	{
		news_id,
	}: {
		// news_id: TNewsItemData['news_id'];
	}
) => void;

export type TNewsContextStateReducer = (
	state: INewsContextState, // | undefined,
	actions: TNewsContextReducerAction
) => INewsContextState;
*/
