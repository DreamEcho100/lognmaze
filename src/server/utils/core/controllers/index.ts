import {
	CreativeWorkStatus,
	CreativeWorkType,
	type PrismaClient
} from '@prisma/client/edge';

const creativeWorkType_TagBasicStatisticsName_Map = {
	[CreativeWorkType.BLOG_POST]: 'blogPostsCount',
	[CreativeWorkType.POST]: 'postsCount',
	[CreativeWorkType.DISCUSSION_FORUM]: 'discussionForumsCount',
	[CreativeWorkType.DISCUSSION_FORUM_POST]: 'discussionForumPostsCount'
} as const;

export const getCreativeWorkTypeBlogPostsData = async (
	prisma: PrismaClient,
	input: {
		blogPostsCreativeWorkIds: string[];
		authorId?: string | false;
		withContent?: boolean;
	}
) => {
	const data = await prisma.blogPost.findMany({
		select: {
			id: true,
			title: true,
			content: !!input.withContent,
			updatedAt: true,
			creativeWorkId: true,
			description: true,
			discussionForumId: true,
			languageTagId: true,
			slug: true,
			thumbnailUrl: true,
			languageTag: true
		},
		orderBy: { creativeWork: { createdAt: 'desc' } },
		where: {
			creativeWorkId: { in: input.blogPostsCreativeWorkIds },
			AND: {
				creativeWork: {
					status: input.authorId
						? { in: [CreativeWorkStatus.PUBLIC, CreativeWorkStatus.PRIVATE] }
						: CreativeWorkStatus.PUBLIC
				}
			}
		},
		take: input.blogPostsCreativeWorkIds.length
	});

	return data as (Omit<typeof data[0], 'content'> & {
		content?: typeof data[0]['content'];
	})[];
};

export const getCreativeWorkTypePostsData = async (
	prisma: PrismaClient,
	input: {
		postsCreativeWorkIds: string[];
		authorId?: string | false;
	}
) => {
	return await prisma.post.findMany({
		orderBy: { creativeWork: { createdAt: 'desc' } },
		where: {
			creativeWorkId: { in: input.postsCreativeWorkIds },
			AND: {
				creativeWork: {
					status: input.authorId
						? { in: [CreativeWorkStatus.PUBLIC, CreativeWorkStatus.PRIVATE] }
						: CreativeWorkStatus.PUBLIC
				}
			}
		},
		take: input.postsCreativeWorkIds.length
	});
};

export const getCreativeWorkTypeDiscussionForumsData = async (
	prisma: PrismaClient,
	input: {
		discussionForumsCreativeWorkIds: string[];
		authorId?: string | false;
	}
) => {
	return await prisma.discussionForum.findMany({
		orderBy: { creativeWork: { createdAt: 'desc' } },
		where: {
			creativeWorkId: { in: input.discussionForumsCreativeWorkIds },
			AND: {
				creativeWork: {
					status: input.authorId
						? { in: [CreativeWorkStatus.PUBLIC, CreativeWorkStatus.PRIVATE] }
						: CreativeWorkStatus.PUBLIC
				}
			}
		},
		take: input.discussionForumsCreativeWorkIds.length
	});
};

export const getCreativeWorkTypeDiscussionForumsPostsData = async (
	prisma: PrismaClient,
	input: {
		discussionForumsPostsCreativeWorkIds: string[];
		authorId?: string | false;
	}
) => {
	return await prisma.discussionForumPost.findMany({
		orderBy: { creativeWork: { createdAt: 'desc' } },
		where: {
			creativeWorkId: { in: input.discussionForumsPostsCreativeWorkIds },
			AND: {
				creativeWork: {
					status: input.authorId
						? { in: [CreativeWorkStatus.PUBLIC, CreativeWorkStatus.PRIVATE] }
						: CreativeWorkStatus.PUBLIC
				}
			}
		},
		take: input.discussionForumsPostsCreativeWorkIds.length
	});
};

export const updateCreativeWorkTags = async (
	prisma: PrismaClient,
	input: {
		creativeWorkType: CreativeWorkType;
		creativeWorkId: string;
		addedTags?: string[];
		removedTags?: string[];
	}
) => {
	const data = await prisma.creativeWork.update({
		where: { id: input.creativeWorkId },
		data: {
			tags: {
				connectOrCreate: input.addedTags?.map((tag) => ({
					create: {
						name: tag,
						basicStatistics: {
							connectOrCreate: { create: {}, where: { tagName: tag } }
						}
					},
					where: { name: tag }
				})),
				disconnect: input.removedTags?.map((tag) => ({ name: tag }))
			}
		},
		select: { tags: true }
	});

	if (input.addedTags && input.addedTags.length !== 0)
		prisma.tagBasicStatistics.updateMany({
			data: {
				[creativeWorkType_TagBasicStatisticsName_Map[input.creativeWorkType]]: {
					increment: 1
				}
			},
			where: { tagName: { in: input.addedTags.map((tag) => tag) } }
		});

	if (input.removedTags && input.removedTags.length !== 0)
		prisma.tagBasicStatistics.updateMany({
			data: {
				[creativeWorkType_TagBasicStatisticsName_Map[input.creativeWorkType]]: {
					decrement: 1
				}
			},
			where: { tagName: { in: input.removedTags.map((tag) => tag) } }
		});

	return data;
};
