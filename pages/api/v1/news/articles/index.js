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
				voter_id,
				filter_by_user_id,
			} = req.query;

			let whereClause = '';
			let voter_id_index = '';
			const queryParams = [];

			if (filter_by_user_id) {
				queryParams.push(filter_by_user_id);
				if (whereClause.length === 0)
					whereClause += `WHERE news.author_id = $${queryParams.length}`;
				else whereClause += ` news.author_id = $${queryParams.length}`;
			}

			if (voter_id) {
				queryParams.push(voter_id);
				voter_id_index = queryParams.length;
			}

			const sqlQuery = `
				SELECT
					news.news_id,
					news.type,
					news.comments_counter,
					news.up_votes_counter,
					news.down_votes_counter,
					news.created_at,
					news.updated_on,
				
					${
						with_author_data
							? `user_profile.user_profile_id AS author_id,
					user_profile.user_name_id AS author_user_name_id,
					user_profile.first_name AS author_first_name,
					user_profile.last_name AS author_last_name,
					user_profile.profile_picture AS author_profile_picture,
					user_profile.bio AS author_bio,`
							: ''
					}
					
					${voter_id ? 'user_vote.vote_type AS user_vote_type,' : ''}

					news_article.title,
					news_article.slug,
					news_article.iso_language,
					news_article.iso_country,
					news_article.image,
					news_article.description,
					${with_news_article_content ? 'news_article.content,' : ''}
					
					ARRAY (
						SELECT news_tag.name AS tag
						FROM news_tag
						WHERE news_tag.news_id = news_article.news_article_id
					) AS tags
				
				FROM news
				${
					with_author_data
						? `JOIN user_profile ON user_profile.user_profile_id = news.author_id`
						: ''
				}
				JOIN news_article ON news_article.news_article_id = news.news_id
				${
					voter_id
						? `
						LEFT JOIN LATERAL (
							SELECT news_vote.vote_type FROM news_vote WHERE news_vote.news_id = news.news_id AND news_vote.voter_id = ($${voter_id_index})
						) user_vote ON TRUE
					`
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
