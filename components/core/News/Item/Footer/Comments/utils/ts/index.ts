// import { INewsItemExtraDataContextReducerAction } from '@coreComponents/News/Item/context/ts';
import { INewsItemExtraDataContextReducerAction } from '@coreComponents/News/Item/context/ts';
import {
	ICreateNewsItemCommentReqArgsPropsBodyContentTypeCommentMain,
	IGetNewsItemCommentsReqArgs,
} from '@coreLib/networkReqArgs/_app/news/[news_id]/comments/ts';
import {
	IUserBasicData,
	TNewsItemCommentTypeMain,
	TNewsItemData,
} from '@coreLib/ts/global';
// import {
// IUserBasicData,
// TNewsItemCommentBasicData,
// TNewsItemCommentTypeMain,
// TNewsItemCommentTypeReplyMain,
// TNewsItemData,
// } from '@coreLib/ts/global';
import { Dispatch } from 'react';
import ECommentConstants from '../constants';

export interface IRequestInit {
	isLoading: boolean;
	error: string;
	success: boolean;
}

export type TCommentRequestsState = {
	create?: IRequestInit;
	initGetComments?: IRequestInit;
};

// type TCommentType =
// 	| TNewsItemCommentTypeMain['type']
// 	| TNewsItemCommentTypeReplyMain['type'];

interface ICreateNewsItemMainComment {
	type: ECommentConstants.CREATE_MAIN_COMMENT;
	// payload: { type: TCommentType };
}
interface ICreateNewsItemMainCommentPending {
	type: ECommentConstants.CREATE_MAIN_COMMENT_PENDING;
	// payload: { type: TCommentType };
}
interface ICreateNewsItemMainCommentSuccess {
	type: ECommentConstants.CREATE_MAIN_COMMENT_SUCCESS;
	// payload: { type: TCommentType };
}
interface ICreateNewsItemMainCommentFail {
	type: ECommentConstants.CREATE_MAIN_COMMENT_FAIL;
	payload: { error: string };
}

interface IInitGetMainComments {
	type: ECommentConstants.GET_COMMENTS_MAIN;
	// payload: { type: TCommentType };
}
interface IInitGetMainCommentsPending {
	type: ECommentConstants.GET_COMMENTS_MAIN_PENDING;
	// payload: { type: TCommentType };
}
interface IInitGetMainCommentsSuccess {
	type: ECommentConstants.GET_COMMENTS_MAIN_SUCCESS;
	// payload: { type: TCommentType };
}
interface IInitGetMainCommentsFail {
	type: ECommentConstants.GET_COMMENTS_MAIN_FAIL;
	payload: { error: string };
}

export type TCommentRequestsReducerAction =
	| ICreateNewsItemMainComment
	| ICreateNewsItemMainCommentPending
	| ICreateNewsItemMainCommentSuccess
	| ICreateNewsItemMainCommentFail
	| IInitGetMainComments
	| IInitGetMainCommentsPending
	| IInitGetMainCommentsSuccess
	| IInitGetMainCommentsFail;

export type TCommentRequestsDispatch =
	| Dispatch<TCommentRequestsReducerAction>
	| ((value: TCommentRequestsReducerAction) => void);

export type TCreateNewsItemMainComment = (
	commentDispatch: TCommentRequestsDispatch,
	props: {
		bodyContent: ICreateNewsItemCommentReqArgsPropsBodyContentTypeCommentMain;
		requiredExtraData: {
			author_id: IUserBasicData['id'];
			author_user_name_id: IUserBasicData['user_name_id'];
			author_first_name: IUserBasicData['first_name'];
			author_last_name: IUserBasicData['last_name'];
			author_profile_picture?: IUserBasicData['profile_picture'];

			type: TNewsItemCommentTypeMain['type'];
		};
		newsItemExtraDataDispatch:
			| Dispatch<INewsItemExtraDataContextReducerAction>
			| ((value: INewsItemExtraDataContextReducerAction) => void);
		token?: string;
	}
) => Promise<boolean>;

export type TAddMainCommentsToNewsItem = (
	commentDispatch: TCommentRequestsDispatch,
	props: {
		newsItemExtraDataDispatch:
			| Dispatch<INewsItemExtraDataContextReducerAction>
			| ((value: INewsItemExtraDataContextReducerAction) => void);
		news_id: TNewsItemData['news_id'];
		urlOptions: IGetNewsItemCommentsReqArgs['urlOptions'];
	}
) => Promise<void>;
