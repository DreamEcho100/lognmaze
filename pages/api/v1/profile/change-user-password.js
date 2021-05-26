import { verifyPassword, jwtGenerator } from '../../../../lib/auth';
import { pool } from '../../../../lib/pg';

export default async (req, res) => {
	if (req.method !== 'PATCH') {
		return;
	}

	if (req.method === 'PATCH') {
		const { oldPassword, newPassword } = req.body;

		client.close();
		res.status(200).json({ status: 'success', message: 'Password updated!' });
	}
};

/*

		const session = await getSession({ req: req });

		if (!session) {
			res.status(401).json({ message: 'Not authenticated!' });
			return;
		}

		const userEmail = session.user.email;
		const oldPassword = req.body.oldPassword;
		const newPassword = req.body.newPassword;

		const client = await connectDatabase({
			username: process.env.MONGODB_USERNAME,
			password: process.env.MONGODB_PASSWORD,
			clustername: process.env.MONGODB_CLUSTERNAME,
			database: process.env.MONGODB_MAZENEXTBLOG_DATABASE,
		});

		const usersCollection = client.db().collection('users');

		const user = await usersCollection.findOne({ email: userEmail });

		if (!user) {
			res.status(404).json({ status: 'error', message: 'User not found!' });
			client.close();
			return;
		}

		const currentPassword = user.password;

		const passwordsAreEqual = await verifyPassword(
			oldPassword,
			currentPassword
		);

		if (!passwordsAreEqual) {
			res.status(403).json({ status: 'error', message: 'Invalid password!' });
			client.close();
			return;
		}

		const hashedPassword = await hashPassword(newPassword);

		const result = await usersCollection.updateOne(
			{ email: userEmail },
			{ $set: { password: hashedPassword } }
		);

		client.close();
		res.status(200).json({ status: 'success', message: 'Password updated!' });
*/
