import { router, publicProcedure, authedProcedure } from '@server/trpc/trpc';

export const authRouter = router({
	getSession: publicProcedure.query(({ ctx }) => {
		return ctx.session;
	}),
	getSecretMessage: authedProcedure.query(() => {
		return 'you can now see this secret message!';
	})
});
