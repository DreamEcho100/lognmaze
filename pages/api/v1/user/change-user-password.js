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

			if (!isVerified.email) {
				res.status(401).json({
					status: 'error',
					message: 'Not Authorized!',
					isVerified: false,
				});

				return;
			}

			const { oldPassword, newPassword } = req.body;

			const user = await pool.query('SELECT * FROM users WHERE email = $1', [
				isVerified.email,
			]);

			const validPassword = await verifyPassword(
				oldPassword,
				user.rows[0].password
			);

			if (!validPassword) {
				res.status(200).json({
					status: 'error',
					message: 'Invalid password!',
					isVerified: true,
				});
				return;
			}

			const hashedPassword = await hashPassword(newPassword);

			const updateProfilePicture = await pool.query(
				'UPDATE users SET password=($1) WHERE email=($2)', //  RETURNING *
				[hashedPassword, isVerified.email]
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
