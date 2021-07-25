import { pool } from '@lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'GET') {
		return;
	}

	if (req.method === 'GET') {
		try {
			const { news_id, user_id } = req.query;

			const result = await pool
				.query(
					'SELECT news_reaction_id FROM news_reactor WHERE news_id=($1) AND news_reactor=($2)',
					[[news_id, user_id]]
				)
				.then((response) => response.rows[0]);

			if (!result.content) {
				res.status(404).json({
					status: 'error',
					message: 'No Reaction Found :-(',
					data: {},
				});
				return;
			}

			res.status(200).json({
				status: 'success',
				message: 'The Article Content Arrived Successfully!, Enjoy ;)',
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

/*

			${news_reactor_id ? `,'user_reaction', user_reaction.case` : ''}
			
		${
			news_reactor_id
				? `JOIN LATERAL (
			SELECT case when exists (
				SELECT news_reaction.type AS type FROM news_reactor
				WHERE news_reaction.news_id = news.news_id
				AND news_reactor.news_reactor_id = ($${news_reactor_id_index}) -- news_reactor_id=d47030a8-cad9-4e94-a7ce-60ad6ae48ec8
				AND news_reactor.news_reaction_id = news_reaction.news_reaction_id
			)
				then true
				else false
			end
		) user_reaction ON TRUE`
				: ''
		}
*/
