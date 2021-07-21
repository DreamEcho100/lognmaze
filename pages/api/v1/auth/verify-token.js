import { verifyJwtToken } from '@lib/v1/auth';

export default async (req, res) => {
	if (req.method === 'POST') {
		try {
			const token = req.headers.authorization.split(' ')[1];

			const isAuthorized = await verifyJwtToken(token);

			if (isAuthorized) {
				return res.status(200).json({
					status: 'success',
					message: 'Authorized!',
					data: {
						isAuthorized: true,
					},
				});
			}

			return res.status(401).json({
				status: 'error',
				message: 'Unauthorized!',
				data: {
					isAuthorized: false,
				},
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				status: 'error',
				message: error.maessage || 'Unauthorized!',
				data: {
					isAuthorized: false,
				},
			});
		}
	}
};
