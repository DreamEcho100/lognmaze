// import { handleIsAuthorized } from '@lib/v1/auth';
import { getUserData } from '@lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'GET') {
		return;
	}

	if (req.method === 'GET') {
		// const GUEST = 'GUEST';
		// const OWNER = 'OWNER';

		let user_name_id;
		// let visitorIdentity = GUEST;
		try {
			user_name_id = req.query.user_name_id;

			/*
			if (req.headers.authorization) {
				const isAuthorized = await handleIsAuthorized(
					undefined,
					req.headers.authorization
				);

				if (isAuthorized.id) { 
					// visitorIdentity = OWNER;
					// res.status(201).json({
					// 	status: 'success',
					// 	message: 'Authorized!',
					// 	data: {},
					// 	isAuthorized: true,
					// 	visitorIdentity,
					// });
					// return;
				}
			}
			*/

			const user = await getUserData({
				filterBy: {
					// 'user_profile.user_name_id': user_name_id,
					user_name_id,
				},
				withPassword: false,
				withSensitiveInfo: false,
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
				message: 'User exist!',
				data: user,
				// visitorIdentity,
			});
		} catch (error) {
			// visitorIdentity = GUEST;
			return res.status(401).json({
				status: 'error',
				message: error.message,
				data: {},
				// visitorIdentity,
			});
		}
	}
};
