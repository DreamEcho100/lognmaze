import { verifyJwtToken } from '../../../../lib/auth';
import { getUserByUserName } from '../../../../lib/pg';

export default async (req, res) => {
	if (req.method === 'GET') {
		const GUEST = 'GUEST';
		const OWNER = 'OWNER';

		let isVerified = false;
		let username;
		let profileData = {
			status: 'error',
			message: 'No User Found',
			data: false,
		};
		let visitorIdentity = GUEST;
		try {
			username = req.headers.username;

			const { token } = req.headers;

			if (token && token.length !== 0) {
				isVerified = await verifyJwtToken(token);
			}

			if (isVerified.email) {
				visitorIdentity = OWNER;
				return res.status(201).json({
					status: 'success',
					message: 'Authorized!',
					isVerified: true,
					visitorIdentity,
				});
			}

			if (username) {
				profileData = await getUserByUserName(username);
			}
			res.status(401).json({
				status: 'error',
				message: 'Not Authorized!',
				isVerified: false,
				profileData,
				visitorIdentity,
			});
		} catch (error) {
			if (username) {
				profileData = await getUserByUserName(username);
			}

			res.status(500).json({
				status: 'error',
				message: error.message,
				isVerified: false,
				profileData,
				visitorIdentity,
			});
		}
	}
};
