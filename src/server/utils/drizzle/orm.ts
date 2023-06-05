import { drizzle } from 'drizzle-orm/neon-serverless';
import { neonConfig, Pool } from '@neondatabase/serverless';
import ws from 'ws';
// import { Pool } from 'pg';
import { env } from 'process';
import drizzleSchema from '@server/utils/drizzle/schema';

neonConfig.webSocketConstructor = ws;

const pool = new Pool({
	connectionString: env.DATABASE_URL
	// connectionString: `${env.DATABASE_URL}?sslmode=require`
});

export const drizzleClient = drizzle(pool, {
	schema: drizzleSchema,
	logger: env.NODE_ENV === 'development'
});
