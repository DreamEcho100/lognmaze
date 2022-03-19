import {
	TNewsItemData,
	TNewsItemCommentsMain,
	INewsItemTypeBlogContent,
	TNewsData,
} from '@coreLib/ts/global';

import { IGetNewsItemCommentsReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/comments/ts';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import { IGetNewsItemBlogContentReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/blog/content/ts';

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
				request?: {};
				init?: {
					priorityForHeaderImageForFirstIndex?: boolean;
					getMainComments?: {
						isLoading: boolean;
						error: string;
						success: boolean;
					};
					modal?: {
						getTypeBlogContent?: {
							isLoading: boolean;
							error: string;
							success: boolean;
						};
					};
				};
			};
		};
	};
}

interface IInitGetNewsItemCommentsMainPending {
	type: NewsItemContextConstants.INIT_GET_COMMENTS_PENDING;
	payload: {
		news_id: TNewsItemData['news_id'];
	};
}
interface IInitGetNewsItemCommentsMainSuccess {
	type: NewsItemContextConstants.INIT_GET_COMMENTS_SUCCESS;
	payload: {
		news_id: TNewsItemData['news_id'];
		commentsMainData: TNewsItemCommentsMain;
		hit_comments_limit: boolean;
	};
}
interface IInitGetNewsItemCommentsMainFail {
	type: NewsItemContextConstants.INIT_GET_COMMENTS_FAIL;
	payload: {
		news_id: TNewsItemData['news_id'];
		error: string;
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

export type TNewsContextReducerAction =
	| IInitGetNewsItemCommentsMainPending
	| IInitGetNewsItemCommentsMainSuccess
	| IInitGetNewsItemCommentsMainFail
	| IInitGetNewsItemTypeBlogDetailsTypeContentPending
	| IInitGetNewsItemTypeBlogDetailsTypeContentSuccess
	| IInitGetNewsItemTypeBlogDetailsTypeContentFail;

export type TNewsContextDispatch =
	| React.Dispatch<TNewsContextReducerAction>
	| ((value: TNewsContextReducerAction) => void);

export type TInitGetNewsItemCommentsMain = (
	newsDispatch: TNewsContextDispatch,
	{
		news_id,
		urlOptions,
	}: {
		news_id: TNewsItemData['news_id'];
		urlOptions: IGetNewsItemCommentsReqArgs['urlOptions'];
	}
) => Promise<void>;
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
	state: INewsContextState, // | undefined,
	actions: TNewsContextReducerAction
) => INewsContextState;
