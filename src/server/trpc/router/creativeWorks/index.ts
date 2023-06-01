import { CreativeWorkStatus, CreativeWorkType } from '@prisma/client';

import {
	getCreativeWorkTypeBlogPostsData,
	getCreativeWorkTypeDiscussionForumsData,
	getCreativeWorkTypeDiscussionForumsPostsData,
	getCreativeWorkTypePostsData
} from '@server/utils/core/controllers';
import { router, publicProcedure } from '@server/trpc/trpc';

import type { TCreativeWorkTypeData } from '@ts/index';

import { z } from 'zod';

import { authorsRouter } from './authors';
import { blogPostsRouter } from './blogPosts';
import { drizzleClient } from '../../../utils/drizzle/orm';
import { inArray, lte } from 'drizzle-orm';
import drizzleSchema from '@server/utils/drizzle/schema';

export const creativeWorksRouter = router({
	getAll: publicProcedure
		.input(
			z.object({
				limit: z.number().min(10).max(100).optional().default(10),
				type: z
					.array(z.nativeEnum(CreativeWorkType))
					.optional()
					.default([CreativeWorkType.BLOG_POST, CreativeWorkType.POST]),
				cursor: z.date().optional(), // .maxDate(new Date())
				authorId: z.string().optional(),
				checkForPrivileges: z.boolean().optional(),
				blogPostsConfig: z
					.object({
						withConfig: z.boolean().optional()
					})
					.optional()
			})
		)
		.query(async ({ ctx, input }) => {
			const havePrivileges = (() => {
				return input.checkForPrivileges &&
					input.authorId === ctx.session?.user?.id
					? input.authorId
					: false;
			})();

			// console.log('\n\n\ncreativeWorks2\n');
			const creativeWorks2 =
				await ctx.drizzleClient.query.creativeWork.findMany({
					// columns: {},
					orderBy: (fields, { desc }) => desc(fields.createdAt),
					limit: input.limit + 1,
					where: (fields, { and, eq }) =>
						and(
							inArray(fields.type, input.type),
							!input.cursor ? undefined : lte(fields.createdAt, input.cursor),
							havePrivileges
								? inArray(fields.status, [
										CreativeWorkStatus.PRIVATE,
										CreativeWorkStatus.PUBLIC
								  ])
								: eq(fields.status, CreativeWorkStatus.PUBLIC),
							!input.authorId ? undefined : eq(fields.authorId, input.authorId)
						),
					with: {
						author: {
							columns: {
								name: true
							},
							with: {
								profile: {
									columns: {
										firstName: true,
										lastName: true,
										education: true,
										work: true,
										profilePicture: true
									}
								}
							}
						},
						blogPost: {
							where: (fields, { eq }) =>
								eq(drizzleSchema.creativeWork.type, CreativeWorkType.BLOG_POST),
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
							with: { languageTag: true }
						},
						post: {
							where: (fields, { eq }) =>
								eq(drizzleSchema.creativeWork.type, CreativeWorkType.POST),
							columns: {
								id: true,
								creativeWorkId: true,
								discussionForumId: true,
								content: true,
								updatedAt: true
							}
						}
					}
				});
			// console.log('\ncreativeWorks2\n\n\n');

			const creativeWorks = (await ctx.prisma.creativeWork.findMany({
				include: {
					tags: { select: { name: true } },
					author: {
						select: {
							name: true,
							profile: {
								select: {
									firstName: true,
									lastName: true,
									education: true,
									work: true,
									profilePicture: true
								}
							}
						}
					}
				},
				orderBy: { createdAt: 'desc' },
				take: input.limit + 1,
				where: {
					createdAt: { lte: input.cursor },
					type: { in: input.type },
					status: havePrivileges
						? { in: [CreativeWorkStatus.PRIVATE, CreativeWorkStatus.PUBLIC] }
						: CreativeWorkStatus.PUBLIC,
					authorId: input.authorId
				}
			})) as TCreativeWorkTypeData[];

			const blogPostsCreativeWorkIds: string[] = [];
			const postsCreativeWorkIds: string[] = [];
			const discussionForumsCreativeWorkIds: string[] = [];
			const discussionForumsPostsCreativeWorkIds: string[] = [];

			let isLastPage = false;
			let nextCursor: Date | undefined;
			if (creativeWorks.length > input.limit) {
				const nextItem = creativeWorks.pop();
				nextCursor = nextItem?.createdAt;
			} else isLastPage = true;

			const id_creativeWorkIndex_map: Record<string, number> = {};

			creativeWorks.forEach((item, index) => {
				id_creativeWorkIndex_map[item.id] = index;

				switch (item.type) {
					case CreativeWorkType.BLOG_POST:
						return blogPostsCreativeWorkIds.push(item.id);

					case CreativeWorkType.POST:
						return postsCreativeWorkIds.push(item.id);

					case CreativeWorkType.DISCUSSION_FORUM:
						return discussionForumsCreativeWorkIds.push(item.id);

					case CreativeWorkType.DISCUSSION_FORUM_POST:
						return discussionForumsPostsCreativeWorkIds.push(item.id);
				}
			});

			await Promise.all([
				blogPostsCreativeWorkIds &&
					getCreativeWorkTypeBlogPostsData(
						//ctx.prisma,
						ctx,
						{
							authorId: havePrivileges,
							blogPostsCreativeWorkIds,
							withContent: input.blogPostsConfig?.withConfig
						}
					).then((typeData) => ({
						type: CreativeWorkType.BLOG_POST,
						typeData
					})),
				postsCreativeWorkIds &&
					getCreativeWorkTypePostsData(ctx, {
						authorId: havePrivileges,
						postsCreativeWorkIds
					}).then((typeData) => ({
						type: CreativeWorkType.POST,
						typeData
					})),
				discussionForumsCreativeWorkIds &&
					getCreativeWorkTypeDiscussionForumsData(ctx, {
						authorId: havePrivileges,
						discussionForumsCreativeWorkIds
					}).then((typeData) => ({
						type: CreativeWorkType.DISCUSSION_FORUM,
						typeData
					})),
				discussionForumsPostsCreativeWorkIds &&
					getCreativeWorkTypeDiscussionForumsPostsData(ctx, {
						authorId: havePrivileges,
						discussionForumsPostsCreativeWorkIds
					}).then((typeData) => ({
						type: CreativeWorkType.DISCUSSION_FORUM_POST,
						typeData
					}))
			]).then((result) => {
				result.forEach((item) => {
					item.typeData.forEach((subItem) => {
						const targetedCreativeWorkIndex =
							id_creativeWorkIndex_map[subItem.creativeWorkId];

						if (typeof targetedCreativeWorkIndex === 'number') {
							const targetedCreativeWork =
								creativeWorks[targetedCreativeWorkIndex];
							if (
								targetedCreativeWork &&
								item.type === targetedCreativeWork.type
							)
								targetedCreativeWork.typeData = subItem;
						}
					});
				});
			});

			return {
				items: creativeWorks,
				nextCursor,
				isLastPage
			};
		}),
	authors: authorsRouter,
	blogPosts: blogPostsRouter
});
