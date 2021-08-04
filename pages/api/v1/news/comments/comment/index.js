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
			const { type, offset_index = 0 } = req.query;

			let comments,
				hit_replies_limit = false;

			if (type === 'comment_main') {
				comments = await pool
					.query(
						`
							SELECT
								news_comment.news_comment_id,
								-- news_comment.author_id,
								news_comment.type,
								news_comment.content,
								news_comment.created_at,
								news_comment.updated_on,
								
								user_profile.user_profile_id AS author_id,
								user_profile.user_name_id AS author_user_name_id,
								user_profile.first_name AS author_first_name,
								user_profile.last_name AS author_last_name,
								user_profile.profile_picture AS author_profile_picture,

								news_comment_main.replies_counter

							FROM news_comment
							JOIN user_profile ON user_profile.user_profile_id = news_comment.author_id
							JOIN news_comment_main ON news_comment_main.news_comment_main_id = news_comment.news_comment_id
							WHERE news_comment.news_id = $1
							ORDER BY news_comment.created_at DESC
							OFFSET ${offset_index * 10} LIMIT 10;
						`,
						[req.query.news_id]
					)
					.then((response) => response.rows);
			} else if (type === 'comment_main_reply') {
				comments = await pool
					.query(
						`
							SELECT
								news_comment.news_comment_id,
								-- news_comment.author_id,
								news_comment.type,
								news_comment.content,
								news_comment.created_at,
								news_comment.updated_on,
								
								user_profile.user_profile_id AS author_id,
								user_profile.user_name_id AS author_user_name_id,
								user_profile.first_name AS author_first_name,
								user_profile.last_name AS author_last_name,
								user_profile.profile_picture AS author_profile_picture,

								news_comment_main_reply.reply_to_comment_id,
								news_comment_main_reply.reply_to_user_id

							FROM news_comment
							JOIN user_profile ON user_profile.user_profile_id = news_comment.author_id
							JOIN news_comment_main_reply ON news_comment_main_reply.news_comment_main_reply_id = news_comment.news_comment_id

							WHERE news_comment_main_reply.parent_id = ($1)
							ORDER BY news_comment.created_at DESC
							OFFSET ${offset_index * 10} LIMIT 10;
						`,
						[req.query.parent_id]
					)
					.then((response) => response.rows);
			}
			// replies_index
			// hit_replies_limit

			if (comments.length < 10) {
				hit_replies_limit = true;
			}
			return res.status(200).json({
				status: 'success',
				message: 'Comments Arrived Successfully!',
				data: {
					comments,
					hit_replies_limit,
				},
			});
		} else if (req.method === 'POST') {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const { type, news_id, content } = req.body;

			const data = await pool
				.query(
					`
						INSERT INTO news_comment (news_id, author_id, type, content)
						VALUES ($1, $2, $3, $4) RETURNING news_comment_id
          `,
					[news_id, isAuthorized.id, type, content]
				)
				.then(async (response) => response.rows[0]);
			if (type === 'comment_main') {
				await pool.query(
					`
						WITH insert_item_1 AS (
							INSERT INTO news_comment_main (news_comment_main_id)
							VALUES ($1)
							RETURNING NULL
						),
						update_item_1 AS (
							UPDATE news
							SET comments_counter = comments_counter + 1
							WHERE news_id = ($2)
							RETURNING NULL
						)

						SELECT * FROM insert_item_1, update_item_1;
					`,
					[data.news_comment_id, news_id]
				);
			} else if (type === 'comment_main_reply') {
				await pool.query(
					`
						WITH insert_item_1 AS (
							INSERT INTO news_comment_main_reply
								(
									news_comment_main_reply_id,
									parent_id,
									reply_to_comment_id,
									reply_to_user_id
								)
							VALUES ($1, $2, $3, $4)
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
					[
						data.news_comment_id,
						req.body.parent_id,
						req.body.reply_to_comment_id,
						req.body.reply_to_user_id,
					]
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

			const { /*type, */ content, news_comment_id } = req.body;

			const data = await pool
				.query(
					`
						UPDATE news_comment
						SET content = ($1), updated_on = ($2)
						WHERE news_comment_id = ($3) AND author_id = ($4) RETURNING news_comment_id
					`,
					[content, new Date().toUTCString(), news_comment_id, isAuthorized.id]
				)
				.then(async (response) => response.rows[0]);

			if (!data && !data.news_comment_id) {
				return res.status(404).json({
					status: 'error',
					message: "Comment Wasn't found :(",
					data: null,
					isAuthorized: true,
				});
			}

			// if (type === 'comment_main') {
			// 	await pool.query(
			// 		`
			// 			UPDATE news_comment
			// 			SET content = ($1)
			// 			WHERE news_comment_id = ($2)
			// 		`,
			// 		[content, data.news_id]
			// 	);
			// } else if (type === 'comment_main_reply') {
			// 	await pool.query(
			// 		`
			// 			UPDATE news_comment_reply
			// 			SET content = ($1)
			// 			WHERE news_comment_reply_id = ($2)
			// 		`,
			// 		[content, data.news_id]
			// 	);
			// }

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

			const { news_comment_id, type } = req.body;

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

			if (type === 'comment_main') {
				await pool.query(
					`
						UPDATE news
						SET comments_counter = comments_counter - 1
						WHERE news_id = ($1)	
					`,
					[req.body.parent_id]
				);
			} else if (type === 'comment_main_reply') {
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
