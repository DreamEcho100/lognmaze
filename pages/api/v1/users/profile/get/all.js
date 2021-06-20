import { pool } from '../../../../../../lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'GET') {
		return;
	}

	if (req.method === 'GET') {
		try {
			const result = await pool
				.query(
					// 'SELECT * FROM users'
					`
						SELECT
							users_profile.*,

							users_experience.*,

							users.*

						FROM
							users
						JOIN users_profile
							ON users_profile.user_id = users.id
						JOIN users_experience
							ON users_experience.user_id = users.id
					`
				)
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
