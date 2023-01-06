import type { inferRouterInputs } from '@trpc/server';
import type { AppRouter } from '@server/trpc/router/_app';
import type { CreativeWorkType } from '@prisma/client';

export type TOnAddingCreativeWork = (
	props: { creativeWorkId: string; typeDataId: string;  } & (
		| {
				type: typeof CreativeWorkType.BLOG_POST;
			input: inferRouterInputs<AppRouter>['creativeWorks']['authors']['blogPosts']['createOne'];
			slug: string
		  }
		| {
				type: typeof CreativeWorkType.POST;
				input: inferRouterInputs<AppRouter>['creativeWorks']['authors']['posts']['createOne'];
		  }
	)
) => void;
