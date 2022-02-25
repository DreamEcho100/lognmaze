import {
	INewsBlogData,
	INewsBlogDataTypeDataContent,
	INewsPostData,
} from '@coreLib/ts/global.d';

/* */
interface IUpdateNewsItemReqArgsPropsBodyContentTypeBlog {
	type: INewsBlogData['type'];
	dataToUpdate: {
		title?: INewsBlogData['type_data']['title'];
		iso_language?: INewsBlogData['type_data']['iso_language'];
		iso_country?: INewsBlogData['type_data']['iso_country'];
		image_alt?: INewsBlogData['type_data']['image_alt'];
		image_src?: INewsBlogData['type_data']['image_src'];
		description?: INewsBlogData['type_data']['description'];
		tags?: {
			added?: INewsBlogData['type_data']['tags'];
			removed?: INewsBlogData['type_data']['tags'];
		};
		content?: INewsBlogDataTypeDataContent;
	};
}
interface IUpdateNewsItemReqArgsPropsBodyContentTypePost {
	type: INewsPostData['type'];
	dataToUpdate: {
		content: INewsPostData['type_data']['content'];
	};
}
export interface IUpdateNewsItemReqArgs {
	bodyContent:
		| IUpdateNewsItemReqArgsPropsBodyContentTypeBlog
		| IUpdateNewsItemReqArgsPropsBodyContentTypePost;
	headersList: {
		Authorization: string;
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
		Authorization: string;
	};
	urlOptions: {
		params: {
			news_id: string;
		};
	};
	bodyContent: {
		type: INewsBlogData['type'] | INewsPostData['type'];
	};
}
