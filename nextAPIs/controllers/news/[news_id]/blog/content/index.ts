import pool from '@coreLib/db/pg/connection';
import { NextApiRequest, NextApiResponse } from 'next';

// @desc    Get News Blog Type content
// @route   GET /api/news/[news_id]/blog/content
// @access  Public
export const getNewsItemBlogContentController = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const result = await pool
		.query('SELECT content FROM news_blog WHERE news_blog_id=$1', [
			req.query.news_id,
		])
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		.then((response: { rows: any[] }) => response.rows[0]);

	if (!result.content) {
		res.status(404);
		throw new Error('Content Not Found :(');
	}

	if (process.env.NoDE_ENV === 'production') {
		res.setHeader(
			'Cache-Control',
			'public, s-maxage=10, stale-while-revalidate=59'
		);
	}

	res.status(200).json(result);
};
