import { Role, UserGender } from '@prisma/client';

import { router, authedProcedure } from '@server/trpc/trpc';

import { z } from 'zod';

const usersProfilesRouter = router({
	createOne: authedProcedure
		.input(
			z.object({
				username: z.string().trim().min(3),
				bio: z.string().trim().min(3).optional(),
				profilePicture: z.string().trim().optional(),
				coverPhoto: z.string().trim().optional(),
				work: z.string().trim().min(3),
				education: z.string().trim().min(3),
				gender: z.nativeEnum(UserGender).default(UserGender.M),
				firstName: z.string().trim().min(2),
				lastName: z.string().trim()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const work = input.work.trim().replace(/\s+/g, ' ');
			const education = input.education.trim().replace(/\s+/g, ' ');

			const data = await ctx.prisma.$transaction([
				ctx.prisma.user.update({
					where: { id: ctx.session.user.id },
					data: {
						name: input.username,
						role: Role.USER,
						Profile: {
							create: {
								bio: input.bio,
								coverPhoto: input.coverPhoto,
								firstName: input.firstName,
								lastName: input.lastName,
								profilePicture: input.profilePicture,
								Gender: { connect: { name: input.gender } },
								Work: {
									connectOrCreate: {
										create: { name: work },
										where: { name: work }
									}
								},
								Education: {
									connectOrCreate: {
										create: { name: education },
										where: { name: education }
									}
								}
							}
						},
						Stats: { create: {} }
					}
				}),
				ctx.prisma.work.update({
					data: { count: { increment: 1 } },
					where: { name: work }
				}),
				ctx.prisma.education.update({
					data: { count: { increment: 1 } },
					where: { name: education }
				}),
				ctx.prisma.gender.update({
					data: { count: { increment: 1 } },
					where: { name: input.gender }
				})
			]);

			return {
				username: data[0].name,
				data
			};
		})
});

export const usersRouter = router({
	profiles: usersProfilesRouter
});
