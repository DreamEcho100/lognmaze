import { handleIsAuthorized /*, verifyPassword*/ } from '@/lib/v1/auth';
import { pool, handleFindingUserById } from '@/lib/v1/pg';

export default async (req, res) => {
	if (req.method === 'PATCH') {
		try {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const user = await handleFindingUserById(res, isAuthorized.id);

			if (!user.id) return;

			const { url } = req.body;

			const updatedUser = await pool.query(
				'UPDATE users_profile SET profile_picture=($1) WHERE user_id=($2) RETURNING *',
				[url, isAuthorized.id]
			);

			// delete updatedUser.rows[0].password;


			return res.status(201).json({
				status: 'success',
				message: 'Profile Picture Updated Successefully!',
				data: { profile_picture: url },
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
