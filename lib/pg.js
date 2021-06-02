// const fs = require('fs');
// const path = require('path');
const { Pool } = require('pg');

export const connectionString = process.env.PG_CONNECTION_STRING;

// export const pool = new Pool({
// 	user: 'postgres',
// 	password: 'tset',
// 	host: 'localhost',
// 	port: 5432,
// 	database: 'mazecode',
// });

export const pool = new Pool({
	connectionString,
	ssl: {
		rejectUnauthorized: false,
		// ca: fs.readFileSync('ca-certificate.txt').toString(),
	},
});

export const selectAllFrom = async ({ table }) => {
	return await pool.query(`SELECT * FROM ${table}`);
};
