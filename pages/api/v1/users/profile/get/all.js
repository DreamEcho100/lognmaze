import { pool } from '../../../../../../lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'GET') {
		return;
	}

	if (req.method === 'GET') {
		try {
			const result = await pool
				.query('SELECT * FROM users;')
				.then((response) => response.rows);

			return res.status(200).json({
				status: 'success',
				message: 'Users Profiles Arrived Successefully! `o`',
				data: result,
			});
		} catch (error) {
			console.error(`Error, ${error}`);
			return res.status(500).json({
				status: 'error',
				message: error.message || 'Something went wrong!',
			});
		}
	}
};
