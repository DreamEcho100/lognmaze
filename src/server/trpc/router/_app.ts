import { router } from '@server/trpc/trpc';

import { authRouter } from './auth';
import { creativeWorksRouter } from './creativeWorks';
import { exampleRouter } from './example';
import { usersRouter } from './users';

export const appRouter = router({
	auth: authRouter,
	creativeWorks: creativeWorksRouter,
	example: exampleRouter,
	users: usersRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
