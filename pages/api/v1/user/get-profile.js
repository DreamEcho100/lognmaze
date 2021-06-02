import { verifyJwtToken } from '../../../../lib/auth';
import { pool } from '../../../../lib/pg';

export default async (req, res) => {
	if (req.method === 'GET') {
		const GUEST = 'GUEST';
		const OWNER = 'OWNER';

		let isVerified = false;
		let username;
		let visitorIdentity = GUEST;
		try {
			username = req.headers.username;

			const { token } = req.headers;

			if (token && token.length !== 0) {
				isVerified = await verifyJwtToken(token);
			}

			if (isVerified.id) {
				visitorIdentity = OWNER;
				return res.status(201).json({
					status: 'success',
					message: 'Authorized!',
					data: {},
					isVerified: true,
					visitorIdentity,
				});
			}

			const user = await pool.query(
				'SELECT * FROM users WHERE user_name = $1',
				[username]
			);

			if (user.rows.length === 0) {
				return res.status(401).json({
					status: 'error',
					message: "User doesn't exist!",
					data: {},
					isVerified: false,
					visitorIdentity,
				});
			}

			delete user.rows[0].password;

			return res.status(401).json({
				status: 'error',
				message: 'User exist!',
				data: user.rows[0],
				isVerified: false,
				visitorIdentity,
			});
		} catch (error) {
			visitorIdentity = GUEST;
			return res.status(401).json({
				status: 'error',
				message: error.message,
				data: {},
				isVerified: false,
				visitorIdentity,
			});
		}
	}
};
