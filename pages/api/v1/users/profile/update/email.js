import {
	handleIsAuthorized,
	verifyPassword,
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

			if (!user.id) return;

			const { email, password } = req.body;

			const validPassword = await verifyPassword(res, password, user.password);

			if (!validPassword) return;

			const updatedUser = await pool.query(
				'UPDATE users SET email=($1) WHERE id=($2) RETURNING *', //  RETURNING *
				[email, isAuthorized.id]
			);

			res.status(201).json({
				status: 'success',
				message: 'Email Updated Successfully!',
				isAuthorized: true,
				data: { email },
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
