import pool from '../connection';

export const getUsers = async ({ extraReturn = {}, filterBy }) => {
	const {
		userId = true,
		userPassword,
		userNewsCounter,
		sensitiveInfo,
	} = extraReturn;

	const paramsArr = [];
	const paramsObj = [];
	let whereFilter = '';

	const addParam = (key, obj) => {
		if (!paramsObj[key]) {
			paramsArr.push(obj[key]);
			paramsObj[key] = paramsArr.length;
		}
	};
	// addParam(key, filterBy);

	if (filterBy && typeof filterBy === 'object') {
		whereFilter = 'WHERE';

		const table = {
			email: 'user_account',
			user_name_id: 'user_profile',
			user_profile_id: 'user_profile',
		};

		let key;
		for (key in filterBy) {
			if (key === '$and') {
				const $and = filterBy[key];
				let andKey;
				for (andKey in $and) {
					addParam(andKey, $and);
					whereFilter += ` AND ${table[key]}.${key}=($${paramsObj[key]})`;
				}
			} else if (key === '$in') {
				const $in = filterBy[key];
				let inKey;
				for (inKey in $in) {
					addParam(inKey, $in);
					whereFilter += ` IN ${table[key]}.${key} = ANY($${paramsObj[key]})`;
				}
			} else {
				addParam(key, filterBy);
				whereFilter += ` ${table[key]}.${key}=($${paramsObj[key]})`;
			}
		}
	}

	const sqlQuery = `
    SELECT
    ${userId ? 'user_account.user_account_id AS id' : ''}
    ${
			sensitiveInfo
				? `,user_account.email,
          user_account.email_verified,
          user_account.role`
				: ''
		}
      ${userPassword ? ',user_account.password' : ''}

      user_profile.first_name,
      user_profile.last_name,
      user_profile.profile_picture,
      user_profile.cover_photo,
      user_profile.user_name_id,
      user_profile.gender,
      user_profile.bio,
      ${
				userNewsCounter
					? 'user_profile.news_article_counter, user_profile.news_post_counter,'
					: ''
			}
      user_profile.last_sign_in,
      user_profile.created_at,
      ${sensitiveInfo ? 'user_profile.date_of_birth,' : ''}

    user_address.country_of_resident,
    user_address.state_of_resident,
    user_address.city_of_resident
    ${sensitiveInfo ? ',user_address.address_of_resident' : ''}

    FROM user_account
    JOIN user_profile
      ON user_profile.user_profile_id = user_account.user_account_id
    JOIN user_address ON user_address.user_address_id = user_account.user_account_id
    ${whereFilter}
`;

	return await pool
		.query(sqlQuery, paramsArr)
		.then((response) => {
			if (response.rows.length !== 0) return response.rows[0];
			else return;
		})
		.catch((error) => {
			console.error(`Error, ${error}`);
			return;
		});
};

export const checkIfUserByIdExistAndReturnPasswordIfTrue = async (
	/*res,*/ id
	/*extraData = {}*/
) => {
	const user = await pool
		.query(
			'SELECT user_account_id AS id, password FROM user_account WHERE user_account_id = $1',
			[id]
		)
		.then((response) => response.rows[0]);

	// if (!user.id && res) {
	// 	res.status(404).json({
	// 		status: 'error',
	// 		message: 'User not found!',
	// 		isAuthorized: false,
	// 	});
	// }

	return user;
};
