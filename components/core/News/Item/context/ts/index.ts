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
		commentsMainData: TNewsItemCommentsMain;
		hit_comments_limit: boolean;
	};
}

interface IAddRepliesToCommentMain {
	type: ENewsItemExtraData.ADD_REPLIES_TO_COMMENT_MAIN;
	payload: {
		parent_id: TNewsItemCommentTypeReplyMain['parent_id'];
		newCommentMainRepliesData: TNewsItemCommentMainReplies;
		hit_replies_limit: boolean;
	};
}
interface IAddNewCommentTypeMainOrMainReply {
	type: ENewsItemExtraData.ADD_NEW_MAIN_OR_MAIN_REPLY_COMMENT;
	payload:
		| {
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
		};
	}
) => Promise<void>;
