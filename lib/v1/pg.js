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

// prod-ca-2021

export const pool = new Pool({
	connectionString,
	// ssl: {
	// 	rejectUnauthorized: false,
	// 	// ca: fs.readFileSync('ca-certificate.txt').toString(),
	// },
});

// 	pool.catch((err) => {
// 	console.error('error message', err.message);
// 	console.error('error connecting', err.stack);
// });

export const selectAllFrom = async ({ table }) => {
	return await pool.query(`SELECT * FROM ${table}`);
};

export const handleFindingUserById = async (res, id, extraData = {}) => {
	const user = await pool
		.query('SELECT * FROM users WHERE id = $1', [id])
		.then((response) => response.rows[0] || {});

	if (!user.id && res) {
		res.status(404).json({
			status: 'error',
			message: 'User not found!',
			isAuthorized: false,
		});
	}

	return user;
};
