import {
	INewsItemTypeBlogBasicData,
	INewsItemTypeBlogContent,
	INewsItemTypePostBasicData,
} from '@coreLib/ts/global.d';

/*  */
export interface IGetNewsReqArgs {
	urlOptions?: {
		queries: {
			filterByBlogTagsAnd?: string[];
			filterByBlogTagsOr?: string[];
			newsByUserId?: string;
			newsCreatedBefore?: string | number | Date;
			isNewsVotedByUser?: boolean;
			with_news_blog_content?: boolean;
		};
	};
}

/*  */
interface ICreateNewsItemReqArgsBodyContentTypeBlog {
	type: INewsItemTypeBlogBasicData['type'];
	type_data: {
		title: INewsItemTypeBlogBasicData['type_data']['title'];
		slug: INewsItemTypeBlogBasicData['type_data']['slug'];
		iso_language: INewsItemTypeBlogBasicData['type_data']['iso_language'];
		iso_country: INewsItemTypeBlogBasicData['type_data']['iso_country'];
		image_alt: INewsItemTypeBlogBasicData['type_data']['image_alt'];
		image_src: INewsItemTypeBlogBasicData['type_data']['image_src'];
		description: INewsItemTypeBlogBasicData['type_data']['description'];
		tags: INewsItemTypeBlogBasicData['type_data']['tags'];
		content: INewsItemTypeBlogContent;
	};
}
type ICreateNewsItemReqArgsBodyContentTypePost = INewsItemTypePostBasicData;
export interface ICreateNewsItemReqArgs {
	bodyContent: {
		newsItemBasicData:
			| ICreateNewsItemReqArgsBodyContentTypeBlog
			| ICreateNewsItemReqArgsBodyContentTypePost;
	};
	headersList: {
		Authorization?: string;
	};
}
