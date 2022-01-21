import pool from '../connection';

// getUsersPropsDefaults example
// {
// 	extraReturns: {
// 		user_id: true,
// 	},
// 	filterBy: [
// 		[
// 			{
// 				name: 'email',
// 				value: 'maze6572198@gmail.com',
// 				priority: 'AND',
// 			},
// 			{
// 				name: 'id',
// 				value: '3dc41ced-32bc-4c2a-bb80-f5f4aff1ad8f',
// 				priority: 'AND',
// 			},
// 		],
// 		{
// 			type: '$any',
// 			priority: 'AND',
// 			targets: [
// 				{
// 					name: 'email',
// 					value: ['maze6572198@gmail.com'],
// 					priority: 'AND',
// 				},
// 				{
// 					name: 'email',
// 					value: ['maze6572198@gmail.com'],
// 					priority: 'AND',
// 				},
// 			],
// 		},

// 	],
// };

// const getUsersPropsDefaults = {
// 	extraReturns: {
// 		user_id: true,
// 	},
// };

const extraReturns = {
	user_id: true,
};
export const getUsers = async ({
	extraReturns = {
		user_id: true,
	},
	filterBy,
}) => {
	const { user_id, user_password, user_news_counter, sensitiveInfo } =
		extraReturns;

	const paramsArr = [];
	const paramsObj = [];
	let whereFilter = '';

	const addParam = (name, value, preNameTitle = '') => {
		if (!paramsObj[preNameTitle + name]) {
			paramsObj[preNameTitle + name] = paramsArr.push(value);
			return true;
		}

		return false;
	};

	const getTableAndColumnNames = (tableAndColumns, name) => {
		return `${tableAndColumns[name].table}.${tableAndColumns[name].column}`;
	};

	if (Array.isArray(filterBy) && filterBy.length !== 0) {
		const tableAndColumns = {
			email: {
				table: 'user_account',
				column: 'email',
			},
			user_name_id: {
				table: 'user_profile',
				column: 'user_name_id',
			},
			id: {
				table: 'user_profile',
				column: 'user_profile_id',
			},
		};

		const priorityOptions = {
			and: 'AND',
			or: 'OR',
		};

		const chooseFilter = (item) => {
			if (Array.isArray(item)) {
				for (let j = 0; j < item.length; j++) {
					if (!addParam(item[j].name, item[j].value)) {
						continue;
					}

					if (whereFilter.length !== 0)
						whereFilter +=
							' ' + (priorityOptions[item[j].priority]?.toLowerCase() || 'AND');
					whereFilter += ` ${getTableAndColumnNames(
						tableAndColumns,
						item[j].name
					)} = ($${paramsObj[item[j].name]})`;
				}

				return;
			}

			switch (item.type) {
				case '$any': {
					if (whereFilter.length !== 0)
						whereFilter +=
							' ' + (priorityOptions[item.priority]?.toLowerCase() || 'AND');
					let anyKey;
					for (anyKey in item.targets) {
						if (
							!addParam(
								item.targets[anyKey].name,
								item.targets[anyKey].value,
								'$any_'
							)
						) {
							continue;
						}
						if (whereFilter.length !== 0)
							whereFilter +=
								' ' +
								(priorityOptions[
									item.targets[anyKey].priority
								]?.toLowerCase() || 'AND');
						whereFilter += ` ${getTableAndColumnNames(
							tableAndColumns,
							item.targets[anyKey].name
						)} = ANY($${paramsObj['$any_' + item.targets[anyKey].name]})`;
					}
					break;
				}

				default:
					break;
			}
		};

		let i;
		for (i = 0; i < filterBy.length; i++) {
			chooseFilter(filterBy[i]);
		}

		if (whereFilter.length !== 0) whereFilter = 'WHERE' + whereFilter;
	}

	const sqlQuery = `
    SELECT
    ${user_id ? 'user_account.user_account_id AS id,' : ''}
    ${
			sensitiveInfo
				? `user_account.email,
          user_account.email_verified,
          user_account.role,`
				: ''
		}
      ${user_password ? 'user_account.password,' : ''}

      user_profile.first_name,
      user_profile.last_name,
      user_profile.profile_picture,
      user_profile.cover_photo,
      user_profile.user_name_id,
      user_profile.gender,
      user_profile.bio,
      ${
				user_news_counter
					? 'user_profile.news_blog_counter, user_profile.news_post_counter,'
					: ''
			}
      user_profile.last_sign_in,
      user_profile.created_at,
      ${sensitiveInfo ? 'user_profile.date_of_birth,' : ''}

    user_address.country_of_resident,
    user_address.state_of_resident,
    user_address.city_of_resident
    ${sensitiveInfo ? ',user_address.address_of_resident' : ''}

		FROM
			user_account
		JOIN user_profile
			ON user_profile.user_profile_id = user_account.user_account_id
			LEFT JOIN user_address
			ON user_address.user_address_id = user_account.user_account_id
    ${whereFilter}
`;

	const result = await pool
		.query(sqlQuery, paramsArr)
		.then((response) => response.rows)
		.catch((error) => {
			return {
				errorMessage: error.message,
			};
		});

	if (result.errorMessage) {
		throw new Error(result.errorMessage);
	}

	return result;
};

const DBUsers = {
	get: getUsers,
};

export default DBUsers;
