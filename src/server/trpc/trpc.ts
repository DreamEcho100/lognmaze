import { initTRPC, TRPCError } from '@trpc/server';

import type { Session } from 'next-auth';

import { ZodError } from 'zod';

import superjson from 'superjson';

import { z } from 'zod';

import type { Context } from './context';

const t = initTRPC.context<Context>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
						? error.cause.flatten()
						: null
			}
		};
	}
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

type SessionWithUser = Omit<Session, 'user'> & {
	user: NonNullable<NonNullable<Session>['user']>;
};

export const CheckIfUserInSessionExist = (
	session: Session | null
): SessionWithUser => {
	if (!session || typeof session.user?.id !== 'string')
		throw new TRPCError({ code: 'UNAUTHORIZED' });

	return session as SessionWithUser;
};

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
	const session = CheckIfUserInSessionExist(ctx.session);

	return next({
		ctx: {
			// infers the `session` as non-nullable
			session // : { ...session, user: session.user },
		}
	});
});

export const checkIfIsAuthor = ({
	session,
	input
}: {
	session: Session;
	input: unknown;
}) => {
	const _session = CheckIfUserInSessionExist(session);

	// if (
	//   typeof input !== "object" ||
	//   !input ||
	//   !("authorId" in input) ||
	//   typeof input.authorId !== "string" ||
	//   input.authorId !== session.user.id
	// )
	//   throw new TRPCError({
	//     code: "UNAUTHORIZED",
	//     message: "You're not the Author",
	//   });

	z.object({
		authorId: z.literal(_session.user.id)
	}).parse(input, {
		errorMap: (issueOptionalMessage) => {
			// issueOptionalMessage.message;
			return { message: `Not authorized, ${issueOptionalMessage.message}` };
		}
	});

	return {
		session: _session,
		input: z
			.object({
				authorId: z.literal(_session.user.id)
			})
			.parse(input)
	};
};

/**
 * Reusable middleware to ensure
 * users are logged in and the owner of the creative Work
 */
const isAuthor = t.middleware(({ ctx, rawInput, next }) => {
	const session = CheckIfUserInSessionExist(ctx.session);

	const input = checkIfIsAuthor({
		input: rawInput,
		session
	});

	return next({
		ctx: {
			...ctx,
			authorId: input.input.authorId,
			// infers the `session` as non-nullable
			session // : { ...session, user: session.user },
		}
	});
});

/**
 * Protected procedure
 **/
export const authedProcedure = t.procedure.use(isAuthed);
export const haveAuthorPrivilegesProcedure = t.procedure.use(isAuthor);
