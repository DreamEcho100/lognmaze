import type { Role, UserProfile } from '@prisma/client';

import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user?: {
			id: string;
			Profile: UserProfile | null;
			name: NonNullable<NonNullable<DefaultSession['user']>['name']>;
			role: Role | null;
			emailVerified: null;
			createdAt: Date;
		} & Omit<DefaultSession['user'], 'name'>;
	}
}
