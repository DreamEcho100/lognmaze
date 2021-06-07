import { pool } from '../../../../../lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'GET') {
		return;
	}

	if (req.method === 'GET') {
		try {
			// const { index } = req.header;
			const Posts = await pool.query(
				'SELECT * FROM posts ORDER BY created_at DESC'
			);

			return res.status(200).json({
				status: 'success',
				message: 'The newest Posts Arrived Successefully!, Enjoy ;)',
				data: Posts.rows,
			});
		} catch (error) {
			console.error(`Error, ${error}`);
			return res.status(500).json({
				status: 'error',
				message: error.message || 'Something went wrong!',
			});
		}
	}
};
