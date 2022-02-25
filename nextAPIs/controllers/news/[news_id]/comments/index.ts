import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestExtended } from '@coreLib/ts/global';

import pool from '@coreLib/db/pg/connection';
import newsItemCommentController from './[comment_id]';

// @desc    Get Comments By news news_id
// @route   GET /api/news/:news_id/comments
// @access  Public
export const getCommentsController = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	if (
		req.body.type !== 'main_comment' ||
		req.body.type !== 'main_comment_type'
	) {
		res.status(400);
		throw new Error('Data required not provided!');
	}
	const { type } = req.query;

	if (
		typeof req.query.news_id !== 'string'
		// || typeof req.query.last_comment_created_at !== 'string'
	) {
		res.status(400);
		throw new Error('Wrong queries');
	}

	const data: {
		// [key: string]: string | boolean;
		hit_comments_limit?: boolean;
		hit_replies_limit?: boolean;
		comments: any[];
	} = {
		comments: [],
	};

	if (type === 'comment_main') {
		const queryParams: string[] = [req.query.news_id];
		if (typeof req.query.last_comment_created_at === 'string') {
			queryParams.push(req.query.last_comment_created_at);
		}

		const WhereParamsIndex: {
			comments_to_not_fetch: string[];
		} = {
			comments_to_not_fetch: [],
		};

		if (
			typeof req.query.comments_to_not_fetch === 'string' &&
			req.query.comments_to_not_fetch.length > 0
		) {
			req.query.comments_to_not_fetch.split(',').forEach((item) => {
				queryParams.push(item);
				WhereParamsIndex.comments_to_not_fetch.push(`$${queryParams.length}`);
			});
		}
		// if (
		// 	Array.isArray(req.query.comments_to_not_fetch) &&
		// 	req.query.comments_to_not_fetch.length > 0 /*&&
		// 	!Array.isArray(req.query.comments_to_not_fetch)*/
		// ) {
		// 	req.query.comments_to_not_fetch.forEach((item: string) => {
		// 		queryParams.push(item);
		// 		WhereParamsIndex.comments_to_not_fetch.push(`$${queryParams.length}`);
		// 	});
		// }

		data.comments = await pool
			.query(
				`
				SELECT
					news_comment.news_comment_id,
					-- news_comment.author_id,
					news_comment.type,
					news_comment.content,
					news_comment.created_at,
					news_comment.updated_at,
					
					user_profile.user_profile_id AS author_id,
					user_profile.user_name_id AS author_user_name_id,
					user_profile.first_name AS author_first_name,
					user_profile.last_name AS author_last_name,
					user_profile.profile_picture AS author_profile_picture,

					news_comment_main.replies_counter

				FROM news_comment
				JOIN user_profile ON user_profile.user_profile_id = news_comment.author_id
				JOIN news_comment_main ON news_comment_main.news_comment_main_id = news_comment.news_comment_id
				WHERE news_comment.news_id = $1 ${
					WhereParamsIndex.comments_to_not_fetch.length > 0
						? `AND news_comment.news_comment_id NOT IN (${WhereParamsIndex.comments_to_not_fetch.join(
								','
						  )})`
						: ''
				} ${
					req.query.last_comment_created_at
						? 'AND news_comment.created_at > ($2)'
						: ''
				}
				ORDER BY news_comment.created_at -- DESC
				LIMIT 10;
			`,
				queryParams
			)
			.then((response: { rows: any }) => response.rows);

		if (data.comments.length < 10) {
			data.hit_comments_limit = true;
		}
	} else if (type === 'comment_main_reply') {
		const queryParams = [req.query.parent_id];

		if (req.query.last_reply_created_at) {
			queryParams.push(req.query.last_reply_created_at);
		}

		const WhereParamsIndex: {
			replies_to_not_fetch: string[];
		} = {
			replies_to_not_fetch: [],
		};

		if (
			typeof req.query.replies_to_not_fetch === 'string' &&
			req.query.replies_to_not_fetch.length > 0
		) {
			req.query.replies_to_not_fetch.split(',').forEach((item) => {
				queryParams.push(item);
				WhereParamsIndex.replies_to_not_fetch.push(`$${queryParams.length}`);
			});
		}
		// if (
		// 	Array.isArray(req.query.replies_to_not_fetch) &&
		// 	req.query.replies_to_not_fetch.length > 0
		// ) {
		// 	req.query.replies_to_not_fetch.forEach((item: any) => {
		// 		queryParams.push(item);
		// 		WhereParamsIndex.replies_to_not_fetch.push(`$${queryParams.length}`);
		// 	});
		// }

		data.comments = await pool
			.query(
				`
					SELECT
						news_comment.news_comment_id,
						-- news_comment.author_id,
						news_comment.type,
						news_comment.content,
						news_comment.created_at,
						news_comment.updated_at,
						
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

					WHERE news_comment_main_reply.parent_id= $1 ${
						WhereParamsIndex.replies_to_not_fetch.length > 0
							? `AND news_comment_main_reply.news_comment_main_reply_id NOT IN (${WhereParamsIndex.replies_to_not_fetch.join(
									','
							  )})`
							: ''
					} ${
					req.query.last_reply_created_at
						? 'AND news_comment.created_at > ($2)'
						: ''
				}
					ORDER BY news_comment.created_at -- DESC
					LIMIT 5;
				`,
				queryParams
			)
			.then((response: { rows: any }) => response.rows);

		if (data.comments.length < 5) {
			data.hit_replies_limit = true;
		}
	}

	res.status(200).json(data);
};

// @desc    Create Comments for news by news_id
// @route   Post /api/news/:news_id/comments
// @access  Private
export const createCommentController = async (
	req: NextApiRequestExtended,
	res: NextApiResponse
) => {
	if (
		(req.body.type !== 'main_comment' ||
			req.body.type !== 'main_comment_type' ||
			req.body.news_id ||
			req.body.content) &&
		req.body.type === 'post' &&
		!req.body.type.parent_id &&
		!req.body.type.reply_to_user_id
	) {
		res.status(400);
		throw new Error('Data required not provided!');
	}

	const { type, news_id, content } = req.body;

	const data = await pool
		.query(
			`
				INSERT INTO news_comment (news_id, author_id, type, content, created_at, updated_at)
				VALUES ($1, $2, $3, $4, $5, $5) RETURNING news_comment_id
			`,
			[news_id, req.user.id, type, content, new Date().toISOString()]
		)
		.then(async (response: { rows: any[] }) => response.rows[0]);
	if (type === 'comment_main') {
		await pool.query(
			`
				WITH insert_item_1 AS (
					INSERT INTO news_comment_main (news_comment_main_id)
					VALUES ($1)
					RETURNING news_comment_main_id
				),
				update_item_1 AS (
					UPDATE news
					SET comments_counter = comments_counter + 1
					WHERE news_id = ($2)
					RETURNING news_id
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
					RETURNING news_comment_main_reply_id
				),
				update_item_1 AS (
					UPDATE news_comment_main
					SET replies_counter = replies_counter + 1
					WHERE news_comment_main_id = ($2)
					RETURNING news_comment_main_id
				)

				SELECT * FROM insert_item_1, update_item_1;
			`,
			[
				data.news_comment_id,
				req.body.parent_id,
				req.body.reply_to_comment_id || req.body.parent_id,
				req.body.reply_to_user_id,
			]
		);
	}

	res.status(200).json(data);
};

const newsItemCommentsController = {
	comments: {
		get: getCommentsController,
	},
	comment: {
		create: createCommentController,
		...newsItemCommentController,
	},
};

export default newsItemCommentsController;
