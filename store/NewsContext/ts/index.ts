import { Dispatch } from 'react';

import {
	TNewsItemData,
	INewsItemTypeBlogContent,
	TNewsData,
	TDate,
} from '@coreLib/ts/global';

import { ICreateNewsItemReqArgs } from '@coreLib/networkReqArgs/_app/news/ts';

import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import { IGetNewsItemBlogContentReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/blog/content/ts';
import NewsContextConstants from '@coreLib/constants/store/types/NewsContext';
import { IUpdateNewsItemReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/ts';

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

interface IDeleteNewsItem {
	type: NewsItemContextConstants.DELETE_NEWS_ITEM;
	payload: {
		news_id: TNewsItemData['news_id'];
	};
}

export type TNewsContextReducerAction =
	| IAddNewsItems
	| ICreateNewNewsItem
	| IDeleteNewsItem
	| IInitGetNewsItemTypeBlogDetailsTypeContentPending
	| IInitGetNewsItemTypeBlogDetailsTypeContentSuccess
	| IInitGetNewsItemTypeBlogDetailsTypeContentFail
	//
	| IUpdateNewsItem;

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

export type TNewsContextStateReducer = (
	state: INewsContextState,
	actions: TNewsContextReducerAction
) => INewsContextState;
