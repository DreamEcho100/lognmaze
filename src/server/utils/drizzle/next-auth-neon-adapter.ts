// Credits to: https://github.com/nextauthjs/next-auth/tree/f1c6d62b2d194b69c8b588f1ce1456bd8be87396/packages/adapter-drizzle

import { NeonDatabase } from 'drizzle-orm/neon-serverless';
import type { Adapter, AdapterSession, AdapterUser } from 'next-auth/adapters';
import { and, eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import { type DrizzleSchema } from '@server/utils/drizzle/schema';

export type DrizzleClient = NeonDatabase<DrizzleSchema>;

export default function drizzleAdapter(
	client: DrizzleClient,
	schema: DrizzleSchema
): Adapter {
	return {
		createUser: async (data) => {
			const id = uuid();

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			await client.insert(_user).values({ ...data, id });

			return client
				.select()
				.from(schema.user)
				.where(eq(schema.user.id, id))
				.then((res) => res[0] as AdapterUser);
		},
		getUser: async (data) => {
			return (
				client
					.select()
					.from(schema.user)
					.where(eq(schema.user.id, data))
					.then((res) => res[0] as unknown as AdapterUser) ?? null
			);
		},
		getUserByEmail: async (data) => {
			return (
				client
					.select()
					.from(schema.user)
					.where(eq(schema.user.email, data))
					.then((res) => res[0] as AdapterUser) ?? null
			);
		},
		createSession: async (data) => {
			const id = uuid();

			await client.insert(schema.session).values({ ...data, id });

			return client
				.select()
				.from(schema.session)
				.where(eq(schema.session.sessionToken, data.sessionToken))
				.then((res) => res[0]!);
		},
		getSessionAndUser: async (data) => {
			return (
				(client
					.select({
						session: schema.session,
						user: schema.user
					})
					.from(schema.session)
					.where(eq(schema.session.sessionToken, data))
					.innerJoin(schema.user, eq(schema.user.id, schema.session.userId))
					.then((res) => res[0]!) as unknown as {
					session: AdapterSession;
					user: AdapterUser;
				}) ?? null
			);
		},
		updateUser: async (data) => {
			if (!data.id) {
				throw new Error('No user id.');
			}

			await client
				.update(schema.user)
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				.set(data)
				.where(eq(schema.user.id, data.id));

			return client
				.select()
				.from(schema.user)
				.where(eq(schema.user.id, data.id))
				.then((res) => res[0] as AdapterUser);
		},
		updateSession: async (data) => {
			await client
				.update(schema.session)
				.set(data)
				.where(eq(schema.session.sessionToken, data.sessionToken));

			return client
				.select()
				.from(schema.session)
				.where(eq(schema.session.sessionToken, data.sessionToken))
				.then((res) => res[0]);
		},
		linkAccount: async (rawAccount) => {
			const id = uuid();

			await client
				.insert({ ...schema.account, id })
				// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// // @ts-ignore
				.values(rawAccount as typeof rawAccount & { id: string })
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				.then((res) => res[0]);
		},
		getUserByAccount: async (account) => {
			const user = await client
				.select()
				.from(schema.user)
				.innerJoin(
					schema.account,
					and(
						eq(schema.account.providerAccountId, account.providerAccountId),
						eq(schema.account.provider, account.provider)
					)
				)
				.then((res) => res[0]);

			if (user) return user.User as AdapterUser;

			return null;
		},
		deleteSession: async (sessionToken) => {
			await client
				.delete(schema.session)
				.where(eq(schema.session.sessionToken, sessionToken));
		},
		createVerificationToken: async (token) => {
			await client.insert(schema.verificationToken).values(token);

			return client
				.select()
				.from(schema.verificationToken)
				.where(eq(schema.verificationToken.identifier, token.identifier))
				.then((res) => res[0]);
		},
		useVerificationToken: async (token) => {
			try {
				const deletedToken =
					(await client
						.select()
						.from(schema.verificationToken)
						.where(
							and(
								eq(schema.verificationToken.identifier, token.identifier),
								eq(schema.verificationToken.token, token.token)
							)
						)
						.then((res) => res[0])) ?? null;

				await client
					.delete(schema.verificationToken)
					.where(
						and(
							eq(schema.verificationToken.identifier, token.identifier),
							eq(schema.verificationToken.token, token.token)
						)
					);

				return deletedToken;
			} catch (err) {
				throw new Error('No verification token found.');
			}
		},
		deleteUser: async (id) => {
			await client.delete(schema.user).where(eq(schema.user.id, id));
			// .then((res) => res[0]);
		},
		unlinkAccount: async (account) => {
			await client
				.delete(schema.account)
				.where(
					and(
						eq(schema.account.providerAccountId, account.providerAccountId),
						eq(schema.account.provider, account.provider)
					)
				);

			return undefined;
		}
	};
}
