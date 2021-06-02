import { verifyJwtToken } from '../../../../lib/auth';
import { pool } from '../../../../lib/pg';

export default async (req, res) => {
	if (req.method === 'PATCH') {
		let isVerified = false;

		try {
			const url = req.body.url;
			const token = req.headers.token;

			if (token && token.length !== 0) {
				isVerified = await verifyJwtToken(token);
			}

			if (!token || !isVerified.id) {
				return res.status(401).json({
					status: 'error',
					message: 'Not Authorized!',
					data: {},
					isVerified: false,
				});
			}

			// const user = await pool.query('SELECT * FROM users WHERE id = $1', [
			// 	isVerified.id,
			// ]);

			// if (user.rows.length === 0) {
			// 	res.status(404).json({
			// 		status: 'error',
			// 		message: 'User id not found!',
			// 		isVerified: false,
			// 	});
			// 	return;
			// }

			const updateProfilePicture = await pool.query(
				'UPDATE users SET profile_picture=($1) WHERE id=($2) RETURNING *',
				[url, isVerified.id]
			);

			// delete updateProfilePicture.rows[0].password;

			return res.status(201).json({
				status: 'success',
				message: 'Updated Successefully!',
				data: { profile_picture: updateProfilePicture.rows[0].profile_picture },
				isVerified: true,
			});
		} catch (error) {
			console.error(`Error, ${error}`);
			return res.status(500).json({
				status: 'error',
				message: error.message || 'Something went wrong!',
				data: {},
				isVerified: false,
			});
		}
	}
};
