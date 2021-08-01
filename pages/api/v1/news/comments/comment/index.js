import { handleIsAuthorized } from '@lib/v1/auth';
import { pool } from '@lib/v1/pg';

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
			const { type, news_id } = req.query;

			let data;

			if (type === 'comment') {
				data = await pool
					.query(
						`
							SELECT
								news.news_id,
								news.author_id,
								news.type,
								news.comments_count,
								news.created_at,
								news.updated_on,
								
								user_profile.user_profile_id AS author_id,
								user_profile.user_name_id AS author_user_name_id,
								user_profile.first_name AS author_first_name,
								user_profile.last_name AS author_last_name,
								user_profile.profile_picture AS author_profile_picture,

								-- news_comment.news_comment_id AS news_id,
								news_comment.content

							FROM news
							JOIN user_profile ON user_profile.user_profile_id = news.author_id
							JOIN news_comment ON news_comment.news_comment_id = news.news_id
							WHERE news_comment.news_id = $1
							ORDER BY news.created_at DESC;
						`,
						[news_id]
					)
					.then((response) => response.rows);
			} else if (type === 'comment_reply') {
				data = await pool
					.query(
						`
						SELECT
							news.news_id,
							news.author_id,
							news.type,
							news.comments_count,
							news.created_at,
							news.updated_on,
								
							user_profile.user_profile_id AS author_id,
							user_profile.user_name_id AS author_user_name_id,
							user_profile.first_name AS author_first_name,
							user_profile.last_name AS author_last_name,
							user_profile.profile_picture AS author_profile_picture,

							-- news_comment_reply.news_comment_reply_id AS news_id,
							news_comment_reply.reply_to_id,
							news_comment_reply.content

						FROM news
						JOIN user_profile ON user_profile.user_profile_id = news.author_id
						JOIN news_comment_reply ON news_comment_reply.news_comment_reply_id = news.news_id
						WHERE news_comment_reply.parent_id = ($1)
						ORDER BY news.updated_on DESC;
					`,
						[req.query.parent_id]
					)
					.then((response) => response.rows);
			}

			return res.status(200).json({
				status: 'success',
				message: 'Comments Arrived Successfully!',
				data,
			});
		} else if (req.method === 'POST') {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const { type, content } = req.body;

			const data = await pool
				.query(
					`
						INSERT INTO news (author_id, type)
						VALUES ($1, $2) RETURNING news_id
          `,
					[isAuthorized.id, type]
				)
				.then(async (response) => response.rows[0]);
			if (type === 'comment') {
				await pool.query(
					`
						WITH insert_item_1 AS (
							INSERT INTO news_comment (news_comment_id, news_id, content)
							VALUES ($1, $2, $3)
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
					[data.news_id, req.body.news_id, content]
				);
			} else if (type === 'comment_reply') {
				await pool.query(
					`
						WITH insert_item_1 AS (
							INSERT INTO news_comment_reply (news_comment_reply_id, parent_id, reply_to_id, content)
							VALUES ($1, $2, $3, $4)
							RETURNING NULL
						),
						update_item_1 AS (
							UPDATE news
							SET comments_count = comments_count + 1
							WHERE news_id = ($2) OR news_id = ($3) -- OR (news_id = ($3) And news_id <> ($2))
							RETURNING NULL
						)

						SELECT * FROM insert_item_1, update_item_1;
					`,
					[data.news_id, req.body.parent_id, req.body.reply_to_id, content]
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

			const { type, news_id, content } = req.body;

			const data = await pool
				.query(
					`
						UPDATE news
						SET updated_on = ($1)
						WHERE news_id = ($2) AND author_id = ($3) RETURNING news_id
					`,
					[new Date().toUTCString(), news_id, isAuthorized.id]
				)
				.then(async (response) => response.rows[0]);

			if (!data && !data.news_id) {
				return res.status(404).json({
					status: 'error',
					message: "Comment Wasn't found :(",
					data: null,
					isAuthorized: true,
				});
			}

			if (type === 'comment') {
				await pool.query(
					`
						UPDATE news_comment
						SET content = ($1)
						WHERE news_comment_id = ($2)
					`,
					[content, data.news_id]
				);
			} else if (type === 'comment_reply') {
				await pool.query(
					`
						UPDATE news_comment_reply
						SET content = ($1)
						WHERE news_comment_reply_id = ($2)
					`,
					[content, data.news_id]
				);
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

			const { news_id, type } = req.body;

			const data = await pool
				.query(
					`
						DELETE FROM news
						WHERE news.news_id = ($1) AND news.author_id = ($2)
						RETURNING news.news_id				
					`,
					[news_id, isAuthorized.id]
				)
				.then((response) => response.rows[0]);

			if (!data && !data.news_id) {
				return res.status(404).json({
					status: 'error',
					message: "Comment Wasn't found :(",
					data: null,
					isAuthorized: true,
				});
			}

			if (type === 'comment') {
				await pool.query(
					`
						UPDATE news
						SET comments_count = comments_count - 1
						WHERE news_id = ($1)
						RETURNING NULL		
					`,
					[req.body.parent_id]
				);
			} else if (type === 'comment_reply') {
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
