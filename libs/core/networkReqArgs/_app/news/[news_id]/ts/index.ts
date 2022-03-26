import {
	INewsItemTypeBlog,
	INewsItemTypeBlogContent,
	INewsItemTypePost,
} from '@coreLib/ts/global.d';

/* */
export interface IUpdateNewsItemReqArgsPropsBodyContentTypeBlog {
	type: INewsItemTypeBlog['type'];
	dataToUpdate: {
		title?: INewsItemTypeBlog['type_data']['title'];
		iso_language?: INewsItemTypeBlog['type_data']['iso_language'];
		iso_country?: INewsItemTypeBlog['type_data']['iso_country'];
		image_alt?: INewsItemTypeBlog['type_data']['image_alt'];
		image_src?: INewsItemTypeBlog['type_data']['image_src'];
		description?: INewsItemTypeBlog['type_data']['description'];
		tags?: {
			added?: INewsItemTypeBlog['type_data']['tags'];
			removed?: INewsItemTypeBlog['type_data']['tags'];
		};
		content?: INewsItemTypeBlogContent;
	};
}
export interface IUpdateNewsItemReqArgsPropsBodyContentTypePost {
	type: INewsItemTypePost['type'];
	dataToUpdate: {
		content?: INewsItemTypePost['type_data']['content'];
	};
}
export interface IUpdateNewsItemReqArgs {
	bodyContent:
		| IUpdateNewsItemReqArgsPropsBodyContentTypeBlog
		| IUpdateNewsItemReqArgsPropsBodyContentTypePost;
	headersList: {
		Authorization?: string;
	};
	urlOptions: {
		params: {
			news_id: string;
		};
	};
}

/* */
export interface IDeleteNewsItemReqArgs {
	headersList: {
		Authorization?: string;
	};
	urlOptions: {
		params: {
			news_id: string;
		};
	};
	bodyContent: {
		type: INewsItemTypeBlog['type'] | INewsItemTypePost['type'];
	};
}
