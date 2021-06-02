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

export const getUserByUserName = async (username) => {
	try {
		const user = await pool.query('SELECT * FROM users WHERE user_name = $1', [
			username,
		]);

		if (user.rows.length === 0) {
			return { status: 'error', message: "User doesn't exist!", data: false };
		}

		delete user.rows[0].password;

		return { status: 'error', message: 'User exist!', data: user.rows[0] };
	} catch (error) {
		return { status: 'error', message: error.message, data: false };
	}
};
