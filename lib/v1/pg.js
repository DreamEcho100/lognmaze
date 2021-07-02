const { Pool } = require('pg');

export const connectionString = process.env.PG_CONNECTION_STRING;

export const pool = new Pool({
	connectionString,
});

export const selectAllFrom = async ({ table }) => {
	return await pool.query(`SELECT * FROM ${table}`);
};

export const checkUserExistAndReturnPasswordById = async (
	res,
	id,
	extraData = {}
) => {
	const user = await pool
		.query(
			'SELECT user_account_id AS id, password FROM user_account WHERE user_account_id = $1',
			[id]
		)
		.then((response) => response.rows[0] || {});

	if (!user.id && res) {
		res.status(404).json({
			status: 'error',
			message: 'User not found!',
			isAuthorized: false,
		});
	}

	return user;
};

const userAccountKeys = (withId, withPassword) => {
	return `
		${withId ? 'user_account.user_account_id AS id,' : ''}
		user_account.user_name_id,
		user_account.email,
		user_account.email_verified,
		user_account.show_email,
		${withPassword ? 'user_account.password,' : ''}
		user_account.country_phone_code,
		user_account.phone_number,
		user_account.phone_verified,
		user_account.show_phone_number,
		user_account.role,
		user_account.created_at,
		user_account.last_sign_in
	`;
};

const userProfileKeys = (withId) => {
	return `
		${withId ? 'user_profile.user_profile_id AS id,' : ''}
		user_profile.first_name,
		user_profile.last_name,
		user_profile.date_of_birth,
		user_profile.show_date_of_birth,
		user_profile.gender,
		user_profile.profile_picture,
		user_profile.cover_photo,
		user_profile.bio,
		user_profile.bio_format_type,
		user_profile.show_bio
	`;
};

const userAddressKeys = (withId) => {
	return `
		${withId ? 'user_address.user_address_id AS id,' : ''}
		user_address.country_of_birth,
		user_address.state_of_birth,
		user_address.city_of_birth,
		user_address.show_address_of_birth,
		user_address.country_of_resident,
		user_address.state_of_resident,
		user_address.city_of_resident,
		user_address.address_of_resident,
		user_address.show_address_of_resident
	`;
};

export const getUserData = async ({ filterBy, withPassword }) => {
	return await pool
		.query(
			`
				SELECT
					${userAccountKeys(true, withPassword)},

					${userProfileKeys()},

					${userAddressKeys()}
				FROM
					user_account
				JOIN user_profile
					ON user_profile.user_profile_id = user_account.user_account_id
				JOIN user_address
					ON user_address.user_address_id = user_account.user_account_id
				${filterBy.key ? `WHERE user_account.${filterBy.key} = $1` : ''}
			`,
			[filterBy.value]
		)
		.then((response) => (response.rows.length !== 0 ? response.rows[0] : {}));
};
