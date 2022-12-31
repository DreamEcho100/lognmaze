import { router, publicProcedure } from '@server/trpc/trpc';

import { z } from 'zod';

export const exampleRouter = router({
	hello: publicProcedure
		.input(z.object({ text: z.string().nullish() }).nullish())
		.query(({ input }) => {
			return {
				greeting: `Hello ${input?.text ?? 'world'}`
			};
		}),
	getAll: publicProcedure.query(({ ctx }) => {
		// ctx.prisma.tag.create({
		//   data: {
		//     name: "test",
		//     basicStatistics: {
		//       create: true,
		//     },
		//   },
		// });
		// ctx.prisma.tag.update({
		//   data: {
		//     name: "test",
		//     basicStatistics: {
		//       update: {
		//         blogCount: { increment: 1 },
		//       },
		//     },
		//   },
		//   where: {
		//     name: "test",
		//   },
		// });
		return ctx.prisma.user.findMany({
			include: {
				creativeWorks: {}
			}
		});
	})
});
