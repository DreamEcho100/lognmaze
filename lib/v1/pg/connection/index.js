const { Pool } = require('pg');

const connectionString = process.env.PG_CONNECTION_STRING;

const pool = new Pool({
	connectionString,
});

// const pool = new Pool();

export default pool;
