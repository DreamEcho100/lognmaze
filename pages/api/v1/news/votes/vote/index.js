import { handleIsAuthorized } from '@lib/v1/auth';
import { pool } from '@lib/v1/pg';

const api = async (req, res) => {
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
			const { news_id, voter_id } = req.query;

			const data = await pool
				.query(
					`
            SELECT vote_type AS user_vote_type FROM news_vote
            WHERE news_id = ($1) AND voter_id = ($2)
          `,
					[news_id, voter_id]
				)
				.then((response) => response.rows[0]);

			return res.status(200).json({
				status: 'success',
				message: 'Vote Arrived Successfully!',
				data,
			});
		} else if (req.method === 'POST') {
			const { news_id, vote_type } = req.body;

			if (!vote_type || (vote_type !== 'up' && vote_type !== 'down')) {
				return res.status(404).json({
					status: 'error',
					message: 'An undefined vote!',
				});
			}

			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const data = await pool.query(
				`
						WITH insert_item_1 AS (
							INSERT INTO news_vote (news_id, voter_id, vote_type)
              VALUES ($1, $2, $3)
              RETURNING voter_id
						),
            update_item_1 AS (
							UPDATE news
              SET ${vote_type}_votes_counter = ${vote_type}_votes_counter + 1
              WHERE news_id = ($1)
              RETURNING news_id
						)

            SELECT * FROM update_item_1, insert_item_1;
					`,
				[news_id, isAuthorized.id, vote_type]
			);

			return res.status(201).json({
				status: 'success',
				message: 'Vote Inserted successfully!',
				data: data.rows[0],
			});
		} else if (req.method === 'PATCH') {
			const { news_id, old_type, new_type } = req.body;

			if (
				!old_type ||
				!new_type ||
				(old_type !== 'up' && old_type !== 'down') ||
				(new_type !== 'up' && new_type !== 'down')
			) {
				return res.status(404).json({
					status: 'error',
					message: 'An undefined vote!',
				});
			}

			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const data = await pool
				.query(
					`
						UPDATE news_vote SET vote_type = ($1)
						WHERE news_id = ($2) AND voter_id = ($3) AND vote_type = ($4)
						RETURNING vote_type
						;
					`,
					[new_type, news_id, isAuthorized.id, old_type]
				)
				.then((response) => response.rows[0]);

			if (!data?.vote_type) {
				return res.status(404).json({
					status: 'error',
					message: "Couldn't find the vote!",
				});
			}

			await pool
				.query(
					`
						UPDATE news SET ${old_type}_votes_counter = ${old_type}_votes_counter - 1, ${new_type}_votes_counter = ${new_type}_votes_counter + 1
						WHERE news_id = ($1)
						RETURNING news_id
						;
					`,
					[news_id]
				)
				.then((response) => response.rows[0]);

			return res.status(201).json({
				status: 'success',
				message: 'Vote Changed Successfully!',
				data,
			});
		} else if (req.method === 'DELETE') {
			const { news_id, vote_type } = req.body;

			if (!vote_type || (vote_type !== 'up' && vote_type !== 'down')) {
				return res.status(404).json({
					status: 'error',
					message: 'An undefined vote!',
				});
			}

			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const result = await pool
				.query(
					`
            DELETE FROM news_vote
            WHERE news_id = ($1) and voter_id = ($2)
            RETURNING voter_id
					`,
					[news_id, isAuthorized.id]
				)
				.then((response) => response.rows[0]);

			if (result.voter_id) {
				await pool.query(
					`
            UPDATE news
            SET ${vote_type}_votes_counter = ${vote_type}_votes_counter - 1
            WHERE news_id = ($1)
            RETURNING news_id
          `,
					[news_id]
				);
			} else {
				return res.status(404).json({
					status: 'error',
					message: "Can't find the vote!",
				});
			}

			return res.status(201).json({
				status: 'success',
				message: 'Vote Deleted Successfully!',
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

export default api;
