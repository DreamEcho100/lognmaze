import { hashPassword, jwtGenerator } from '@lib/v1/auth';
import { pool } from '@lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'POST') {
		return;
	}

	if (req.method === 'POST') {
		try {
			const {
				email,
				password,
				phone_number,

				user_name_id,
				first_name,
				last_name,
				date_of_birth,
				gender,
				country,
				state,
				city,
			} = req.body;

			const user = await pool.query(
				'SELECT email FROM user_account WHERE email = $1',
				[email]
			);

			if (user.rows.length !== 0) {
				return res
					.status(401)
					.json({ status: 'error', message: 'User already exist!' });
			}

			console.log('req.body', req.body);
			console.log('password', password);
			const hashedPassword = await hashPassword(password);
			console.log('hashedPassword', hashedPassword);

			const newUser = await pool
				.query(
					`
					INSERT INTO user_account
					 ( email, password, phone_number )
					VALUES
						( $1, $2, $3 )
					RETURNING
						user_account_id AS id,
						email,
						email_verified,
						phone_number,
						phone_verified,
						role
					;
				`,
					[email, hashedPassword, phone_number]
				)
				.then(async (response) => {
					delete response.rows[0].password;

					const response2 = await pool.query(
						`
							WITH add_new_user_profile as (
								INSERT INTO user_profile
									(
										user_profile_id,
										user_name_id,
										first_name,
										last_name,
										date_of_birth,
										gender
									)
								VALUES
									( $1, $2, $3, $4, $5, $6 )
								RETURNING 
									first_name,
									last_name,
									user_name_id,
									date_of_birth,
									gender,
									profile_picture,
									cover_photo,
									bio,
									news_article_counter,
									news_post_counter,
									created_at,
									last_sign_in
							),
							add_new_user_address as (
								INSERT INTO user_address
									(
										user_address_id,
										country_of_resident,
										state_of_resident,
										city_of_resident
									)
								VALUES
									( $1, $7, $8, $9 )
								RETURNING
									country_of_birth,
									state_of_birth,
									city_of_birth,
									country_of_resident,
									state_of_resident,
									city_of_resident,
									address_of_resident
							)
							
							SELECT * FROM add_new_user_profile, add_new_user_address;
						`,
						[
							response.rows[0].id,
							user_name_id,
							first_name,
							last_name,
							date_of_birth,
							gender,
							country,
							state,
							city,
						]
					);

					return {
						...response2.rows[0],
						...response.rows[0],
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
