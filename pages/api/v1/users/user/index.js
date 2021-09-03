import { handleIsAuthorized, hashPassword, verifyPassword } from '@lib/v1/auth';
import {
	pool,
	getUserData,
	checkUserExistAndReturnPasswordById,
} from '@lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'GET' && req.method !== 'PATCH') {
		return res.end();
	}

	if (req.method === 'GET') {
		// const GUEST = 'GUEST';
		// const OWNER = 'OWNER';

		let user_name_id;
		// let visitorIdentity = GUEST;
		try {
			const filterBy = {};
			let withSensitiveInfo = false;

			if (req.query.user_name_id) {
				user_name_id = req.query.user_name_id;
				filterBy.user_name_id = req.query.user_name_id;
			}

			if (req.query.filter_by_user_id) {
				const isAuthorized = await handleIsAuthorized(
					res,
					req.headers.authorization
				);

				if (!isAuthorized.id) return;

				filterBy.user_profile_id = isAuthorized.id;

				withSensitiveInfo = true;
			}

			const user = await getUserData({
				filterBy,
				withPassword: false,
				withSensitiveInfo,
			});

			if (!user && !user.id) {
				res.status(401).json({
					status: 'error',
					message: "User doesn't exist!",
					data: {
						// id: isAuthorized.id,
					},
					// visitorIdentity,
				});

				return;
			}

			// delete user.rows[0].password;

			return res.status(200).json({
				status: 'success',
				message: 'User exist!, and it is data retrieved successfully!',
				data: user,
				// visitorIdentity,
			});
		} catch (error) {
			// visitorIdentity = GUEST;
			return res.status(500).json({
				status: 'error',
				message: error.message,
				data: {},
				// visitorIdentity,
			});
		}
	}

	if (req.method === 'PATCH') {
		try {
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

			const { targets } = req.body;

			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			let sqlQuery = '';
			let sqlQuerySet = [];
			let sqlQueryReturning = [];
			let sqlQueryParams = [];
			let targetedTable = '';
			// let sqlQueryParamsIndex = {};
			let requirePassword = false;
			let userPassword;

			if (!req.body.oldPassword || !req.body.newPassword) {
				let target;
				let targetData;

				for (target in targets) {
					if (user_profileTable[target]) {
						if (targetedTable !== 'user_profile')
							targetedTable = 'user_profile';
						targetData = user_profileTable[target];
					} else if (user_accountTable[target]) {
						if (targetedTable !== 'user_account')
							targetedTable = 'user_account';
						targetData = user_accountTable[target];
					}

					if (!targetData) {
						return res.status(404).json({
							status: 'error',
							message: 'Undefined target/s!',
							data: {},
						});
					}

					if (targetData.requirePassword)
						if (!requirePassword) requirePassword = true;

					sqlQueryParams.push(targets[target]);

					sqlQuerySet.push(`${target}=($${sqlQueryParams.length})`);

					sqlQueryReturning.push(target);
				}

				if (sqlQueryParams.length === 0) {
					return res.status(404).json({
						status: 'error',
						message: 'Undefined target/s!',
						data: {},
					});
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

				const user = await checkUserExistAndReturnPasswordById(
					res,
					isAuthorized.id
				);

				if (!user.id) return;

				const validPassword = await verifyPassword({
					res,
					password: userPassword,
					hashedPassword: user.password,
				});

				if (!validPassword) return;
			}

			sqlQueryParams.push(isAuthorized.id);

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
				.then((response) => response.rows[0] || {});

			return res.status(200).json({
				status: 'success',
				message: 'Changed Successfully!',
				data: updatedUser,
			});
		} catch (error) {
			return res.status(500).json({
				status: 'error',
				message: error.message,
				data: {},
			});
		}
	}
};
