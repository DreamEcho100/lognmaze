import { env } from '@env/server.mjs';

import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { prisma } from '@server/db/client';

import type { Account, NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export interface GoogleProfile extends Record<string, unknown> {
	aud: string;
	azp: string;
	email: string;
	email_verified: boolean;
	exp: number;
	family_name: string;
	given_name: string;
	hd: string;
	iat: number;
	iss: string;
	jti: string;
	name: string;
	nbf: number;
	picture: string;
	sub: string;
}

export const authOptions: NextAuthOptions = {
	secret: env.NEXTAUTH_SECRET,
	callbacks: {
		async session(_props) {
			const props = _props as unknown as typeof _props & {
				user: NonNullable<(typeof _props.session)['user']>;
			};

			if (props.session.user && props?.user?.id) {
				props.session.user.id = props.user.id;
				props.session.user.emailVerified = props.user.emailVerified;
				props.session.user.createdAt = props.user.createdAt;
				props.session.user.role = props.user.role;

				if (props.session.user.role) {
					props.session.user.profile = await prisma.userProfile.findFirst({
						where: { userId: props.session.user.id }
					});
				}
			}

			return props.session;
		},
		jwt({ token, user }) {
			user && (token.user = user);

			return token;
		},
		signIn(_props) {
			const props = _props as unknown as
				| (Omit<typeof _props, 'account' | 'profile'> & {
						account: Account & { provider: 'google' };
						profile: GoogleProfile;
				  })
				| (Omit<typeof _props, 'profile'> & {
						profile: undefined;
				  });

			if (props.account?.provider === 'google' && props.profile?.email) {
				return props.profile.email_verified;
			}

			return true;
		}
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_ID as string,
			clientSecret: env.GOOGLE_SECRET as string,
			httpOptions: { timeout: 40000 },
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code'
				}
			},
			profile(profile) {
				return {
					id: profile.sub,
					name: `${profile.name} ${profile.sub}`
						.replace(/\s+/g, '_')
						.replace(/[@#\$!&]+|_{2,}/g, '_')
						.toLowerCase(),
					email: profile.email,
					image: profile.picture
				};
			}
		})
	]
};

export default NextAuth(authOptions);
