import { handleIsAuthorized, verifyPassword, hashPassword } from '@lib/v1/auth';
import { pool, checkUserExistAndReturnPasswordById } from '@lib/v1/pg';

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

			const user = await checkUserExistAndReturnPasswordById(
				res,
				isAuthorized.id
			);

			if (!user.id) return;

			const { oldPassword, newPassword } = req.body;

			const validPassword = await verifyPassword({
				res,
				password: oldPassword,
				hashedPassword: user.password,
			});

			if (!validPassword) return;

			const hashedPassword = await hashPassword(newPassword);

			const updatedUser = await pool.query(
				`
					UPDATE user_account
					SET password=($1)
					WHERE user_account_id=($2)
				`,
				[hashedPassword, isAuthorized.id]
			);

			res.status(201).json({
				status: 'success',
				message: 'Password Updated Successfully!',
				isAuthorized: true,
				data: {},
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
