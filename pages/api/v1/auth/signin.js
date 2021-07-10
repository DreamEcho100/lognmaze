import { verifyPassword, jwtGenerator } from '@/lib/v1/auth';
import { getUserData } from '@/lib/v1/pg';

export default async (req, res) => {
	// const data = req.body;

	if (req.method !== 'POST') {
		return;
	}

	if (req.method === 'POST') {
		try {
			const { email, password } = req.body;

			const user = await getUserData({
				filterBy: { key: 'user_account.email', value: email },
				withPassword: true,
			});

			if (!user.id) {
				return res
					.status(401)
					.send({ status: 'error', message: "User doesn't exist!" });
			}

			const validPassword = await verifyPassword({
				password,
				hashedPassword: user.password,
			});

			if (!validPassword) {
				return res
					.status(401)
					.send({ status: 'error', message: 'The password is wrong!' });
			}

			delete user.password;

			const jwt = jwtGenerator({
				id: user.id,
			});

			res.status(201).json({
				status: 'success',
				message: 'Created user!',
				data: user,
				jwt,
			});
		} catch (error) {
			res.status(500).json({ status: 'error', message: error.message });
		}
	}
};
