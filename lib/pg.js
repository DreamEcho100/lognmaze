const Pool = require('pg').Pool;

export const pool = new Pool({
	user: 'postgres',
	password: 'tset',
	host: 'localhost',
	port: 5432,
	database: 'mazecode',
});

export const selectAllFrom = async ({ table }) => {
	return await pool.query(`SELECT * FROM ${table}`);
};
