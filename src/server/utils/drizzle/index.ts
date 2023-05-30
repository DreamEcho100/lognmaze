import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { env } from 'process';
import * as schema from './schema';

// // export default {
// //   async fetch(req, env, ctx) {
// //     const pool = new Pool({ connectionString: env.DATABASE_URL });
// //     const db = drizzle(pool)
// //     const result = await db.select().from(...);
// //     ctx.waitUntil(pool.end());
// //     return new Response(now);
// //   }
// // }
const pool = new Pool({ connectionString: env.DATABASE_URL }); // `${env.DATABASE_URL}?sslmode=require`
export const drizzleORM = drizzle(pool, { schema });

// import {
//   pgTable,
//   serial,
//   text,
//   timestamp,
//   uniqueIndex,
// } from 'drizzle-orm/pg-core'
// import { InferModel } from 'drizzle-orm'
// import { drizzle } from 'drizzle-orm/vercel-postgres'

// // Connect to Vercel Postgres
// export const db = drizzle(sql)
