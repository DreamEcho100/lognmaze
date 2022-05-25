import { Dispatch } from 'react';

import {
	TNewsItemData,
	INewsItemTypeBlogContent,
	TNewsData,
	TDate,
} from '@coreLib/ts/global';

import { IGetNewsItemCommentsReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/comments/ts';
import { ICreateNewsItemReqArgs } from '@coreLib/networkReqArgs/_app/news/ts';

import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import { IGetNewsItemBlogContentReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/blog/content/ts';
import NewsContextConstants from '@coreLib/constants/store/types/NewsContext';
import { IGetNewsReqArgs } from '@coreLib/networkReqArgs/_app/news/ts';
import {
	IDeleteNewsItemReqArgs,
	IUpdateNewsItemReqArgs,
} from '@coreLib/networkReqArgs/_app/news/[news_id]/ts';

export type INewsContextStateData = {
	news: TNewsData;
	newsExtra: {
		[key: string]: {
			hit_comments_limit?: boolean;
			newsItemDetailsType?: 'content' | 'description';
			newsItemModelDetailsType?: 'content' | 'description';
		};
	};
	hit_news_items_limit: boolean;
};

export interface INewsContextState {
	data: INewsContextStateData;
	actions: {
		items: {
			[key: string]: {
				priorityForHeaderImage?: boolean;
				updatedToRenderDate?: TDate;
				requests?: {
					init?: {
						modal?: {
							getTypeBlogContent?: {
								isLoading: boolean;
								error: string;
								success: boolean;
							};
						};
					};
					getMoreMainComments?: {
						isLoading: boolean;
						error: string;
						success: boolean;
					};
					update?: {
						isLoading: boolean;
						error: string;
						success: boolean;
					};
					delete?: {
						isLoading: boolean;
						error: string;
						success: boolean;
					};
					mainComments?: {
						[key: string]: {
							create?: {
								isLoading: boolean;
								error: string;
								success: boolean;
							};
						};
					};
				};
			};
		};
		requests: {
			getMoreNewsItems?: {
				isLoading: boolean;
				error: string;
				success: boolean;
			};
			create?: {
				isLoading: boolean;
				error: string;
				success: boolean;
			};
		};
	};
}

interface IInitGetNewsItemTypeBlogDetailsTypeContentPending {
	type: NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_PENDING;
	payload: {
		news_id: TNewsItemData['news_id'];
	};
}
interface IInitGetNewsItemTypeBlogDetailsTypeContentSuccess {
	type: NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_SUCCESS;
	payload: {
		news_id: TNewsItemData['news_id'];
		newsItemTypeBlogContent: INewsItemTypeBlogContent;
	};
}
interface IInitGetNewsItemTypeBlogDetailsTypeContentFail {
	type: NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_FAIL;
	payload: {
		news_id: TNewsItemData['news_id'];
		error: string;
	};
}

interface IAddNewsItems {
	type: NewsContextConstants.ADD_NEWS_ITEMS;
	payload: {
		newNewsItems: TNewsData;
		hit_news_items_limit: boolean;
	};
}

interface ICreateNewNewsItem {
	type: NewsItemContextConstants.CREATE_NEW_NEWS_ITEM;
	payload: {
		newsItemBasicData: ICreateNewsItemReqArgs['bodyContent']['newsItemBasicData'];
		newNewsItemId: TNewsItemData['news_id'];
		newNewsItemAuthorData: {
			author_id: TNewsItemData['author_id'];
			author_user_name_id: TNewsItemData['author_user_name_id'];
			author_first_name: TNewsItemData['author_first_name'];
			author_last_name: TNewsItemData['author_last_name'];
			author_profile_picture: TNewsItemData['author_profile_picture'];
			author_bio: TNewsItemData['author_bio'];
		};
	};
}

interface IUpdateNewsItem {
	type: NewsItemContextConstants.UPDATE_NEWS_ITEM;
	payload: {
		news_id: TNewsItemData['news_id'];
		dataToUpdate: IUpdateNewsItemReqArgs['bodyContent']['dataToUpdate'];
	};
}

interface IDeleteNewsItemPending {
	type: NewsItemContextConstants.DELETE_PENDING;
	payload: {
		news_id: TNewsItemData['news_id'];
	};
}
interface IDeleteNewsItemSuccess {
	type: NewsItemContextConstants.DELETE_SUCCESS;
	payload: {
		news_id: TNewsItemData['news_id'];
	};
}
interface IDeleteNewsItemFail {
	type: NewsItemContextConstants.DELETE_FAIL;
	payload: {
		news_id: TNewsItemData['news_id'];
		error: string;
	};
}
interface IDeleteNewsItemReset {
	type: NewsItemContextConstants.DELETE_RESET;
	payload: {
		news_id: TNewsItemData['news_id'];
	};
}

export type TNewsContextReducerAction =
	| IAddNewsItems
	| ICreateNewNewsItem
	| IInitGetNewsItemTypeBlogDetailsTypeContentPending
	| IInitGetNewsItemTypeBlogDetailsTypeContentSuccess
	| IInitGetNewsItemTypeBlogDetailsTypeContentFail
	//
	| IUpdateNewsItem
	| IDeleteNewsItemPending
	| IDeleteNewsItemSuccess
	| IDeleteNewsItemFail
	| IDeleteNewsItemReset;

export type TNewsContextDispatch =
	| Dispatch<TNewsContextReducerAction>
	| ((value: TNewsContextReducerAction) => void);

export type TInitGetNewsItemTypeBlogContent = (
	newsDispatch: TNewsContextDispatch,
	{
		news_id,
		urlOptions,
	}: {
		news_id: TNewsItemData['news_id'];
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
		news_id: TNewsItemData['news_id'];
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
		newsItemBasicData: ICreateNewNewsItem['payload']['newsItemBasicData'];
		newNewsItemAuthorData: ICreateNewNewsItem['payload']['newNewsItemAuthorData'];
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
		news_id: TNewsItemData['news_id'];
		token?: string;
	}
) => Promise<void>;
export type TResetUpdateNewsItemAction = (
	newsDispatch: TNewsContextDispatch,
	{
		news_id,
	}: {
		news_id: TNewsItemData['news_id'];
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
		news_id: TNewsItemData['news_id'];
		token?: string;
	}
) => Promise<void>;
export type TResetDeleteNewsItemAction = (
	newsDispatch: TNewsContextDispatch,
	{
		news_id,
	}: {
		news_id: TNewsItemData['news_id'];
	}
) => void;

export type TNewsContextStateReducer = (
	state: INewsContextState,
	actions: TNewsContextReducerAction
) => INewsContextState;
