import pool from '@coreLib/db/pg/connection';
import { NextApiRequestExtended } from '@coreLib/ts/global';
import { NextApiResponse } from 'next';

// @desc    Update Comments for news by news_id
// @route   PUT /api/news/:news_id/comments/[comment_id]
// @access  Private
export const updateCommentController = async (
	req: NextApiRequestExtended,
	res: NextApiResponse
) => {
	if (!req.body.content) {
		res.status(400);
		throw new Error('Required data not provided');
	}

	const data = await pool
		.query(
			`
				UPDATE news_comment
				SET content = ($1), updated_at = ($2)
				WHERE news_comment_id = ($3) AND author_id = ($4) RETURNING news_comment_id
			`,
			[
				req.body.content,
				new Date().toISOString(),
				req.query.comment_id,
				req.user.id,
			]
		)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		.then(async (response: { rows: any[] }) => response.rows[0]);

	if (!data && !data.news_comment_id) {
		res.status(404);
		throw new Error("Comment Wasn't found :(");
	}

	res.status(200).json(data);
};

// @desc    Delete Comments for news by news_id
// @route   DELETE /api/news/:news_id/comments/[comment_id]
// @access  Private
export const deleteCommentController = async (
	req: NextApiRequestExtended,
	res: NextApiResponse
) => {
	if (
		req.body.type !== 'comment_main' &&
		req.body.type !== 'comment_main_reply' &&
		req.body.type === 'comment_main_reply' &&
		!req.body.parent_id
	) {
		res.status(400);
		throw new Error('Required data not provided!');
	}

	const { type } = req.body;

	const data = await pool
		.query(
			`
				DELETE FROM news_comment
				WHERE news_comment_id = ($1) AND author_id = ($2)
				RETURNING news_comment_id
			`,
			[req.query.comment_id, req.user.id]
		)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		.then((response: { rows: any[] }) => response.rows[0]);

	if (!data && !data.news_comment_id) {
		res.status(404);
		throw new Error("Comment Wasn't found :(");
	}

	let data2;

	if (type === 'comment_main') {
		data2 = await pool
			.query(
				`
				UPDATE news
				SET comments_counter = comments_counter - 1
				WHERE news_id = ($1)	
			`,
				[req.query.news_id]
			)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((response: { rows: any[] }) => response.rows[0]);
	} else if (type === 'comment_main_reply') {
		data2 = await pool
			.query(
				`
				UPDATE news_comment_main
				SET replies_counter = replies_counter - 1
				WHERE news_comment_main_id = ($1)
			`,
				[req.body.parent_id]
			)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			.then((response: { rows: any[] }) => response.rows[0]);
	}

	return res.status(200).json({
		...data,
		...data2,
	});
};

const newsItemCommentController = {
	update: updateCommentController,
	delete: deleteCommentController,
};

export default newsItemCommentController;
