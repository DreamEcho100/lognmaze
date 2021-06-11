import {
	handleIsAuthorized /*, verifyPassword*/,
} from '../../../../../../lib/v1/auth';
import { pool, handleFindingUserById } from '../../../../../../lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'PATCH') {
		return;
	}

	if (req.method === 'PATCH') {
		try {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const user = await handleFindingUserById(res, isAuthorized.id);

			if (!user.id) {
				return;
			}

			const { url } = req.body;

			const updatedUser = await pool.query(
				'UPDATE users SET cover_photo=($1) WHERE id=($2)', // RETURNING *
				[url, isAuthorized.id]
			);

			return res.status(201).json({
				status: 'success',
				message: 'Cover Photo Updated Successefully!',
				data: { cover_photo: url /*updatedUser.rows[0].cover_photo*/ },
				isAuthorized: true,
			});
		} catch (error) {
			console.error(`Error, ${error}`);
			return res.status(500).json({
				status: 'error',
				message: error.message || 'Something went wrong!',
				data: {},
				isAuthorized: false,
			});
		}
	}
};
