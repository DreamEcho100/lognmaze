import {
	TNewsItemData,
	TNewsItemCommentsMain,
	INewsItemTypeBlogContent,
	INewsItemBasicData,
} from '@coreLib/ts/global';
import { IGetNewsItemCommentsReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/comments/ts';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
import { IGetNewsItemBlogContentReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/blog/content/ts';

export type INewsItemContextStateData = {
	newsItem: TNewsItemData;
	hit_comments_limit: boolean;
	newsItemDetailsType: 'content' | 'description';
	newsItemModelDetailsType: 'content' | 'description';
};

export interface INewsItemContextState {
	data: INewsItemContextStateData;
	actions: {
		request: {};
		init: {
			getComments: {
				isLoading: boolean;
				error: string;
				success: boolean;
			};
			modal: {
				getTypeBlogContent: {
					isLoading: boolean;
					error: string;
					success: boolean;
				};
			};
		};
	};
}

interface IInitGetNewsItemCommentsMainPending {
	type: NewsItemContextConstants.INIT_GET_COMMENTS_PENDING;
}
interface IInitGetNewsItemCommentsMainSuccess {
	type: NewsItemContextConstants.INIT_GET_COMMENTS_SUCCESS;
	payload: {
		commentsMainData: TNewsItemCommentsMain;
		hit_comments_limit: boolean;
	};
}
interface IInitGetNewsItemCommentsMainFail {
	type: NewsItemContextConstants.INIT_GET_COMMENTS_FAIL;
	payload: { error: string };
}

interface IInitGetNewsItemTypeBlogDetailsTypeContentPending {
	type: NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_PENDING;
}
interface IInitGetNewsItemTypeBlogDetailsTypeContentSuccess {
	type: NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_SUCCESS;
	payload: {
		newsItemTypeBlogContent: INewsItemTypeBlogContent;
	};
}
interface IInitGetNewsItemTypeBlogDetailsTypeContentFail {
	type: NewsItemContextConstants.INIT_TYPE_BLOG_DETAILS_TYPE_CONTENT_CONTENT_FAIL;
	payload: { error: string };
}

export type TNewsItemContextReducerAction =
	| IInitGetNewsItemCommentsMainPending
	| IInitGetNewsItemCommentsMainSuccess
	| IInitGetNewsItemCommentsMainFail
	| IInitGetNewsItemTypeBlogDetailsTypeContentPending
	| IInitGetNewsItemTypeBlogDetailsTypeContentSuccess
	| IInitGetNewsItemTypeBlogDetailsTypeContentFail;

export type TNewsItemContextDispatch =
	| React.Dispatch<TNewsItemContextReducerAction>
	| ((value: TNewsItemContextReducerAction) => void);

export type TInitGetNewsItemCommentsMain = (
	newsDispatch: TNewsItemContextDispatch,
	{ urlOptions }: { urlOptions: IGetNewsItemCommentsReqArgs['urlOptions'] }
) => Promise<void>;
export type TInitGetNewsItemTypeBlogContent = (
	newsDispatch: TNewsItemContextDispatch,
	{ urlOptions }: { urlOptions: IGetNewsItemBlogContentReqArgs['urlOptions'] }
) => Promise<void>;
