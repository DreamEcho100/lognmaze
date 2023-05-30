import { CreativeWorkStatus, CreativeWorkType } from '@prisma/client';

import {
	router,
	publicProcedure,
	checkIfIsAuthor,
	CheckIfUserInSessionExist
} from '@server/trpc/trpc';
import type { TCreativeWorkBlogPost } from '@ts/index';

import { TRPCError } from '@trpc/server';

import { z } from 'zod';

export const blogPostsRouter = router({
	getOne: publicProcedure
		.input(
			z.object({
				creativeWorkId: z.string(),
				withContent: z.boolean().optional(),
				authorId: z.string().optional(),
				checkIfIsAuthor: z.boolean().optional()
			})
		)
		.query(async ({ ctx, input }) => {
			const isAuthor = input.checkIfIsAuthor
				? checkIfIsAuthor({
						input: input,
						session: CheckIfUserInSessionExist(ctx.session)
				  })
				: false;

			const _data = await ctx.prisma.creativeWork.findFirstOrThrow({
				include: {
					tags: true,
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
					},
					blogPost: {
						select: {
							languageTagId: true,
							content: input.withContent,
							creativeWorkId: true,
							description: true,
							slug: true,
							thumbnailUrl: true,
							title: true,
							updatedAt: true,
							id: true,
							languageTag: true,
							discussionForumId: true
						}
					}
				},
				where: {
					id: input.creativeWorkId,
					AND: {
						authorId: isAuthor ? isAuthor.input.authorId : undefined,
						status: isAuthor
							? { not: CreativeWorkStatus.DELETED }
							: CreativeWorkStatus.PUBLIC,
						type: CreativeWorkType.BLOG_POST
					}
				}
			});

			const { blogPost, author, ...data } = _data;

			if (!blogPost) throw new TRPCError({ code: 'BAD_REQUEST' });

			return {
				...data,
				type: CreativeWorkType.BLOG_POST,
				author,
				typeData: blogPost
			} satisfies TCreativeWorkBlogPost;
		}),
	getContentOfOne: publicProcedure
		.input(
			z.object({
				creativeWorkId: z.string(),
				authorId: z.string().optional(),
				checkIfIsAuthor: z.boolean().optional()
			})
		)
		.query(async ({ ctx, input }) => {
			const isAuthor = input.checkIfIsAuthor
				? checkIfIsAuthor({
						input: input,
						session: CheckIfUserInSessionExist(ctx.session)
				  })
				: false;

			const data = await ctx.prisma.blogPost.findFirstOrThrow({
				select: {
					content: true
				},
				where: {
					creativeWorkId: input.creativeWorkId,
					AND: {
						creativeWork: {
							authorId: isAuthor ? isAuthor.input.authorId : undefined,
							status: isAuthor
								? { not: CreativeWorkStatus.DELETED }
								: CreativeWorkStatus.PUBLIC
						}
					}
				}
			});

			return data;
		})
});
