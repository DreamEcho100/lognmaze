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
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const user = await checkUserExistAndReturnPasswordById(
				res,
				isAuthorized.id
			);

			if (!user.id) return;

			const { firstName, lastName, password } = req.body;

			const validPassword = await verifyPassword({
				res,
				password,
				hashedPassword: user.password,
			});

			if (!validPassword) return;

			const updatedUser = await pool.query(
				`
					UPDATE user_profile
					SET
						first_name=($1),
						last_name=($2)
					WHERE user_profile_id=($3)
				`,
				[firstName, lastName, isAuthorized.id]
			);

			res.status(201).json({
				status: 'success',
				message: 'Your First/Last Name Updated Successfully!',
				isAuthorized: true,
				data: {
					first_name: firstName,
					last_name: lastName,
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
