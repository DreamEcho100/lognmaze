import { hashPassword, jwtGenerator } from '@/lib/v1/auth';
import { pool } from '@/lib/v1/pg';

export default async (req, res) => {
	// const data = req.body;

	if (req.method !== 'POST') {
		return;
	}

	if (req.method === 'POST') {
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

			const user = await pool.query(
				'SELECT email FROM user_account WHERE email = $1',
				[email]
			);

			if (user.rows.length !== 0) {
				return res
					.status(401)
					.json({ status: 'error', message: 'User already exist!' });
			}

			const hashedPassword = await hashPassword(password);

			const newUser = await pool
				.query(
					`
					INSERT INTO user_account
					 ( email, password, country_phone_code, phone_number )
					VALUES
						( $1, $2, $3, $4 )
					RETURNING
						user_account_id AS id,
						email,
						email_verified,
						show_email,
						country_phone_code,
						phone_number,
						phone_verified,
						show_phone_number,
						role,
						created_at,
						last_sign_in
					;
				`,
					[email, hashedPassword, countryPhoneCode, phoneNumber]
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
									date_of_birth,
									show_date_of_birth,
									gender,
									profile_picture,
									cover_photo,
									bio,
									bio_format_type,
									show_bio
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
									show_address_of_birth,
									country_of_resident,
									state_of_resident,
									city_of_resident,
									address_of_resident,
									show_address_of_resident
							)
							
							SELECT * FROM add_new_user_profile, add_new_user_address;
						`,
						[
							response.rows[0].id,
							userNameId,
							firstName,
							lastName,
							dateOfBirth,
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
