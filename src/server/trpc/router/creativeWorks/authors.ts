import type { Tag } from '@prisma/client';
import { CreativeWorkStatus, CreativeWorkType } from '@prisma/client';

import type { OmitPickAndSetToNonNullable } from '@server/ts';
import { router, haveAuthorPrivilegesProcedure } from '@server/trpc/trpc';
import { updateCreativeWorkTags } from '@server/utils/core/controllers';

import { z } from 'zod';

import { default as slugify } from 'slug';

// const CreativeWorkStatusExcludeDeleted = Object.values(CreativeWorkStatus).filter(item => item === CreativeWorkStatus.DELETED)

export const blogPostsRouter = router({
	createOne: haveAuthorPrivilegesProcedure
		.input(
			z.object({
				authorId: z.string(),
				Tags: z.array(z.string()).min(3),
				status: z
					.enum([CreativeWorkStatus.PUBLIC, CreativeWorkStatus.PRIVATE])
					.optional()
					.default(CreativeWorkStatus.PUBLIC),
				typeData: z.object({
					content: z.string(),
					description: z.string(),
					// slug: z.string(),
					thumbnailUrl: z.string(),
					title: z.string(),
					languageTagId: z.string()
				})
			})
		)
		.mutation(async ({ ctx, input }) => {
			// const discussionForm = await ctx.prisma.creativeWork.create({
			// 	data: {
			// 		authorId: input.authorId,
			// 		status: input.status,
			// 		type: CreativeWorkType.DISCUSSION_FORUM,
			// 		DiscussionForum: { create: true }
			// 	}
			// });

			const slug = slugify(input.typeData.title);

			console.log('slug', slug);

			const filteredTags = input.Tags.map((tag) => slugify(tag)).filter(
				Boolean
			);

			const CreativeWork = await ctx.prisma.creativeWork.create({
				data: {
					authorId: input.authorId,
					status: input.status,
					type: CreativeWorkType.BLOG_POST,
					Tags: {
						connectOrCreate: filteredTags.map((tag) => ({
							create: {
								name: tag,
								Stats: {
									connectOrCreate: { create: {}, where: { tagName: tag } }
								}
							},
							where: { name: tag }
						}))
					},
					BlogPost: {
						create: {
							content: input.typeData.content,
							description: input.typeData.description,
							slug,
							thumbnailUrl: input.typeData.thumbnailUrl,
							title: input.typeData.title,
							updatedAt: null,
							LanguageTag: {
								connect: { id: input.typeData.languageTagId }
							},
							// DiscussionForum: { connect: { id: discussionForm.id } }
							DiscussionForum: {
								create: {
									updatedAt: null,
									CreativeWork: {
										create: {
											authorId: input.authorId,
											status: input.status,
											type: CreativeWorkType.DISCUSSION_FORUM
										}
									}
								}
							}
						}
					}
				},
				include: {
					Tags: true,
					BlogPost: { include: { LanguageTag: true } },
					DiscussionForum: true
				}
			});

			ctx.prisma.tagStats.updateMany({
				data: {
					blogPostsCount: { increment: 1 }
				},
				where: { tagName: { in: CreativeWork.Tags.map((tag) => tag.name) } }
			});

			return CreativeWork as OmitPickAndSetToNonNullable<
				typeof CreativeWork,
				'BlogPost' | 'DiscussionForum'
			>;
		}),
	updateOne: haveAuthorPrivilegesProcedure
		.input(
			z.object({
				authorId: z.string(),
				creativeWorkId: z.string(),
				creativeWorkBasics: z
					.object({
						status: z
							.enum([CreativeWorkStatus.PUBLIC, CreativeWorkStatus.PRIVATE])
							.optional()
					})
					.optional(),
				Tags: z
					.object({
						added: z.array(z.string()).optional(),
						removed: z.array(z.string()).optional()
					})
					.optional(),
				typeData: z
					.object({
						content: z.string().optional(),
						description: z.string().optional(),
						// slug: z.string().optional(),
						thumbnailUrl: z.string().optional(),
						title: z.string().optional(),
						languageTagId: z.string().optional()
					})
					.optional()
			})
		)
		.mutation(async ({ ctx, input }) => {
			let CreativeWork: { id: string } | undefined;
			let typeData: { creativeWorkId: string } | undefined;
			let Tags: { Tags: Tag[] } | undefined;

			if (input.creativeWorkBasics)
				CreativeWork = await ctx.prisma.creativeWork.update({
					data: { status: input.creativeWorkBasics.status },
					where: { id: input.creativeWorkId },
					select: { id: true }
				});

			if (input.Tags) {
				Tags = await updateCreativeWorkTags(ctx.prisma, {
					creativeWorkId: input.creativeWorkId,
					creativeWorkType: CreativeWorkType.BLOG_POST,
					addedTags: input.Tags.added,
					removedTags: input.Tags.removed
				});
			}
			if (input.typeData)
				typeData = await ctx.prisma.blogPost.update({
					data: {
						content: input.typeData.content,
						description: input.typeData.description,
						// slug: input.typeData.slug,
						thumbnailUrl: input.typeData.thumbnailUrl,
						title: input.typeData.title,
						languageTagId: input.typeData.languageTagId
					},
					where: { creativeWorkId: input.creativeWorkId },
					select: { creativeWorkId: true }
				});

			return { CreativeWork, typeData, Tags };
		})
});
export const postsRouter = router({
	createOne: haveAuthorPrivilegesProcedure
		.input(
			z.object({
				authorId: z.string(),
				Tags: z.array(z.string()).optional(),
				status: z
					.enum([CreativeWorkStatus.PUBLIC, CreativeWorkStatus.PRIVATE])
					.optional()
					.default(CreativeWorkStatus.PUBLIC),
				typeData: z.object({ content: z.string() })
			})
		)
		.mutation(async ({ ctx, input }) => {
			// const discussionForm = await ctx.prisma.creativeWork.create({
			// 	data: {
			// 		authorId: input.authorId,
			// 		status: input.status,
			// 		type: CreativeWorkType.DISCUSSION_FORUM,
			// 		DiscussionForum: { create: true }
			// 	}
			// });

			const CreativeWork = await ctx.prisma.creativeWork.create({
				data: {
					authorId: input.authorId,
					status: input.status,
					type: CreativeWorkType.POST,
					Tags: {
						connectOrCreate: input.Tags?.map((tag) => ({
							create: {
								name: tag,
								Stats: {
									connectOrCreate: { create: {}, where: { tagName: tag } }
								}
							},
							where: { name: tag }
						}))
					},
					Post: {
						create: {
							content: input.typeData.content,
							updatedAt: null,
							// DiscussionForum: { connect: { id: discussionForm.id } }
							DiscussionForum: {
								create: {
									updatedAt: null,
									CreativeWork: {
										create: {
											authorId: input.authorId,
											status: input.status,
											type: CreativeWorkType.DISCUSSION_FORUM
										}
									}
								}
							}
						}
					}
				},
				include: { Tags: true, Post: true, DiscussionForum: true }
			});

			ctx.prisma.tagStats.updateMany({
				data: {
					postsCount: { increment: 1 }
				},
				where: { tagName: { in: CreativeWork.Tags.map((tag) => tag.name) } }
			});

			return CreativeWork as OmitPickAndSetToNonNullable<
				typeof CreativeWork,
				'Post' | 'DiscussionForum'
			>;
		}),
	updateOne: haveAuthorPrivilegesProcedure
		.input(
			z.object({
				authorId: z.string(),
				creativeWorkId: z.string(),
				creativeWorkBasics: z
					.object({
						status: z
							.enum([CreativeWorkStatus.PUBLIC, CreativeWorkStatus.PRIVATE])
							.optional()
					})
					.optional(),
				Tags: z
					.object({
						added: z.array(z.string()).optional(),
						removed: z.array(z.string()).optional()
					})
					.optional(),
				typeData: z
					.object({
						content: z.string().optional()
					})
					.optional()
			})
		)
		.mutation(async ({ ctx, input }) => {
			let CreativeWork: { id: string } | undefined;
			let typeData: { creativeWorkId: string } | undefined;
			let Tags: { Tags: Tag[] } | undefined;

			if (input.creativeWorkBasics)
				CreativeWork = await ctx.prisma.creativeWork.update({
					data: { status: input.creativeWorkBasics.status },
					where: { id: input.creativeWorkId },
					select: { id: true }
				});

			if (input.Tags) {
				Tags = await updateCreativeWorkTags(ctx.prisma, {
					creativeWorkId: input.creativeWorkId,
					creativeWorkType: CreativeWorkType.BLOG_POST,
					addedTags: input.Tags.added,
					removedTags: input.Tags.removed
				});
			}
			if (input.typeData)
				typeData = await ctx.prisma.post.update({
					data: {
						content: input.typeData.content
					},
					where: { creativeWorkId: input.creativeWorkId },
					select: { creativeWorkId: true }
				});

			return { CreativeWork, typeData, Tags };
		})
});
export const discussionFormsPostsRouter = router({
	createOne: haveAuthorPrivilegesProcedure
		.input(
			z.object({
				authorId: z.string(),
				Tags: z.array(z.string()).optional(),
				status: z
					.enum([CreativeWorkStatus.PUBLIC, CreativeWorkStatus.PRIVATE])
					.optional()
					.default(CreativeWorkStatus.PUBLIC),
				DiscussionForumPost: z.object({
					content: z.string(),
					discussionForumId: z.string()
				})
			})
		)
		.mutation(async ({ ctx, input }) => {
			// const discussionForm = await ctx.prisma.creativeWork.create({
			// 	data: {
			// 		authorId: input.authorId,
			// 		status: input.status,
			// 		type: CreativeWorkType.DISCUSSION_FORUM,
			// 		DiscussionForum: { create: true }
			// 	}
			// });

			const CreativeWork = await ctx.prisma.creativeWork.create({
				data: {
					authorId: input.authorId,
					status: input.status,
					type: CreativeWorkType.DISCUSSION_FORUM,
					Tags: {
						connectOrCreate: input.Tags?.map((tag) => ({
							create: {
								name: tag,
								Stats: {
									connectOrCreate: { create: {}, where: { tagName: tag } }
								}
							},
							where: { name: tag }
						}))
					},
					DiscussionForumPost: {
						create: {
							content: input.DiscussionForumPost.content,
							discussionForumId: input.DiscussionForumPost.discussionForumId,
							updatedAt: null
						}
					}
				},
				include: { Tags: true, DiscussionForumPost: true }
			});

			ctx.prisma.tagStats.updateMany({
				data: {
					postsCount: { increment: 1 }
				},
				where: { tagName: { in: CreativeWork.Tags.map((tag) => tag.name) } }
			});

			return CreativeWork as OmitPickAndSetToNonNullable<
				typeof CreativeWork,
				'DiscussionForumPost'
			>;
		}),
	updateOne: haveAuthorPrivilegesProcedure
		.input(
			z.object({
				authorId: z.string(),
				creativeWorkId: z.string(),
				content: z.string(),
				discussionForumId: z.string(),
				addedTags: z.array(z.string()).optional(),
				removedTags: z.array(z.string()).optional()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const DiscussionForumPost = await ctx.prisma.discussionForumPost.update({
				data: { content: input.content },
				where: { creativeWorkId: input.creativeWorkId },
				select: { creativeWorkId: true }
			});

			const Tags = await updateCreativeWorkTags(ctx.prisma, {
				creativeWorkId: DiscussionForumPost.creativeWorkId,
				creativeWorkType: CreativeWorkType.POST,
				addedTags: input.addedTags,
				removedTags: input.removedTags
			});

			return { DiscussionForumPost, Tags };
		})
});

export const authorsRouter = router({
	blogPosts: blogPostsRouter,
	posts: postsRouter,
	// discussionForms: discussionFormsRouter,
	discussionFormsPosts: discussionFormsPostsRouter,
	updateStatus: haveAuthorPrivilegesProcedure
		.input(
			z.object({
				authorId: z.string(),
				id: z.string(),
				status: z
					.enum([CreativeWorkStatus.PUBLIC, CreativeWorkStatus.PRIVATE])
					.optional()
					.default(CreativeWorkStatus.PUBLIC)
			})
		)
		.mutation(async ({ ctx, input }) => {
			const data = undefined;

			await ctx.prisma.creativeWork.update({
				data: { status: input.status },
				where: { id: input.id },
				select: {}
			});

			return data;
		}),
	delete: haveAuthorPrivilegesProcedure
		.input(
			z.object({
				authorId: z.string(),
				creativeWorkId: z.string()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const deletedCreativeWork = await ctx.prisma.creativeWork.update({
				data: { status: CreativeWorkStatus.DELETED },
				where: { id: input.creativeWorkId }
			});

			return deletedCreativeWork;
		})
});
