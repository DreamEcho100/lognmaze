import { handleIsAuthorized } from '../../../../lib/v1/auth';
import { pool } from '../../../../lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'GET') {
		return;
	}

	if (req.method === 'GET') {
		const GUEST = 'GUEST';
		const OWNER = 'OWNER';

		let user_name_id;
		let visitorIdentity = GUEST;
		try {
			user_name_id = req.headers.user_name_id;

			if (!user_name_id) {
				const isAuthorized = await handleIsAuthorized(
					undefined,
					req.headers.authorization
				);

				if (isAuthorized.id) {
					visitorIdentity = OWNER;
					res.status(201).json({
						status: 'success',
						message: 'Authorized!',
						data: {},
						isAuthorized: true,
						visitorIdentity,
					});

					return;
				}
			}

			const user = await pool.query(
				'SELECT * FROM users WHERE user_name_id = $1',
				[user_name_id]
			);

			if (user.rows.length === 0) {
				res.status(401).json({
					status: 'error',
					message: "User doesn't exist!",
					data: {},
					isAuthorized: false,
					visitorIdentity,
				});

				return;
			}

			delete user.rows[0].password;

			return res.status(401).json({
				status: 'success',
				message: 'User exist!',
				data: user.rows[0],
				isAuthorized: false,
				visitorIdentity,
			});
		} catch (error) {
			visitorIdentity = GUEST;
			return res.status(401).json({
				status: 'error',
				message: error.message,
				data: {},
				isAuthorized: false,
				visitorIdentity,
			});
		}
	}
};
