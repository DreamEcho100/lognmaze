import {
	CreativeWorkStatus,
	CreativeWorkType,
	type PrismaClient
} from '@prisma/client';
import drizzleSchema from '@server/utils/drizzle/schema';
import { type DrizzleClient } from '@server/utils/drizzle/next-auth-neon-adapter';
import { eq, inArray } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';

const creativeWorkType_TagBasicStatisticsName_Map = {
	[CreativeWorkType.BLOG_POST]: 'blogPostsCount',
	[CreativeWorkType.POST]: 'postsCount',
	[CreativeWorkType.DISCUSSION_FORUM]: 'discussionForumsCount',
	[CreativeWorkType.DISCUSSION_FORUM_POST]: 'discussionForumPostsCount'
} as const;

export const getCreativeWorkTypeBlogPostsData = async (
	ctx: { drizzleClient: DrizzleClient },
	// prisma: PrismaClient;
	input: {
		blogPostsCreativeWorkIds: string[];
		authorId?: string | false;
		withContent?: boolean;
	}
) => {
	// const data = await ctx.prisma.blogPost.findMany({
	// 	select: {
	// 		id: true,
	// 		title: true,
	// 		content: !!input.withContent,
	// 		updatedAt: true,
	// 		creativeWorkId: true,
	// 		description: true,
	// 		discussionForumId: true,
	// 		languageTagId: true,
	// 		slug: true,
	// 		thumbnailUrl: true,
	// 		languageTag: true
	// 	},
	// 	orderBy: { creativeWork: { createdAt: 'desc' } },
	// 	where: {
	// 		creativeWorkId: { in: input.blogPostsCreativeWorkIds },
	// 		AND: {
	// 			creativeWork: {
	// 				status: input.authorId
	// 					? { in: [CreativeWorkStatus.PUBLIC, CreativeWorkStatus.PRIVATE] }
	// 					: CreativeWorkStatus.PUBLIC
	// 			}
	// 		}
	// 	},
	// 	take: input.blogPostsCreativeWorkIds.length
	// });

	const data = await ctx.drizzleClient.query.blogPost.findMany({
		where: (blogPost) =>
			!input.blogPostsCreativeWorkIds ||
			input.blogPostsCreativeWorkIds.length === 0
				? undefined
				: inArray(blogPost.creativeWorkId, input.blogPostsCreativeWorkIds),
		columns: {
			id: true,
			title: true,
			// content: true, // !!input.withContent,
			updatedAt: true,
			creativeWorkId: true,
			description: true,
			discussionForumId: true,
			languageTagId: true,
			slug: true,
			thumbnailUrl: true
		},
		with: {
			creativeWork: {
				columns: { id: true },
				where: (creativeWork, { eq }) =>
					eq(creativeWork.status, CreativeWorkStatus.PUBLIC)
			},
			languageTag: true
		}
	});

	if (data.some((item) => !item.creativeWork?.id))
		throw new TRPCError({ code: 'NOT_FOUND' });

	return data;
};

export const getCreativeWorkTypePostsData = async (
	ctx: { drizzleClient: DrizzleClient },
	// prisma: PrismaClient,
	input: {
		postsCreativeWorkIds: string[];
		authorId?: string | false;
	}
) => {
	// return await prisma.post.findMany({
	// 	orderBy: { creativeWork: { createdAt: 'desc' } },
	// 	where: {
	// 		creativeWorkId: { in: input.postsCreativeWorkIds },
	// 		AND: {
	// 			creativeWork: {
	// 				status: input.authorId
	// 					? { in: [CreativeWorkStatus.PUBLIC, CreativeWorkStatus.PRIVATE] }
	// 					: CreativeWorkStatus.PUBLIC
	// 			}
	// 		}
	// 	},
	// 	take: input.postsCreativeWorkIds.length,
	// });

	const data = await ctx.drizzleClient.query.post.findMany({
		where: (post, { and }) =>
			!input.postsCreativeWorkIds || input.postsCreativeWorkIds.length === 0
				? undefined
				: inArray(post.creativeWorkId, input.postsCreativeWorkIds),
		columns: {
			id: true,
			creativeWorkId: true,
			discussionForumId: true,
			content: true,
			updatedAt: true
		},
		with: {
			creativeWork: {
				columns: { id: true },
				where: (creativeWork, { eq }) =>
					eq(creativeWork.status, CreativeWorkStatus.PUBLIC)
			}
		}
	});

	if (data.some((item) => !item.creativeWork?.id))
		throw new TRPCError({ code: 'NOT_FOUND' });

	return data;
};

export const getCreativeWorkTypeDiscussionForumsData = async (
	ctx: { drizzleClient: DrizzleClient },
	input: {
		discussionForumsCreativeWorkIds: string[];
		authorId?: string | false;
	}
) => {
	// return await prisma.discussionForum.findMany({
	// 	orderBy: { creativeWork: { createdAt: 'desc' } },
	// 	where: {
	// 		creativeWorkId: { in: input.discussionForumsCreativeWorkIds },
	// 		AND: {
	// 			creativeWork: {
	// 				status: input.authorId
	// 					? { in: [CreativeWorkStatus.PUBLIC, CreativeWorkStatus.PRIVATE] }
	// 					: CreativeWorkStatus.PUBLIC
	// 			}
	// 		}
	// 	},
	// 	take: input.discussionForumsCreativeWorkIds.length
	// });

	const data = await ctx.drizzleClient.query.discussionForum.findMany({
		where: (discussionForum, { and }) =>
			!input.discussionForumsCreativeWorkIds ||
			input.discussionForumsCreativeWorkIds.length === 0
				? undefined
				: inArray(
						discussionForum.creativeWorkId,
						input.discussionForumsCreativeWorkIds
				  ),
		columns: {
			id: true,
			creativeWorkId: true,
			size: true,
			updatedAt: true
		},
		with: {
			creativeWork: {
				columns: { id: true },
				where: (creativeWork, { eq }) =>
					eq(creativeWork.status, CreativeWorkStatus.PUBLIC)
			}
		}
	});

	if (data.some((item) => !item.creativeWork?.id))
		throw new TRPCError({ code: 'NOT_FOUND' });

	return data;
};

export const getCreativeWorkTypeDiscussionForumsPostsData = async (
	ctx: { drizzleClient: DrizzleClient },
	input: {
		discussionForumsPostsCreativeWorkIds: string[];
		authorId?: string | false;
	}
) => {
	// return await prisma.discussionForumPost.findMany({
	// 	orderBy: { creativeWork: { createdAt: 'desc' } },
	// 	where: {
	// 		creativeWorkId: { in: input.discussionForumsPostsCreativeWorkIds },
	// 		AND: {
	// 			creativeWork: {
	// 				status: input.authorId
	// 					? { in: [CreativeWorkStatus.PUBLIC, CreativeWorkStatus.PRIVATE] }
	// 					: CreativeWorkStatus.PUBLIC
	// 			}
	// 		}
	// 	},
	// 	take: input.discussionForumsPostsCreativeWorkIds.length
	// });

	const data = await ctx.drizzleClient.query.discussionForumPost.findMany({
		where: (discussionForumPost, { and }) =>
			!input.discussionForumsPostsCreativeWorkIds ||
			input.discussionForumsPostsCreativeWorkIds.length === 0
				? undefined
				: inArray(
						discussionForumPost.creativeWorkId,
						input.discussionForumsPostsCreativeWorkIds
				  ),
		columns: {
			id: true,
			creativeWorkId: true,
			discussionForumId: true,
			content: true,
			updatedAt: true
		},
		with: {
			creativeWork: {
				columns: { id: true },
				where: (creativeWork, { eq }) =>
					eq(creativeWork.status, CreativeWorkStatus.PUBLIC)
			}
		}
	});

	if (data.some((item) => !item.creativeWork?.id))
		throw new TRPCError({ code: 'NOT_FOUND' });

	return data;
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
						Stats: {
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
		prisma.tagStats.updateMany({
			data: {
				[creativeWorkType_TagBasicStatisticsName_Map[input.creativeWorkType]]: {
					increment: 1
				}
			},
			where: { tagName: { in: input.addedTags.map((tag) => tag) } }
		});

	if (input.removedTags && input.removedTags.length !== 0)
		prisma.tagStats.updateMany({
			data: {
				[creativeWorkType_TagBasicStatisticsName_Map[input.creativeWorkType]]: {
					decrement: 1
				}
			},
			where: { tagName: { in: input.removedTags.map((tag) => tag) } }
		});

	return data;
};
