import { handleIsAuthorized, verifyPassword } from '@/lib/v1/auth';
import { pool, handleFindingUserById } from '@/lib/v1/pg';

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

			if (!user.id) return;

			const { gender, password } = req.body;

			const validPassword = await verifyPassword(res, password, user.password);

			if (!validPassword) return;

			const updatedUser = await pool.query(
				'UPDATE users_profile SET gender=($1) WHERE user_id=($2)', //  RETURNING *
				[gender, isAuthorized.id]
			);

			// const { first_name, last_name, user_name, gender } = updatedUser.rows[0];

			res.status(201).json({
				status: 'success',
				message: 'Your Gender Updated Successfully!',
				isAuthorized: true,
				data: {
					gender,
				},
			});
		} catch (error) {
			res.status(500).json({
				status: 'error',
				message: error.message || 'Something went wrong!',
				isAuthorized: false,
			});
		}
	}
};
