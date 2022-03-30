// const { Pool } = require('pg');
import { Pool } from 'pg';

const connectionString = process.env.PG_CONNECTION_STRING as string;

const pool = new Pool({
	connectionString,
});

// const pool = new Pool();

export default pool;
