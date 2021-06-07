import { verifyPassword, jwtGenerator } from '../../../../lib/v1/auth';
import { pool } from '../../../../lib/v1/pg';

export default async (req, res) => {
	// const data = req.body;

	if (req.method !== 'POST') {
		return;
	}

	if (req.method === 'POST') {
		// const users = await selectAllFrom('users');

		try {
			const { email, password } = req.body;

			const user = await pool.query('SELECT * FROM users WHERE email = $1', [
				email,
			]);
			/*

      const token = jwtGenerator(user.rows[0].user_id);

      res.json({ token });
      */
			if (user.rows.length === 0) {
				return res
					.status(401)
					.send({ status: 'error', message: "User doesn't exist!" });
			}

			const validPassword = await verifyPassword(
				undefined,
				password,
				user.rows[0].password
			);

			if (!validPassword) {
				return res
					.status(401)
					.send({ status: 'error', message: 'The password is wrong!' });
			}

			delete user.rows[0].password;

			const jwt = jwtGenerator({
				id: user.rows[0].id,
			});

			res.status(201).json({
				status: 'success',
				message: 'Created user!',
				data: user.rows[0],
				jwt,
			});
		} catch (error) {
			res.status(500).json({ status: 'error', message: error.message });
		}
	}
};
