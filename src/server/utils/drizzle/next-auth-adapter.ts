import { NeonDatabase } from 'drizzle-orm/neon-serverless';
import type { Adapter, AdapterSession, AdapterUser } from 'next-auth/adapters';
// import { drizzleORM } from '@server/utils/drizzle';
import { and, eq } from 'drizzle-orm';
import { v4 as uuid } from 'uuid';
import * as schema from './schema';

// typeof drizzleORM
export default function drizzleAdapter(
	client: NeonDatabase<typeof schema>,
	{
		user: _user,
		session: _session,
		verificationToken: _verificationToken,
		_account: _account
	}: typeof schema
): Adapter {
	return {
		createUser: async (data) => {
			const id = uuid();

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			await client.insert(_user).values({ ...data, id });

			return (client
				.select()
				.from(_user)
				.where(eq(_user.id, id))
				.then((res) => res[0]) ?? null) as unknown as AdapterUser;
		},
		getUser: async (data) => {
			return (client
				.select()
				.from(_user)
				.where(eq(_user.id, data))
				.then((res) => res[0]) ?? null) as unknown as AdapterUser | null;
		},
		getUserByEmail: async (data) => {
			return (client
				.select()
				.from(_user)
				.where(eq(_user.email, data))
				.then((res) => res[0]) ?? null) as unknown as AdapterUser | null;
		},
		createSession: async (data) => {
			const id = uuid();

			await client.insert(_session).values({ ...data, id });

			return client
				.select()
				.from(_session)
				.where(eq(_session.sessionToken, data.sessionToken))
				.then((res) => res[0]) as unknown as AdapterSession;
		},
		getSessionAndUser: async (data) => {
			return (client
				.select({
					session: _session,
					user: _user
				})
				.from(_session)
				.where(eq(_session.sessionToken, data))
				.innerJoin(_user, eq(_user.id, _session.userId))
				.then((res) => res[0]) ?? null) as unknown as {
				session: AdapterSession;
				user: AdapterUser;
			} | null;
		},
		updateUser: async (data) => {
			if (!data.id) {
				throw new Error('No user id.');
			}

			await client
				.update(_user)
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				.set(data)
				.where(eq(_user.id, data.id));

			return client
				.select()
				.from(_user)
				.where(eq(_user.id, data.id))
				.then((res) => res[0]) as unknown as AdapterUser;
		},
		updateSession: async (data) => {
			await client
				.update(_session)
				.set(data)
				.where(eq(_session.sessionToken, data.sessionToken));

			return client
				.select()
				.from(_session)
				.where(eq(_session.sessionToken, data.sessionToken))
				.then((res) => res[0]);
		},
		linkAccount: async (rawAccount) => {
			const id = uuid();

			await client
				.insert({ ..._account, id })
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				.values(rawAccount)
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				.then((res) => res[0]);
		},
		getUserByAccount: async (account) => {
			const user =
				(await client
					.select()
					.from(_user)
					.innerJoin(
						_account,
						and(
							eq(_account.providerAccountId, account.providerAccountId),
							eq(_account.provider, account.provider)
						)
					)
					.then((res) => res[0])) ?? null;

			if (user) {
				return user.User as unknown as AdapterUser;
			}

			return null;
		},
		deleteSession: async (sessionToken) => {
			await client
				.delete(_session)
				.where(eq(_session.sessionToken, sessionToken));
		},
		createVerificationToken: async (token) => {
			await client.insert(_verificationToken).values(token);

			return client
				.select()
				.from(_verificationToken)
				.where(eq(_verificationToken.identifier, token.identifier))
				.then((res) => res[0]);
		},
		useVerificationToken: async (token) => {
			try {
				const deletedToken =
					(await client
						.select()
						.from(_verificationToken)
						.where(
							and(
								eq(_verificationToken.identifier, token.identifier),
								eq(_verificationToken.token, token.token)
							)
						)
						.then((res) => res[0])) ?? null;

				await client
					.delete(_verificationToken)
					.where(
						and(
							eq(_verificationToken.identifier, token.identifier),
							eq(_verificationToken.token, token.token)
						)
					);

				return deletedToken;
			} catch (err) {
				throw new Error('No verification token found.');
			}
		},
		deleteUser: async (id) => {
			await client.delete(_user).where(eq(_user.id, id));
			// .then((res) => res[0]);
		},
		unlinkAccount: async (account) => {
			await client
				.delete(_account)
				.where(
					and(
						eq(_account.providerAccountId, account.providerAccountId),
						eq(_account.provider, account.provider)
					)
				);

			return undefined;
		}
	};
}
