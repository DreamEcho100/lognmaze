import type { AppType } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { trpcAPI } from '@utils/trpc';

import '@styles/globals.css';
import MainLayout from '@components/shared/core/Layouts/Main';
import { DefaultSeo } from 'next-seo';
import NextSEODefaults from '@utils/core/next-seo.config';
import dynamic from 'next/dynamic';
import ExtraScripts from '@components/shared/core/ExtraScripts';
const DynamicTopProgressBar = dynamic(
	() => import('@components/shared/common/TopProgressBar'),
	{ ssr: false }
);

import { useRouter } from 'next/router';
import { useEffect } from 'react';

// import '@styles/dist.css';

// yarn add -D concurrently

// "dev": "concurrently \"next dev --turbo --show-all\" \"tailwindcss -i src/styles/globals.css -o src/styles/dist.css -w\"",
// "build": "tailwindcss -m -i src/styles/globals.css -o src/styles/dist.css && next build",

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps }
}) => {
	const router = useRouter();

	useEffect(() => {
		if (router.asPath.startsWith('/blogs/')) {
			router.push(
				`/users/dreamecho100/creative-works/blog-posts/${router.asPath.slice(
					'/blogs/'.length
				)}`
			);
		}
	}, [router]);

	return (
		<SessionProvider session={session} refetchInterval={60 * 30}>
			<DefaultSeo {...NextSEODefaults} />
			<MainLayout>
				<DynamicTopProgressBar />
				<Component {...pageProps} />
				<ExtraScripts />
			</MainLayout>
		</SessionProvider>
	);
};

export default trpcAPI.withTRPC(MyApp);
