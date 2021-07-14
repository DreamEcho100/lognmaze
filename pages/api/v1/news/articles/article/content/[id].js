import { pool } from '@/lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'GET') {
		return;
	}

	if (req.method === 'GET') {
		try {
			const { id } = req.query;

			const result = await pool
				.query(
					`
						SELECT
							news_article.content,
						FROM news_article
            WHERE id=$1
				  `,
					[id]
				)
				.then((response) => response.rows[0]);

			if (!result.news_id) {
				res.status(404).json({
					status: 'error',
					message: 'Content Not Found :(',
					data: {},
				});
				return;
			}

			res.status(200).json({
				status: 'success',
				message: 'The Article Arrived Successefully!, Enjoy ;)',
				data: result,
			});
			return;
		} catch (error) {
			console.error(`Error, ${error}`);
			return res.status(500).json({
				status: 'error',
				message: error.message || 'Something went wrong!',
				data: [],
			});
		}
	}
};
