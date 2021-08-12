import { pool } from '@lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'GET') {
		return;
	}

	if (req.method === 'GET') {
		try {
			const {
				with_news_article_content,
				with_author_data,
				news_reactor_id,
				filter_by_user_id,
			} = req.query;

			let whereClause = '';
			let news_reactor_id_index = '';
			const queryParams = [];

			if (filter_by_user_id) {
				queryParams.push(filter_by_user_id);
				if (whereClause.length === 0)
					whereClause += `WHERE news.author_id = $${queryParams.length}`;
				else whereClause += ` news.author_id = $${queryParams.length}`;
			}

			if (news_reactor_id) {
				queryParams.push(news_reactor_id);
				news_reactor_id_index = queryParams.length;
			}

			const sqlQuery = `
				SELECT
					news.news_id,
					news.type,
					news.comments_counter,
					news.created_at,
					news.updated_on,
				
					${
						with_author_data
							? `user_profile.user_profile_id AS author_id,
					user_profile.user_name_id AS author_user_name_id,
					user_profile.first_name AS author_first_name,
					user_profile.last_name AS author_last_name,
					user_profile.profile_picture AS author_profile_picture,`
							: ''
					}
					
					news_tags.tags,
					
					news_reaction.*,
					${news_reactor_id ? 'news_reactor_reaction.*,' : ''}

					news_article.title,
					news_article.slug,
					news_article.iso_language,
					news_article.iso_country,
					news_article.image,
					news_article.description
					${with_news_article_content ? ',news_article.content' : ''}
				
				FROM news
				${
					with_author_data
						? `JOIN user_profile ON user_profile.user_profile_id = news.author_id`
						: ''
				}
				JOIN news_article ON news_article.news_article_id = news.news_id
				JOIN LATERAL(
					SELECT ARRAY (
						SELECT news_tag.name AS tag
						FROM news_tag
						WHERE news_tag.news_id = news_article.news_article_id
					) AS tags
				) news_tags ON TRUE
				JOIN LATERAL (
					SELECT json_agg (
						json_build_object (
							'news_reaction_id', news_reaction.news_reaction_id ,
							'type', news_reaction.type,
							'counter', news_reaction.counter
						)
					) AS reactions
						FROM  news_reaction
						WHERE news_reaction.news_id = news.news_id
					
				) news_reaction ON TRUE
				${
					news_reactor_id
						? `LEFT JOIN LATERAL (
							SELECT type AS user_reaction FROM news_reaction
							JOIN news_reactor ON news_reactor.news_reaction_id = news_reaction.news_reaction_id
							WHERE news_reaction.news_id = news.news_id AND news_reactor.news_reactor_id = ($${news_reactor_id_index})
						) news_reactor_reaction ON TRUE`
						: ''
				}
				${whereClause}
				ORDER BY news.created_at DESC;										
			`;

			const result = await pool
				.query(sqlQuery, queryParams)
				.then(async (response) => response.rows);

			return res.status(200).json({
				status: 'success',
				message: 'The newest News Arrived Successfully!, Enjoy ;)',
				data: result,
			});
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
