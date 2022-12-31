import { router } from '@server/trpc/trpc';

import { creativeWorksRouter } from './creativeWorks';
import { usersRouter } from './users';

export const appRouter = router({
	creativeWorks: creativeWorksRouter,
	users: usersRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
