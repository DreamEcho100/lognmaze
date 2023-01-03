import { Role, UserGender } from '@prisma/client/edge';

import { router, authedProcedure } from '@server/trpc/trpc';
import { TRPCError } from '@trpc/server';

import { z } from 'zod';

const usersProfilesRouter = router({
	createOne: authedProcedure
		.input(
			z.object({
				bio: z.string().trim().min(3).optional(),
				profilePicture: z.string().trim().optional(),
				coverPhoto: z.string().trim().optional(),
				work: z.string().trim().min(3),
				education: z.string().trim().min(3),
				gender: z.nativeEnum(UserGender),
				firstName: z.string().trim().min(2),
				lastName: z.string().trim()
			})
		)
		.mutation(async ({ ctx, input }) => {
			const work = input.work.trim().replace(/\s+/g, ' ');
			const education = input.education.trim().replace(/\s+/g, ' ');

			const data = await ctx.prisma.$transaction([
				ctx.prisma.work.upsert({
					create: { name: work, count: 1 },
					update: { count: { increment: 1 } },
					where: { name: work }
				}),
				ctx.prisma.education.upsert({
					create: { name: education, count: 1 },
					update: { count: { increment: 1 } },
					where: { name: education }
				}),
				ctx.prisma.userProfile.create({
					data: {
						bio: input.bio,
						coverPhoto: input.coverPhoto,
						firstName: input.firstName,
						lastName: input.lastName,
						profilePicture: input.profilePicture,

						education: input.education,
						work: work,
						gender: input.gender,

						userId: ctx.session.user.id
					}
				}),
				ctx.prisma.userBasicStatistics.create({
					data: { userId: ctx.session.user.id }
				}),
				ctx.prisma.gender.update({
					data: { count: { increment: 1 } },
					where: { name: input.gender }
				}),
				ctx.prisma.user.update({
					data: { role: Role.USER },
					where: { id: ctx.session.user.id },
					select: { id: true, name: true }
				})
			]);

			const user = data[data.length - 1];

			if (!user || !('name' in user))
				throw new TRPCError({ code: 'BAD_REQUEST' });

			return {
				username: user.name,
				data
			};
		})
});

export const usersRouter = router({
	// getSession: publicProcedure.query(({ ctx }) => {
	// 	return ctx.session;
	// }),
	profiles: usersProfilesRouter
});
