import { hashPassword, jwtGenerator } from '@/lib/v1/auth';
import { pool } from '@/lib/v1/pg';

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
			console.table({
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
			});

			const user = await pool.query('SELECT * FROM users WHERE email = $1', [
				email,
			]);

			if (user.rows.length !== 0) {
				return res
					.status(401)
					.json({ status: 'error', message: 'User already exist!' });
			}

			const hashedPassword = await hashPassword(password);

			const newUser = await pool
				.query(
					`
					INSERT INTO users
					 ( user_name_id, email, password, country_phone_code, phone_number )
					VALUES
						( $1, $2, $3, $4, $5 )
					RETURNING *;
				`,
					[userNameId, email, hashedPassword, countryPhoneCode, phoneNumber]
				)
				.then(async (response) => {
					delete response.rows[0].password;

					const response2 = await pool.query(
						`
							WITH add_new_user_profile as (
								INSERT INTO users_profile
									( user_id, first_name, last_name, date_of_birth, country, state, city, gender )
								VALUES
									( $1, $2, $3, $4, $5, $6, $7, $8 )
								RETURNING *
							),
							add_new_user_experience as (
								INSERT INTO users_experience
									( user_id )
								VALUES
									( $1 )
								RETURNING id
							)
							
							SELECT * FROM add_new_user_profile, add_new_user_experience;
						`,
						[
							response.rows[0].id,
							firstName,
							lastName,
							dateOfBirth,
							country,
							state,
							city,
							gender,
						]
					);

					return {
						...response.rows[0],
						...response2.rows[0],
					};
				});


			const jwt = jwtGenerator({
				id: newUser.id,
			});

			res.status(201).json({
				status: 'success',
				message: 'Created user!',
				data: newUser,
				jwt,
			});
		} catch (error) {
			res.status(500).json({ status: 'error', message: error.message });
		}
	}
};
