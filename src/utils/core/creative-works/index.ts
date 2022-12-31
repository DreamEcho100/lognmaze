import type {
	TCreativeWorkTypeData,
	TCreativeWorkPost,
	TCreativeWorkBlogPost
} from '@ts/index';

export const isCreativeWorAPost = (
	data: TCreativeWorkTypeData
): data is TCreativeWorkPost => data.type === 'POST';

export const isCreativeWorABlogPost = (
	data: TCreativeWorkTypeData
): data is TCreativeWorkBlogPost => data.type === 'BLOG_POST';
