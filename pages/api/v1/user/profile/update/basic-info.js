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

			const { firstName, lastName, userName, gender, password } = req.body;

			const validPassword = await verifyPassword(res, password, user.password);

			if (!validPassword) return;

			const updatedUser = await pool.query(
				'UPDATE users SET first_name=($1), last_name=($2), user_name=($3), gender=($4) WHERE id=($5)', //  RETURNING *
				[firstName, lastName, userName, gender, isAuthorized.id]
			);

			// const { first_name, last_name, user_name, gender } = updatedUser.rows[0];

			res.status(201).json({
				status: 'success',
				message: 'Basic Info Updated Successfully!',
				isAuthorized: true,
				data: {
					first_name: firstName,
					last_name: lastName,
					user_name: userName,
					gender: gender,
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
