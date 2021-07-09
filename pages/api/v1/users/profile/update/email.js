import { handleIsAuthorized, verifyPassword } from '@/lib/v1/auth';
import { pool, checkUserExistAndReturnPasswordById } from '@/lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'PATCH') {
		return;
	}

	if (req.method === 'PATCH') {
		try {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.Authorization
			);

			if (!isAuthorized.id) return;

			const user = await checkUserExistAndReturnPasswordById(
				res,
				isAuthorized.id
			);

			if (!user.id) return;

			const { email, password } = req.body;

			const validPassword = await verifyPassword({
				res,
				password,
				hashedPassword: user.password,
			});

			if (!validPassword) return;

			const updatedUser = await pool.query(
				`
					UPDATE user_account
					SET email=($1), email_verified=FALSE
					WHERE user_account_id=($2)
				`,
				[email, isAuthorized.id]
			);

			res.status(201).json({
				status: 'success',
				message: 'Email Updated Successfully!',
				isAuthorized: true,
				data: { email, email_verified: false },
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
