import type {
	CreativeWork,
	CreativeWorkType,
	User,
	UserProfile
} from '@prisma/client';

import type {
	getCreativeWorkTypeBlogPostsData,
	getCreativeWorkTypePostsData,
	getCreativeWorkTypeDiscussionForumsData,
	getCreativeWorkTypeDiscussionForumsPostsData
} from '@server/utils/core/controllers';

export type TCreativeWorkBlogPostTypeData = {
	type: typeof CreativeWorkType.BLOG_POST;
	typeData: Awaited<ReturnType<typeof getCreativeWorkTypeBlogPostsData>>['0'];
};
export type TCreativeWorkPostTypeData = {
	type: typeof CreativeWorkType.POST;
	typeData: Awaited<ReturnType<typeof getCreativeWorkTypePostsData>>['0'];
};
export type TCreativeWorkDiscussionForumTypeData = {
	type: typeof CreativeWorkType.POST;
	typeData: Awaited<
		ReturnType<typeof getCreativeWorkTypeDiscussionForumsData>
	>['0'];
};
export type TCreativeWorkDiscussionForumPostTypeData = {
	type: typeof CreativeWorkType.POST;
	typeData: Awaited<
		ReturnType<typeof getCreativeWorkTypeDiscussionForumsPostsData>
	>['0'];
};
export type TCreativeWorkNoTypeData = {
	type: CreativeWorkType;
	typeData: undefined;
};

export type TCreativeWork = Omit<CreativeWork, 'type'> & {
	tags: {
		name: string;
	}[];
	author: {
		name: User['name'];
		profile: {
			firstName: UserProfile['firstName'];
			lastName: UserProfile['lastName'];
			education: UserProfile['education'];
			work: UserProfile['work'];
			profilePicture: UserProfile['profilePicture'];
		} | null;
	} | null;
};

export type TCreativeWorkBlogPost = TCreativeWork &
	TCreativeWorkBlogPostTypeData;

export type TCreativeWorkPost = TCreativeWork & TCreativeWorkPostTypeData;

export type TCreativeWorkDiscussionForum = TCreativeWork &
	TCreativeWorkDiscussionForumTypeData;

export type TCreativeWorkDiscussionForumPost = TCreativeWork &
	TCreativeWorkDiscussionForumPostTypeData;

export type TCreativeWorkNoType = TCreativeWork & TCreativeWorkNoTypeData;

export type TCreativeWorkTypeData =
	| TCreativeWorkBlogPost
	| TCreativeWorkPost
	| TCreativeWorkDiscussionForum
	| TCreativeWorkDiscussionForumPost
	| TCreativeWorkNoType;
