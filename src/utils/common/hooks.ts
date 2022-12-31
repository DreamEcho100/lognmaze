import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

export const useTypedSession = () => {
	const { data: session, status } = useSession();

	const userState = {
		status,
		data: session
	} as
		| {
				status: 'authenticated';
				data: Omit<Session, 'user'> & {
					user: NonNullable<Session['user']>;
				};
		  }
		| {
				status: 'loading' | 'unauthenticated';
				data: null;
		  };

	return userState;
};
