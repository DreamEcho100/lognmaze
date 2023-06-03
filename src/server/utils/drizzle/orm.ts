import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
// import postgres from 'postgres';
// import { Pool } from 'pg';
import { env } from 'process';
import drizzleSchema from '@server/utils/drizzle/schema';

const pool = new Pool({
	connectionString: env.DATABASE_URL
	// connectionString: `${env.DATABASE_URL}?sslmode=require`
});
// postgres(`${process.env.DATABASE_URL}`, { ssl: 'require', max: 1 })

export const drizzleClient = drizzle(pool, {
	schema: drizzleSchema,
	logger: env.NODE_ENV === 'development',
});
