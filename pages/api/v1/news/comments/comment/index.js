import { handleIsAuthorized } from '@lib/v1/auth';
import { pool /*, QueryBuilder*/ } from '@lib/v1/pg';

export default async (req, res) => {
	if (
		!(
			req.method === 'GET' ||
			req.method === 'POST' ||
			req.method === 'PATCH' ||
			req.method === 'DELETE'
		)
	) {
		return;
	}

	try {
		if (req.method === 'GET') {
			const { parent_id } = req.query;
			const data = await pool
				.query(
					`
						SELECT
							news_comment.news_comment_id,
							news_comment.author_id,
							news_comment.content,
							news_comment.created_at,
							news_comment.updated_on

							${!parent_id ? `,news_comment_main.replies_counter` : ''}
						FROM news_comment
						${
							!parent_id
								? `JOIN news_comment_main ON news_comment_main_id = news_comment.news_comment_id`
								: `JOIN news_comment_main_reply ON news_comment_main_reply_id = news_comment.news_comment_id`
						}
						ORDER BY created_at
          `
				)
				.then((response) => response.rows);

			return res.status(200).json({
				status: 'success',
				message: 'Commenting Successfully!',
				data,
				isAuthorized: true,
			});
		} else if (req.method === 'POST') {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const { news_id, content } = req.body;

			const data = await pool
				.query(
					`
            INSERT INTO news_comment (author_id, news_id, content)
            VALUES ($1, $2, $3) RETURNING news_comment_id
          `,
					[isAuthorized.id, news_id, content]
				)
				.then(async (response) => response.rows[0]);

			if (!req.body.parent_id) {
				await pool.query(
					`
							WITH insert_item_1 AS (
								INSERT INTO news_comment_main (news_comment_main_id)
								VALUES ($1)
								RETURNING NULL
							),
							update_item_1 AS (
								UPDATE news
								SET comments_count = comments_count + 1
								WHERE news_id = ($2)
								RETURNING NULL
							)

							SELECT * FROM insert_item_1, update_item_1;
						`,
					[data.news_comment_id, news_id]
				);
			} else {
				await pool.query(
					`
							WITH insert_item_1 AS (
								INSERT INTO news_comment_main_reply (news_comment_main_reply_id, parent_id, reply_to_id)
								VALUES ($1, $2, $3)
								RETURNING NULL
							),
							update_item_1 AS (
								UPDATE news_comment_main
								SET replies_counter = replies_counter + 1
								WHERE news_comment_main_id = ($2)
								RETURNING NULL
							)

							SELECT * FROM insert_item_1, update_item_1;
						`,
					[data.news_comment_id, req.body.parent_id, req.body.reply_to_id]
				);
			}

			return res.status(200).json({
				status: 'success',
				message: 'Comment Posted Successfully!',
				data,
				isAuthorized: true,
			});
		} else if (req.method === 'PATCH') {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const { news_comment_id, content } = req.body;

			const data = await pool
				.query(
					`
            UPDATE news_comment
						SET content = ($1), updated_on = ($2)
						WHERE news_comment_id = ($3) AND author_id = ($4) RETURNING news_comment_id
          `,
					[content, new Date().toUTCString(), news_comment_id, isAuthorized.id]
				)
				.then((response) => response.rows[0]);

			if (!data && !data.news_comment_id) {
				return res.status(404).json({
					status: 'error',
					message: "Comment Wasn't found :(",
					data: null,
					isAuthorized: true,
				});
			}

			return res.status(200).json({
				status: 'success',
				message: 'Comment Updated Successfully!',
				data: null,
				isAuthorized: true,
			});
		} else if (req.method === 'DELETE') {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const { news_comment_id } = req.body;

			const data = await pool
				.query(
					`
						DELETE FROM news_comment
						WHERE news_comment_id = ($1) AND author_id = ($2)
						RETURNING news_comment_id				
					`,
					[news_comment_id, isAuthorized.id]
				)
				.then((response) => response.rows[0]);

			if (!data && !data.news_comment_id) {
				return res.status(404).json({
					status: 'error',
					message: "Comment Wasn't found :(",
					data: null,
					isAuthorized: true,
				});
			}

			if (!req.body.parent_id) {
				await pool.query(
					`
						UPDATE news
						SET comments_count = comments_count - 1
						WHERE news_id = ($1)
						RETURNING NULL		
					`,
					[req.body.parent_id]
				);
			} else {
				await pool.query(
					`
						UPDATE news_comment_main
						SET replies_counter = replies_counter - 1
						WHERE news_comment_main_id = ($1)			
					`,
					[req.body.parent_id]
				);
			}

			return res.status(200).json({
				status: 'success',
				message: 'Comment Deleted Successfully!',
				data: null,
				isAuthorized: true,
			});
		}
	} catch (error) {
		console.error(`Error, ${error}`);
		return res.status(500).json({
			status: 'error',
			message: error.message || 'Something went wrong!',
			data: null,
			isAuthorized: false,
		});
	}
};
