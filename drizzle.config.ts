import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL);

export default {
	schema: './src/utils/drizzle/schema.ts',
	out: './drizzle',
	connectionString: process.env.DATABASE_URL!
} satisfies Config;
