import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
// import { Pool } from 'pg';
import { env } from 'process';
import drizzleSchema from '@server/utils/drizzle/schema';

console.log('\n\n\n', env.DATABASE_URL, '\n\n\n');

const pool = new Pool({
	connectionString: env.DATABASE_URL
	// connectionString: `${env.DATABASE_URL}?sslmode=require`
});
export const drizzleClient = drizzle(pool, {
	schema: drizzleSchema,
	logger: env.NODE_ENV === 'development'
});
