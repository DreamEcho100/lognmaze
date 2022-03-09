import {
	INewsBasicData,
	INewsBlogData,
	INewsBlogDataTypeDataContent,
	INewsPostData,
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
	type: INewsBlogData['type'];
	title: INewsBlogData['type_data']['title'];
	slug: INewsBlogData['type_data']['slug'];
	iso_language: INewsBlogData['type_data']['iso_language'];
	iso_country: INewsBlogData['type_data']['iso_country'];
	image_alt: INewsBlogData['type_data']['image_alt'];
	image_src: INewsBlogData['type_data']['image_src'];
	description: INewsBlogData['type_data']['description'];
	tags: INewsBlogData['type_data']['tags'];
	content: INewsBlogDataTypeDataContent;
}
interface ICreateNewsItemReqArgsBodyContentTypePost {
	type: INewsPostData['type'];
	content: INewsPostData['type_data']['content'];
}
export interface ICreateNewsItemReqArgs {
	bodyContent?: {
		author_id: INewsBasicData['author_id'];
		author_user_name_id: INewsBasicData['author_user_name_id'];
		author_first_name: INewsBasicData['author_first_name'];
		author_last_name: INewsBasicData['author_last_name'];
		author_profile_picture: INewsBasicData['author_profile_picture'];
		author_bio: INewsBasicData['author_bio'];
		type_data:
			| ICreateNewsItemReqArgsBodyContentTypeBlog
			| ICreateNewsItemReqArgsBodyContentTypePost;
	};
	headersList: {
		Authorization?: string;
	};
}
