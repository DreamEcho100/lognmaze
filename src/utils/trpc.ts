import { type AppRouter } from '@server/trpc/router/_app';

import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';

import superjson from 'superjson';

const getBaseUrl = () => {
	if (typeof window !== 'undefined') return ''; // browser should use relative url
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const trpcAPI = createTRPCNext<AppRouter>({
	config() {
		return {
			transformer: superjson,
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' && opts.result instanceof Error)
				}),
				httpBatchLink({ url: `${getBaseUrl()}/api/trpc` })
			],
			queryClientConfig: {
				defaultOptions: {
					queries: {
						// https://stackoverflow.com/a/72833550/13961420
						cacheTime: 5 * 60 * 1000,
						staleTime: 5 * 60 * 1000,
						refetchOnWindowFocus: false
					}
				}
			}
		};
	},
	ssr: false
	// ssr: true,
	// responseMeta({ clientErrors, ctx }) {
	// 	if (clientErrors.length) {
	// 		// propagate first http error from API calls
	// 		return { status: clientErrors[0]?.data?.httpStatus ?? 500 };
	// 	}
	// 	// cache full page for 1 day + revalidate once every second
	// 	const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
	// 	return {
	// 		'Cache-Control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`
	// 	};
	// }
});

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
