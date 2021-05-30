import { verifyJwtToken } from '../../../../lib/auth';

export default async (req, res) => {
	if (req.method === 'POST') {
		try {
			const { token } = req.headers;

			const isVerified = await verifyJwtToken(token);

			if (isVerified) {
				return res.status(200).json({
					status: 'success',
					message: 'Authorized!',
					data: {
						isVerified: true,
					},
				});
			}

			return res.status(401).json({
				status: 'error',
				message: 'Unauthorized!',
				data: {
					isVerified: false,
				},
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({
				status: 'error',
				message: error.maessage || 'Unauthorized!',
				data: {
					isVerified: false,
				},
			});
		}
	}
};
