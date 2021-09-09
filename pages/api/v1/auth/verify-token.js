import { handleIsAuthorized } from '@lib/v1/auth';

export default async (req, res) => {
	if (req.method === 'POST') {
		try {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) {
				return res.status(401).json({
					status: 'error',
					message: 'Unauthorized!',
					data: {
						isAuthorized: false,
					},
				});
			}

			return res.status(200).json({
				status: 'success',
				message: 'Authorized!',
				data: {
					isAuthorized: true,
				},
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				status: 'error',
				message: error.message || 'Unauthorized!',
				data: {
					isAuthorized: false,
				},
			});
		}
	}
};
