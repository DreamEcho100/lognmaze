import { handleIsAuthorized } from '@lib/v1/auth';
import { pool /*, QueryBuilder */ } from '@lib/v1/pg';

export default async (req, res) => {
	if (
		!(
			req.method === 'GET' ||
			req.method === 'POST' ||
			req.method === 'PUT' ||
			req.method === 'PATCH' ||
			req.method === 'DELETE'
		)
	) {
		return;
	}
	try {
		if (req.method === 'GET') {
			// const isAuthorized = await handleIsAuthorized(
			// 	res,
			// 	req.headers.authorization
			// );

			// if (!isAuthorized.id) return;

			const { news_id } = req.query;
			let data;

			if (req.query.news_reactor_id && req.query.news_reactor_id.length !== 0) {
				data = await pool
					.query(
						`
							SELECT json_agg (
								json_build_object (
									'news_reaction_id', news_reaction.news_reaction_id ,
									'type', news_reaction.type,
									'count', news_reaction.count
								)
							) AS reactions,
							news_reactor_reaction.user_reaction
							FROM  news_reaction
							
							LEFT JOIN LATERAL (
								SELECT type AS user_reaction FROM news_reaction
								JOIN news_reactor ON news_reactor.news_reaction_id = news_reaction.news_reaction_id
								WHERE news_reaction.news_id = ($1) -- news.news_id
								AND news_reactor.news_reactor_id = ($2)
							) news_reactor_reaction ON TRUE

							WHERE news_reaction.news_id = ($1)
							GROUP BY news_reactor_reaction.user_reaction
						`,
						[news_id, req.query.news_reactor_id]
					)
					.then((response) => response.rows[0]);
			} else {
				data = await pool
					.query(
						`
							SELECT json_agg (
								json_build_object (
									'news_reaction_id', news_reaction.news_reaction_id ,
									'type', news_reaction.type,
									'count', news_reaction.count
								)
							) AS reactions
							FROM  news_reaction
							WHERE news_reaction.news_id = ($1)
						`,
						[news_id]
					)
					.then((response) => response.rows[0]);
			}

			return res.status(200).json({
				status: 'success',
				message: 'Reactions Arrived Successfully!',
				data,
			});
		} else if (req.method === 'POST') {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const { news_id, news_reaction_type } = req.body;

			const data = await pool
				.query(
					`
          INSERT INTO news_reaction
            (news_id, type, count)
          VALUES ($1, $2, 1)
          RETURNING  news_reaction_id
        `,
					[news_id, news_reaction_type]
				)
				.then((response) => response.rows[0]);

			await pool.query(
				`
					INSERT INTO news_reactor
						(news_reaction_id, news_id, news_reactor_id)
					VALUES ($1, $2, $3)
				`,
				[data.news_reaction_id, news_id, isAuthorized.id]
			);

			return res.status(201).json({
				status: 'success',
				message: 'Reaction Changed Successfully!',
				data,
			});
		} else if (req.method === 'PUT') {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const { old_reaction_id } = req.body;

			let data = {};

			if (!req.body.new_reaction_id) {
				await pool
					.query(
						`
							WITH insert_item_1 AS (
								INSERT INTO news_reaction
									(news_id, type, count)
								VALUES ($1, $2, 1)
								RETURNING news_reaction_id
							),
							update_item_1 AS (
								UPDATE news_reaction
								SET count = count - 1
								WHERE news_reaction_id = ($3)
								RETURNING NULL
							),
							delete_item_1 AS (
								DELETE FROM news_reactor
								WHERE news_reaction_id = $3 AND news_reactor_id = $4
								RETURNING NULL
							)

							SELECT * FROM insert_item_1, update_item_1, delete_item_1
						`,
						[
							req.body.news_id,
							req.body.new_reaction,
							old_reaction_id,
							isAuthorized.id,
						]
					)
					.then(async (response) => {
						data.new_reaction_id = response.rows[0].news_reaction_id;

						await pool.query(
							`
								INSERT INTO news_reactor
									(news_reaction_id, news_id, news_reactor_id)
								VALUES ($1, $2, $3)
							`,
							[data.new_reaction_id, req.body.news_id, isAuthorized.id]
						);

						return response.rows[0].news_reaction_id;
					});
			} else {
				await pool.query(
					`
							WITH update_item_1 AS (
								UPDATE news_reaction
								SET count = count + 1
								WHERE news_reaction_id = ($1)
								RETURNING NULL
							),
							update_item_2 AS (
								UPDATE news_reaction
								SET count = count - 1
								WHERE news_reaction_id = ($2)
								RETURNING NULL
							),
							update_item_3 AS (
								UPDATE news_reactor
								SET news_reaction_id = $1
								WHERE news_reaction_id = ($2) AND news_reactor_id = ($3)
								RETURNING NULL
							)

							SELECT * FROM update_item_1, update_item_2, update_item_3
						`,
					[req.body.new_reaction_id, req.body.old_reaction_id, isAuthorized.id]
				);
			}

			return res.status(201).json({
				status: 'success',
				message: 'Reaction Changed Successfully!',
				data,
			});
		} else if (req.method === 'PATCH') {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const { news_reaction_id, news_reaction_type, news_id } = req.body;

			await pool.query(
				`
							WITH update_item_1 AS (
								UPDATE news_reaction
								SET count = count + 1
								WHERE news_reaction_id = ($1) AND type = ($2) RETURNING ''
							), insert_item_1 AS (
								INSERT INTO news_reactor
									(news_reaction_id, news_id, news_reactor_id)
								VALUES ($1, $3, $4) RETURNING ''
							)

							SELECT * FROM update_item_1, insert_item_1;
						`,
				[news_reaction_id, news_reaction_type, news_id, isAuthorized.id]
			);

			return res.status(201).json({
				status: 'success',
				message: 'Reaction Changed Successfully!',
				data: {},
			});
		} else if (req.method === 'DELETE') {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const { news_reaction_id, news_reaction_type } = req.body;

			const result = await pool
				.query(
					`
						WITH delete_item_1 AS (
							DELETE FROM news_reactor WHERE news_reaction_id = ($1) AND news_reactor_id = ($3) RETURNING ''
						),
						update_item_1 AS (
							UPDATE news_reaction SET count = count - 1 WHERE news_reaction_id = ($1) AND type = ($2) RETURNING ''
						)

						SELECT * FROM delete_item_1, update_item_1;
					`,
					[news_reaction_id, news_reaction_type, isAuthorized.id]
				)
				.then((response) => response.rows);

			return res.status(201).json({
				status: 'success',
				message: 'Reaction Changed Successfully!',
				data: result,
			});
		}
	} catch (error) {
		console.error(`Error, ${error}`);
		return res.status(500).json({
			status: 'error',
			message: error.message || 'Something went wrong!',
			data: {},
		});
	}
};
