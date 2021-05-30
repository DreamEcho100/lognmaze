import { verifyJwtToken } from '../../../../../lib/auth';
import { pool } from '../../../../../lib/pg';

export default async (req, res) => {
	if (req.method === 'PATCH') {
		let isVerified = false;

		try {
			const url = req.body.url;
			const id = req.query.id;
			const token = req.headers.token;

			console.log('url', url);
			console.log('id', id);
			console.log('token', token);

			const updateProfilePicture = await pool.query(
				'UPDATE users SET profile_picture=($1) WHERE id=($2) RETURNING *',
				[url, id]
			);

			delete updateProfilePicture.rows[0].password;

			if (token && token.length !== 0) {
				isVerified = await verifyJwtToken(token);
			}

			// console.log(updateProfilePicture);

			res.status(201).json({
				status: 'success',
				message: 'Updated Successefully!',
				data: { profile_picture: updateProfilePicture.rows[0].profile_picture },
				isVerified,
			});
		} catch (error) {
			console.error(`Error, ${error}`);
		}
	}
};
