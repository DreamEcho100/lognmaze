import { verifyJwtToken } from '../../../../../lib/auth';
import { pool } from '../../../../../lib/pg';

export default async (req, res) => {
	if (req.method === 'PATCH') {
		let isVerified = false;

		try {
			const url = req.body.url;
			const id = req.query.id;
			const token = req.headers.token;

			if (token && token.length !== 0) {
				isVerified = await verifyJwtToken(token);
			}

			if (!token || !isVerified.email) {
				return res.status(401).json({
					status: 'error',
					message: 'Not Authorized!',
					data: {},
					isVerified: false,
				});
			}

			const updateProfilePicture = await pool.query(
				'UPDATE users SET cover_photo=($1) WHERE id=($2) RETURNING *',
				[url, id]
			);

			// delete updateProfilePicture.rows[0].password;

			console.log(updateProfilePicture);

			return res.status(201).json({
				status: 'success',
				message: 'Updated Successefully!',
				data: { cover_photo: updateProfilePicture.rows[0].cover_photo },
				isVerified: true,
			});
		} catch (error) {
			console.error(`Error, ${error}`);
			return res.status(500).json({
				status: 'error',
				message: error.message || 'Something went wrong!',
				data: {},
				isVerified: false,
			});
		}
	}
};
