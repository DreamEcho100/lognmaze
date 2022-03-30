import { YEAR_IN_MILLIE_SECONDS } from '@coreLib/constants';
import { IUserAuthenticatedData } from '@coreLib/ts/global';
// import pool from '../../connection';
import pool from '@coreLib/db/pg/connection';
import { TGetUsers } from '../../ts';
import { chooseFilter } from '../../utils';

const tableAndItsColumns = {
	byUserEmail: {
		table: 'user_account',
		column: 'email',
	},
	byUserNameId: {
		table: 'user_profile',
		column: 'user_name_id',
	},
	byUserId: {
		table: 'user_profile',
		column: 'user_profile_id',
	},
	//
	byUsersEmail: {
		table: 'user_account',
		column: 'email',
	},
	byUsersNameId: {
		table: 'user_profile',
		column: 'user_name_id',
	},
	byUsersId: {
		table: 'user_profile',
		column: 'user_profile_id',
	},
};

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
export const getUsers: TGetUsers = async ({
	extraReturns = {
		user_id: true,
	},
	filterBy,
}) => {
	const { user_id, user_password, user_news_counter, sensitiveInfo } =
		extraReturns;

	const paramsArr: any[] = [];
	const paramsObj: { [key: string]: number } = {};
	let whereFilter = '';

	if (Array.isArray(filterBy) && filterBy.length !== 0) {
		let i;
		for (i = 0; i < filterBy.length; i++) {
			whereFilter += chooseFilter({
				whereFilter,
				paramsObj,
				paramsArr,
				item: filterBy[i],
				tableAndItsColumns,
			});
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
		
		FROM
		user_account
		JOIN user_profile
		ON user_profile.user_profile_id = user_account.user_account_id
		LEFT JOIN user_address
		ON user_address.user_address_id = user_account.user_account_id
    ${whereFilter}
		`;
	// ${sensitiveInfo ? ',user_address.address_of_resident' : ''}

	const result: any | { errorMessage: string } = await pool
		.query(sqlQuery, paramsArr)
		// .then((response: { rows: any[] }) => response.rows)
		.catch((error: Error) => {
			return {
				errorMessage:
					error instanceof Error
						? error.message
						: 'Error, Something went wrong!',
			};
		});

	if (result.errorMessage) {
		throw new Error(result.errorMessage);
	}

	return result;
};

const createUserSession = async (
	user_id: IUserAuthenticatedData['id'],
	login_start_date: string = new Date().toISOString(),
	login_end_date: string = new Date(
		Date.now() + YEAR_IN_MILLIE_SECONDS
	).toISOString()
) => {
	const userSession: {
		user_session_id: string;
		login_start_date: string;
		login_end_date: string;
	} = await pool
		.query(
			`
		INSERT INTO user_session
			(user_id, login_start_date, login_end_date)
		VALUES ($1, $2, $3)
		RETURNING user_session_id, login_start_date, login_end_date
	`,
			[user_id, login_start_date, login_end_date]
		)
		.then((response: { rows: any[] }) => response.rows[0]);

	return userSession;
};

const usersActions = {
	get: getUsers,
	createSession: createUserSession,
};

export default usersActions;
