import type { CreativeWorkType } from '@prisma/client';

import type { AppRouter } from '@server/trpc/router/_app';

import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';

export type TOnAddingCreativeWork = (
	props: { creativeWorkId: string; typeDataId: string } & (
		| {
				type: typeof CreativeWorkType.BLOG_POST;
				input: inferRouterInputs<AppRouter>['creativeWorks']['authors']['blogPosts']['createOne'];
				result: inferRouterOutputs<AppRouter>['creativeWorks']['authors']['blogPosts']['createOne'];
		  }
		| {
				type: typeof CreativeWorkType.POST;
				input: inferRouterInputs<AppRouter>['creativeWorks']['authors']['posts']['createOne'];
				result: inferRouterOutputs<AppRouter>['creativeWorks']['authors']['posts']['createOne'];
		  }
	)
) => void;
