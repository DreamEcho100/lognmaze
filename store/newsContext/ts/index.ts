import {
	TNewsItemData,
	TNewsItemCommentsMain,
	INewsItemTypeBlogContent,
	TNewsData,
	TNewsItemCommentMainReplies,
	TNewsItemCommentBasicData,
} from '@coreLib/ts/global';

import { IGetNewsItemCommentsReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/comments/ts';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import { IGetNewsItemBlogContentReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/blog/content/ts';
import NewsContextConstants from '@coreLib/constants/store/types/NewsContext';
import { IGetNewsReqArgs } from '@coreLib/networkReqArgs/_app/news/ts';

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
				requests?: {
					init?: {
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
					getMoreMainComments?: {
						isLoading: boolean;
						error: string;
						success: boolean;
					};
					mainComments?: {
						[key: string]: {
							getMoreReplies?: {
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

interface IGetMoreNewsItemsPending {
	type: NewsContextConstants.GET_MORE_ITEMS_PENDING;
}
interface IGetMoreNewsItemsSuccess {
	type: NewsContextConstants.GET_MORE_ITEMS_SUCCESS;
	payload: {
		newNewsItems: TNewsData;
		hit_news_items_limit: boolean;
	};
}
interface IGetMoreNewsItemsFail {
	type: NewsContextConstants.GET_MORE_ITEMS_FAIL;
	payload: {
		error: string;
	};
}

interface IGetMoreNewsItemCommentsMainPending {
	type: NewsItemContextConstants.GET_MORE_MAIN_COMMENTS_PENDING;
	payload: {
		news_id: TNewsItemData['news_id'];
	};
}
interface IGetMoreNewsItemCommentsMainSuccess {
	type: NewsItemContextConstants.GET_MORE_MAIN_COMMENTS_SUCCESS;
	payload: {
		news_id: TNewsItemData['news_id'];
		newCommentsMainData: TNewsItemCommentsMain;
		hit_comments_limit: boolean;
	};
}
interface IGetMoreNewsItemCommentsMainFail {
	type: NewsItemContextConstants.GET_MORE_MAIN_COMMENTS_FAIL;
	payload: {
		news_id: TNewsItemData['news_id'];
		error: string;
	};
}

interface IGetMoreNewsItemCommentMainReplyPending {
	type: NewsItemContextConstants.GET_MORE_MAIN_COMMENT_REPLIES_PENDING;
	payload: {
		news_id: TNewsItemData['news_id'];
		newsCommentParentId: TNewsItemCommentBasicData['news_comment_id'];
	};
}
interface IGetMoreNewsItemCommentMainReplySuccess {
	type: NewsItemContextConstants.GET_MORE_MAIN_COMMENT_REPLIES_SUCCESS;
	payload: {
		news_id: TNewsItemData['news_id'];
		newsCommentParentId: TNewsItemCommentBasicData['news_comment_id'];
		newCommentMainRepliesData: TNewsItemCommentMainReplies;
		hit_replies_limit: boolean;
	};
}
interface IGetMoreNewsItemCommentMainReplyFail {
	type: NewsItemContextConstants.GET_MORE_MAIN_COMMENT_REPLIES_FAIL;
	payload: {
		news_id: TNewsItemData['news_id'];
		newsCommentParentId: TNewsItemCommentBasicData['news_comment_id'];
		error: string;
	};
}

export type TNewsContextReducerAction =
	| IInitGetNewsItemCommentsMainPending
	| IInitGetNewsItemCommentsMainSuccess
	| IInitGetNewsItemCommentsMainFail
	| IInitGetNewsItemTypeBlogDetailsTypeContentPending
	| IInitGetNewsItemTypeBlogDetailsTypeContentSuccess
	| IInitGetNewsItemTypeBlogDetailsTypeContentFail
	| IGetMoreNewsItemsPending
	| IGetMoreNewsItemsSuccess
	| IGetMoreNewsItemsFail
	| IGetMoreNewsItemCommentsMainPending
	| IGetMoreNewsItemCommentsMainSuccess
	| IGetMoreNewsItemCommentsMainFail
	| IGetMoreNewsItemCommentMainReplyPending
	| IGetMoreNewsItemCommentMainReplySuccess
	| IGetMoreNewsItemCommentMainReplyFail;

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
export type TGetMoreNewsItems = (
	newsDispatch: TNewsContextDispatch,
	{
		urlOptions,
	}: {
		urlOptions: IGetNewsReqArgs['urlOptions'];
	}
) => Promise<void>;
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
export type TGetMoreNewsItemCommentRepliesMain = (
	newsDispatch: TNewsContextDispatch,
	{
		news_id,
		urlOptions,
		newsCommentParentId,
	}: {
		news_id: TNewsItemData['news_id'];
		newsCommentParentId: TNewsItemCommentBasicData['news_comment_id'];
		urlOptions: IGetNewsItemCommentsReqArgs['urlOptions'];
	}
) => Promise<void>;

export type TNewsContextStateReducer = (
	state: INewsContextState, // | undefined,
	actions: TNewsContextReducerAction
) => INewsContextState;
