import { hashPassword, jwtGenerator } from '../../../../lib/auth';
import { pool } from '../../../../lib/pg';

export default async (req, res) => {
	// const data = req.body;

	if (req.method !== 'POST') {
		return;
	}

	if (req.method === 'POST') {
		// const users = await selectAllFrom('users');

		try {
			const { firstName, lastName, userName, email, password, gender } =
				req.body;

			const user = await pool.query('SELECT * FROM users WHERE email = $1', [
				email,
			]);

			if (user.rows.length !== 0) {
				return res
					.status(401)
					.json({ status: 'error', message: 'User already exist!' });
			}

			const hashedPassword = await hashPassword(password);

			const newUser = await pool.query(
				"INSERT INTO users ( first_name, last_name, user_name, email, password, gender, role) VALUES ($1, $2, $3, $4, $5, $6, 'user') RETURNING *",
				[firstName, lastName, userName, email, hashedPassword, gender]
			);

			delete newUser.rows[0].password;

			const jwt = jwtGenerator({
				user_name: newUser.rows[0].user_name,
				email: user.rows[0].email,
			});

			res.status(201).json({
				status: 'success',
				message: 'Created user!',
				user: newUser.rows[0],
				jwt,
			});
		} catch (error) {
			res.status(500).json({ status: 'error', message: error.message });
		}
	}
};
