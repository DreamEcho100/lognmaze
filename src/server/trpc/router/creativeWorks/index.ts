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
import { and, desc, eq, getTableColumns, sql, inArray, lte } from 'drizzle-orm';
import drizzleSchema from '@server/utils/drizzle/schema';
import { omitObjByKeys } from '@utils/common/ds/objects';

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

			if (process.env.NODE_ENV === 'development') {
				console.log('\n\ncreativeWorks\n');
				/*
				// const creativeWorks2 =
				// 	await ctx.drizzleClient.query.creativeWork.findMany({
				// 		// columns: {},
				// 		orderBy: (fields, { desc }) => desc(fields.createdAt),
				// 		limit: input.limit + 1,
				// 		where: (fields, { and, eq }) =>
				// 			and(
				// 				inArray(fields.type, input.type),
				// 				!input.cursor ? undefined : lte(fields.createdAt, input.cursor),
				// 				havePrivileges
				// 					? inArray(fields.status, [
				// 							CreativeWorkStatus.PRIVATE,
				// 							CreativeWorkStatus.PUBLIC
				// 					  ])
				// 					: eq(fields.status, CreativeWorkStatus.PUBLIC),
				// 				!input.authorId
				// 					? undefined
				// 					: eq(fields.authorId, input.authorId)
				// 			),
				// 		with: {
				// 			author: {
				// 				columns: {
				// 					name: true
				// 				},
				// 				with: {
				// 					profile: {
				// 						columns: {
				// 							firstName: true,
				// 							lastName: true,
				// 							education: true,
				// 							work: true,
				// 							profilePicture: true
				// 						}
				// 					}
				// 				}
				// 			},
				// 			blogPost: {
				// 				where: (fields, { eq, sql }) =>
				// 					sql`"type" = ${CreativeWorkType.BLOG_POST}`, // eq(drizzleSchema.creativeWork.type, CreativeWorkType.BLOG_POST),

				// 				columns: {
				// 					id: true,
				// 					title: true,
				// 					// content: true, // !!input.withContent,
				// 					updatedAt: true,
				// 					creativeWorkId: true,
				// 					description: true,
				// 					discussionForumId: true,
				// 					languageTagId: true,
				// 					slug: true,
				// 					thumbnailUrl: true
				// 				},
				// 				with: { languageTag: true }
				// 			},
				// 			post: {
				// 				where: (fields, { eq, sql }) =>
				// 					sql`"type" = ${CreativeWorkType.POST}`, // eq(drizzleSchema.creativeWork.type, CreativeWorkType.POST),
				// 				columns: {
				// 					id: true,
				// 					creativeWorkId: true,
				// 					discussionForumId: true,
				// 					content: true,
				// 					updatedAt: true
				// 				}
				// 			}
				// 		}
				// 	});
				// const profile = ctx.drizzleClient
				// 	.select()
				// 	.from(drizzleSchema.userProfile)
				// 	.as('profile');
				const author = ctx.drizzleClient
					.select()
					.from(drizzleSchema.user)
					// .innerJoin(profile, eq(profile.userId, drizzleSchema.user.id))
					.as('author');
				const languageTag = ctx.drizzleClient
					.select()
					.from(drizzleSchema.languageTag)
					.groupBy(drizzleSchema.languageTag.name)
					.as('languageTag');
				const blogPost = ctx.drizzleClient
					.select
					// {
					// 	// id: drizzleSchema.blogPost.id,
					// 	title: drizzleSchema.blogPost.title,
					// 	// content: drizzleSchema.blogPost.//, // !!input.withContent,
					// 	updatedAt: drizzleSchema.blogPost.updatedAt,
					// 	creativeWorkId: drizzleSchema.blogPost.creativeWorkId,
					// 	description: drizzleSchema.blogPost.description,
					// 	discussionForumId: drizzleSchema.blogPost.discussionForumId,
					// 	languageTagId: drizzleSchema.blogPost.languageTagId,
					// 	slug: drizzleSchema.blogPost.slug,
					// 	thumbnailUrl: drizzleSchema.blogPost.thumbnailUrl,
					// 	languageTag: {
					// 		// id: languageTag.id,
					// 		code: languageTag.code,
					// 		name: languageTag.name,
					// 		countryCode: languageTag.countryCode,
					// 		region: languageTag.region,
					// 		// description: languageTag.description,
					// 		type: languageTag.type,
					// 	}
					// }
					()
					.from(drizzleSchema.blogPost)
					.leftJoin(
						languageTag,
						eq(languageTag.id, drizzleSchema.blogPost.languageTagId)
						// sql`languageTag->id = blogPost -> languageTagId`
					)
					.groupBy(drizzleSchema.blogPost.id)
					.as('blogPost');
				const post = ctx.drizzleClient
					.select()
					.from(drizzleSchema.post)
					.as('post');

				const creativeWorks = await ctx.drizzleClient
					.select
					// {
					// id: drizzleSchema.creativeWork.id,
					// // blogPost: blogPost._.selectedFields //omitObjByKeys(blogPost, ['_'])
					// blogPost: {
					// 	// id: blogPost.id,
					// 	title: blogPost.title,
					// 	updatedAt: blogPost.updatedAt,
					// 	creativeWorkId: blogPost.creativeWorkId,
					// 	description: blogPost.description,
					// 	discussionForumId: blogPost.discussionForumId,
					// 	languageTagId: blogPost.languageTagId,
					// 	slug: blogPost.slug,
					// 	thumbnailUrl: blogPost.thumbnailUrl
					// }
					// }
					()
					.from(drizzleSchema.creativeWork)
					.innerJoin(author, eq(author.id, drizzleSchema.creativeWork.authorId))
					.leftJoin(
						blogPost,
						and(
							eq(
								blogPost.BlogPost.creativeWorkId,
								drizzleSchema.creativeWork.id
							),
							eq(drizzleSchema.creativeWork.type, CreativeWorkType.BLOG_POST)
						)
					)
					.leftJoin(
						post,
						and(
							eq(post.creativeWorkId, drizzleSchema.creativeWork.id),
							eq(drizzleSchema.creativeWork.type, CreativeWorkType.POST)
						)
					)
					.where(
						and(
							inArray(drizzleSchema.creativeWork.type, input.type),
							!input.cursor
								? undefined
								: lte(drizzleSchema.creativeWork.createdAt, input.cursor),
							havePrivileges
								? inArray(drizzleSchema.creativeWork.status, [
										CreativeWorkStatus.PRIVATE,
										CreativeWorkStatus.PUBLIC
								  ])
								: eq(
										drizzleSchema.creativeWork.status,
										CreativeWorkStatus.PUBLIC
								  ),
							!input.authorId
								? undefined
								: eq(drizzleSchema.creativeWork.authorId, input.authorId)
						)
					)
					.orderBy(desc(drizzleSchema.creativeWork.createdAt))
					.limit(1);
				*/

				/*
					const creativeWorks = await	ctx.drizzleClient.query.creativeWork.findMany({
					// columns: {},
						extras: {
							ct: sql`"creativeWork"."type"`.as('ct')
						},
					orderBy: (fields, { desc }) => desc(fields.createdAt),
					// limit: input.limit + 1,
					limit: 1,
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
							!input.authorId
								? undefined
								: eq(fields.authorId, input.authorId)
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
							where: (fields, { eq, sql }) =>
								sql.raw(`ct = '${CreativeWorkType.BLOG_POST}'`), // eq(drizzleSchema.creativeWork.type, CreativeWorkType.BLOG_POST),

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
							where: (fields, { eq, sql }) =>
								sql.raw(`ct = '${CreativeWorkType.POST}'`), // eq(drizzleSchema.creativeWork.type, CreativeWorkType.POST),
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
				*/

				const blogPostColumns = omitObjByKeys(
					getTableColumns(drizzleSchema.blogPost),
					['content']
				);
				// const postColumns = getTableColumns(drizzleSchema.post);
				const authorColumns = getTableColumns(drizzleSchema.user);

				const profile = ctx.drizzleClient
					.select()
					.from(drizzleSchema.userProfile)
					.as('profile');
					const author = ctx.drizzleClient
						.select(authorColumns)
						.from(drizzleSchema.user)
						.innerJoin(
							profile,
							eq(profile.userId, drizzleSchema.user.id)
						)
						.as('author');
					
				const languageTag = ctx.drizzleClient
				.select()
				.from(drizzleSchema.languageTag)
				.as('languageTag');
				const blogPost = ctx.drizzleClient
					.select(
						blogPostColumns
						// 	{
						// 	...blogPostColumns,
						// 	// languageTag: { id:languageTag.id }
						// 	// {
						// 	// 	// 		id: languageTag.id,
						// 	// 	// 		code: languageTag.code,
						// 	// 	// 		name: languageTag.name,
						// 	// 	// 		countryCode: languageTag.countryCode,
						// 	// 	// 		region: languageTag.region,
						// 	// 	// 		// description: languageTag.description,
						// 	// 	// 		type: languageTag.type,
						// 	// }
						// }
					)
					.from(drizzleSchema.blogPost)
					.innerJoin(
						languageTag,
						eq(languageTag.id, drizzleSchema.blogPost.languageTagId)
					)
					.as('blogPost');
				const post = ctx.drizzleClient
					.select()
					.from(drizzleSchema.post)
					.as('post');
				// .where(
				// 	and(
				// 		eq(
				// 			drizzleSchema.blogPost.creativeWorkId,
				// 			drizzleSchema.creativeWork.id
				// 		),
				// 		eq(drizzleSchema.creativeWork.type, CreativeWorkType.BLOG_POST)
				// 	)
				// )
				const creativeWorks = await ctx.drizzleClient
					.select()
					.from(drizzleSchema.creativeWork)
					.innerJoin(
						author,
						eq(author.id, drizzleSchema.creativeWork.authorId),
					)
					.leftJoin(
						blogPost,
						and(
							eq(blogPost.creativeWorkId, drizzleSchema.creativeWork.id),
							eq(drizzleSchema.creativeWork.type, CreativeWorkType.BLOG_POST)
						)
					)
					.leftJoin(
						post,
						and(
							eq(post.creativeWorkId, drizzleSchema.creativeWork.id),
							eq(drizzleSchema.creativeWork.type, CreativeWorkType.POST)
						)
					)
					.where(
						and(
							inArray(drizzleSchema.creativeWork.type, input.type),
							!input.cursor
								? undefined
								: lte(drizzleSchema.creativeWork.createdAt, input.cursor),
							havePrivileges
								? inArray(drizzleSchema.creativeWork.status, [
										CreativeWorkStatus.PRIVATE,
										CreativeWorkStatus.PUBLIC
								  ])
								: eq(
										drizzleSchema.creativeWork.status,
										CreativeWorkStatus.PUBLIC
								  ),
							!input.authorId
								? undefined
								: eq(drizzleSchema.creativeWork.authorId, input.authorId)
						)
					)
					.orderBy(desc(drizzleSchema.creativeWork.createdAt))
					.limit(input.limit + 1);
				console.log(JSON.stringify(creativeWorks, null, 2));
				console.log('creativeWorks\n\n\n');
			}

			// return {
			// 	items: [],
			// 	nextCursor: null,
			// 	isLastPage: false
			// };

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
