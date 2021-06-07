import { hashPassword, jwtGenerator } from '../../../../lib/v1/auth';
import { pool } from '../../../../lib/v1/pg';

export default async (req, res) => {
	// const data = req.body;

	if (req.method !== 'POST') {
		return;
	}

	if (req.method === 'POST') {
		// const users = await selectAllFrom('users');

		try {
			const {
				firstName,
				lastName,
				userNameId,
				email,
				password,
				dateOfBirth,
				country,
				state,
				city,
				countryPhoneCode,
				phoneNumber,
				gender,
			} = req.body;

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
				'INSERT INTO users ( first_name, last_name, user_name_id, email, password, date_of_birth, country, state, city, country_phone_code, phone_number, gender) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
				[
					firstName,
					lastName,
					userNameId,
					email,
					hashedPassword,
					dateOfBirth,
					country,
					state,
					city,
					countryPhoneCode,
					phoneNumber,
					gender,
				]
			);

			delete newUser.rows[0].password;

			console.log(newUser);

			const jwt = jwtGenerator({
				id: newUser.rows[0].id,
			});

			res.status(201).json({
				status: 'success',
				message: 'Created user!',
				data: newUser.rows[0],
				jwt,
			});
		} catch (error) {
			res.status(500).json({ status: 'error', message: error.message });
		}
	}
};
