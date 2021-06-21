import { verifyPassword, jwtGenerator } from '@/lib/v1/auth';
import { pool } from '@/lib/v1/pg';

export default async (req, res) => {
	// const data = req.body;

	if (req.method !== 'POST') {
		return;
	}

	if (req.method === 'POST') {
		// const users = await selectAllFrom('users');

		try {
			const { email, password } = req.body;

			const user = await pool.query(
				`
					SELECT

						users_profile.*,

						users_experience.*,
						
						users.*

					FROM
						users
					JOIN users_profile
						ON users_profile.user_id = users.id
					JOIN users_experience
						ON users_experience.user_id = users.id
					WHERE users.email = $1
				`,
				[email]
			);

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

// -- users.user_name_id,
// -- users.email,
// -- users.email_verified,
// -- users.show_email,
// -- users.password,
// -- users.country_phone_code,
// -- users.phone_number,
// -- users.phone_verified,
// -- users.show_phone_number,
// -- users.role,
// -- users.created_at,

// -- users_profile.first_name,
// -- users_profile.last_name,
// -- users_profile.date_of_birth,
// -- users_profile.show_date_of_birth,
// -- users_profile.country,
// -- users_profile.state,
// -- users_profile.show_address,
// -- users_profile.gender,

// -- users_profile.profile_picture,
// -- users_profile.cover_photo,
// -- users_profile.bio,
// -- users_profile.bio_format_type,
// -- users_profile.show_bio,
// -- users_profile.last_sign_in,
// -- users_experience.cv,
// -- users_experience.cv_format_type,
// -- users_experience.experience,
// -- users_experience.education,
// -- users_experience.licenses_and_certifications,
// -- users_experience.skills_and_endorsements
