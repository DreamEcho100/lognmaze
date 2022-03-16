import {
	INewsItemBasicData,
	INewsItemTypeBlog,
	INewsItemTypeBlogContent,
	INewsItemTypePost,
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
	type: INewsItemTypeBlog['type'];
	title: INewsItemTypeBlog['type_data']['title'];
	slug: INewsItemTypeBlog['type_data']['slug'];
	iso_language: INewsItemTypeBlog['type_data']['iso_language'];
	iso_country: INewsItemTypeBlog['type_data']['iso_country'];
	image_alt: INewsItemTypeBlog['type_data']['image_alt'];
	image_src: INewsItemTypeBlog['type_data']['image_src'];
	description: INewsItemTypeBlog['type_data']['description'];
	tags: INewsItemTypeBlog['type_data']['tags'];
	content: INewsItemTypeBlogContent;
}
interface ICreateNewsItemReqArgsBodyContentTypePost {
	type: INewsItemTypePost['type'];
	content: INewsItemTypePost['type_data']['content'];
}
export interface ICreateNewsItemReqArgs {
	bodyContent?: {
		author_id: INewsItemBasicData['author_id'];
		author_user_name_id: INewsItemBasicData['author_user_name_id'];
		author_first_name: INewsItemBasicData['author_first_name'];
		author_last_name: INewsItemBasicData['author_last_name'];
		author_profile_picture: INewsItemBasicData['author_profile_picture'];
		author_bio: INewsItemBasicData['author_bio'];
		type_data:
			| ICreateNewsItemReqArgsBodyContentTypeBlog
			| ICreateNewsItemReqArgsBodyContentTypePost;
	};
	headersList: {
		Authorization?: string;
	};
}
