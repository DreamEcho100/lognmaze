import { hashPassword, isAuthorized, verifyPassword } from '@coreLib/auth';
import pool from '@coreLib/db/pg/connection';
import { NextApiRequest, NextApiResponse } from 'next';
import { TCheckIfUserExist, TTablesColumns } from './ts';

const checkIfUserExist: TCheckIfUserExist = async (
	res,
	id,
	extraReturns = {
		returnPassword: false,
	}
) => {
	if (!res) {
		throw new Error('User not found!');
	}

	const user = await pool
		.query(
			`SELECT user_account_id AS id${
				extraReturns.returnPassword ? ', password' : ''
			} FROM user_account WHERE user_account_id = $1`,
			[id]
		)
		.then((response: { rows: any[] }) => response.rows[0] || {});

	if (!user.id) {
		res.status(404);
		throw new Error('User not found!');
	}

	return user;
};

// @desc    Update User By Id
// @route   UPDATE /api/users/user/byId
// @access  Private
export const updateUserByIdController = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const user_profileTable = {
		bio: {
			requirePassword: false,
		},
		cover_photo: {
			requirePassword: false,
		},
		first_name: {
			requirePassword: true,
		},
		gender: {
			requirePassword: true,
		},
		last_name: {
			requirePassword: true,
		},
		profile_picture: {
			requirePassword: false,
		},
		user_name_id: {
			requirePassword: true,
		},
	};

	const user_accountTable = {
		email: {
			requirePassword: true,
		},
		password: {
			requirePassword: false,
		},
	};

	const targets: typeof user_profileTable & typeof user_accountTable =
		req.body.targets;

	if (!req.headers.authorization) {
		res.status(401);
		throw new Error("User authorization doesn't allow the access");
	}

	const authorizedUser = await isAuthorized(res, req.headers.authorization);

	if (authorizedUser.payload.id !== req.query.byId) {
		res.status(401);
		throw new Error("User authorization doesn't allow the access");
	}

	let sqlQuery = '';
	const sqlQuerySet = [];
	const sqlQueryReturning: TTablesColumns[] = [];
	const sqlQueryParams = [];
	let targetedTable = '';
	// let sqlQueryParamsIndex = {};
	let requirePassword = false;
	let userPassword;

	if (!req.body.oldPassword || !req.body.newPassword) {
		let target: TTablesColumns;
		let targetData: {
			requirePassword: boolean;
		} = {
			requirePassword: false,
		};

		for (target in targets) {
			if (user_profileTable[target as keyof typeof user_profileTable]) {
				if (targetedTable !== 'user_profile') targetedTable = 'user_profile';
				targetData =
					user_profileTable[target as keyof typeof user_profileTable];
			} else if (user_accountTable[target as keyof typeof user_accountTable]) {
				if (targetedTable !== 'user_account') targetedTable = 'user_account';
				targetData =
					user_accountTable[target as keyof typeof user_accountTable];
			}

			if (!targetData) {
				res.status(404);
				throw new Error('Undefined target to update!');
			}

			if (targetData.requirePassword)
				if (!requirePassword) requirePassword = true;

			sqlQueryParams.push(targets[target]);

			sqlQuerySet.push(`${target}=($${sqlQueryParams.length})`);

			sqlQueryReturning.push(target);
		}

		if (sqlQueryParams.length === 0) {
			res.status(404);
			throw new Error('Undefined target/s!');
		}
	} else {
		targetedTable = 'user_account';

		if (!requirePassword) requirePassword = true;

		const hashedPassword = await hashPassword(req.body.newPassword);

		sqlQueryParams.push(hashedPassword);

		sqlQuerySet.push(`password=($${sqlQueryParams.length})`);
	}

	if (requirePassword) {
		userPassword = req.body.password || req.body.oldPassword;

		const user = await checkIfUserExist(res, authorizedUser.payload.id);

		const validPassword = await verifyPassword({
			res,
			password: userPassword,
			hashedPassword: user.password,
		});

		if (!validPassword) return;
	}

	sqlQueryParams.push(authorizedUser.payload.id);

	sqlQuery += `
		UPDATE ${targetedTable} SET ${sqlQuerySet.join(',')}
		WHERE ${targetedTable}_id = ($${sqlQueryParams.length})
		${
			sqlQueryReturning.length !== 0
				? `RETURNING ${sqlQueryReturning.join(',')}`
				: ''
		}
	`;

	const updatedUser = await pool
		.query(sqlQuery, sqlQueryParams)
		.then((response: { rows: any[] }) => response.rows[0]);

	if (!updatedUser /*  || !updatedUser.id */) {
		res.status(404);
		throw new Error("User/s data doesn't exist");
	}

	return res.status(200).json(updatedUser);
};

const byIdController = {
	update: updateUserByIdController,
};

export default byIdController;
