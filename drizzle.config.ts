import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();


export default {
	schema: './src/utils/drizzle/schema/tables.ts',
	out: './drizzle',
	connectionString: process.env.DATABASE_URL!
} satisfies Config;
