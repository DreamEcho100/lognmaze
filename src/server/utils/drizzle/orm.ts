import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { env } from 'process';
import drizzleSchema from '@server/utils/drizzle/schema';

const pool = new Pool({ connectionString: env.DATABASE_URL }); // `${env.DATABASE_URL}?sslmode=require`
export const drizzleClient = drizzle(pool, {
	schema: drizzleSchema,
	logger: env.NODE_ENV === 'development'
});
