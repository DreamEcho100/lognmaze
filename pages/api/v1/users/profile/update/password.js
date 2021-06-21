import {
	handleIsAuthorized,
	verifyPassword,
	hashPassword,
} from '@/lib/v1/auth';
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

			const { oldPassword, newPassword } = req.body;

			const validPassword = await verifyPassword(
				res,
				oldPassword,
				user.password
			);

			if (!validPassword) return;

			const hashedPassword = await hashPassword(newPassword);

			const updatedUser = await pool.query(
				'UPDATE users SET password=($1) WHERE id=($2)', //  RETURNING *
				[hashedPassword, isAuthorized.id]
			);

			res.status(201).json({
				status: 'success',
				message: 'Password Updated Successfully!',
				isAuthorized: true,
				data: {},
			});
		} catch (error) {
			// console.error(error);
			res.status(500).json({
				status: 'error',
				message: error.message || 'Something went wrong!',
				isAuthorized: false,
			});
		}
	}
};
