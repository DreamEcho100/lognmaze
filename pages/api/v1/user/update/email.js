import { verifyJwtToken, verifyPassword } from '../../../../../lib/auth';
import { pool } from '../../../../../lib/pg';

export default async (req, res) => {
	if (req.method !== 'PATCH') {
		return;
	}

	if (req.method === 'PATCH') {
		try {
			const token = req.headers.authorization.split(' ')[1];
			let isAuthorized;

			if (token && token.length !== 0) {
				isAuthorized = await verifyJwtToken(token);
			}

			if (!isAuthorized.id) {
				res.status(401).json({
					status: 'error',
					message: 'Not Authorized!',
					isAuthorized: false,
				});

				return;
			}

			const { email, password } = req.body;

			const user = await pool.query('SELECT * FROM users WHERE id = $1', [
				isAuthorized.id,
			]);

			if (user.rows.length === 0) {
				res.status(404).json({
					status: 'error',
					message: 'User id not found!',
					isAuthorized: false,
				});
				return;
			}

			const validPassword = await verifyPassword(
				password,
				user.rows[0].password
			);

			if (!validPassword) {
				res.status(403).json({
					status: 'error',
					message: 'Invalid password!',
					isAuthorized: true,
				});
				return;
			}

			const updateProfilePicture = await pool.query(
				'UPDATE users SET email=($1) WHERE id=($2) RETURNING *', //  RETURNING *
				[email, isAuthorized.id]
			);

			res.status(201).json({
				status: 'success',
				message: 'Password updated!',
				isAuthorized: true,
				data: { email },
			});
		} catch (error) {
			// console.error(error);
			res.status(500).json({
				status: 'error',
				message: error.message || 'Something went wrong!',
				isAuthorized: false,
			});
		}
	}
};
