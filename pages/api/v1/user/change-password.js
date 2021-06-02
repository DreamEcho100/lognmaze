import {
	verifyJwtToken,
	verifyPassword,
	hashPassword,
} from '../../../../lib/auth';
import { pool } from '../../../../lib/pg';

export default async (req, res) => {
	if (req.method !== 'PATCH') {
		return;
	}

	if (req.method === 'PATCH') {
		try {
			const { token } = req.headers;
			let isVerified;

			if (token && token.length !== 0) {
				isVerified = await verifyJwtToken(token);
			}

			if (!isVerified.id) {
				res.status(401).json({
					status: 'error',
					message: 'Not Authorized!',
					isVerified: false,
				});

				return;
			}

			const { oldPassword, newPassword } = req.body;

			const user = await pool.query('SELECT * FROM users WHERE id = $1', [
				isVerified.id,
			]);

			if (user.rows.length === 0) {
				res.status(404).json({
					status: 'error',
					message: 'User id not found!',
					isVerified: false,
				});
				return;
			}

			const validPassword = await verifyPassword(
				oldPassword,
				user.rows[0].password
			);

			if (!validPassword) {
				res.status(403).json({
					status: 'error',
					message: 'Invalid password!',
					isVerified: true,
				});
				return;
			}

			const hashedPassword = await hashPassword(newPassword);

			const updateProfilePicture = await pool.query(
				'UPDATE users SET password=($1) WHERE id=($2)', //  RETURNING *
				[hashedPassword, isVerified.id]
			);

			res.status(201).json({
				status: 'success',
				message: 'Password updated!',
				isVerified: true,
			});
		} catch (error) {
			// console.error(error);
			res.status(500).json({
				status: 'error',
				message: error.message || 'Something went wrong!',
				isVerified: false,
			});
		}
	}
};
