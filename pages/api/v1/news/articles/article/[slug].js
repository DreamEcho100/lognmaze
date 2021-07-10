import { pool } from '@/lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'GET') {
		return;
	}

	if (req.method === 'GET') {
		try {
			const { slug } = req.query;

			const result = await pool
				.query(
					`
						SELECT

							news.news_id,
							news.type,
							news.comments_count,
							news.created_at,
							news.updated_on,
							
							news_tags.tags,

							news_article.format_type,
							news_article.title,
							news_article.slug,
							news_article.image,
							news_article.description,
							news_article.content,

							user_profile.user_profile_id AS author_id,
							user_profile.user_name_id AS author_name_id,
							user_profile.first_name AS author_first_name,
							user_profile.last_name AS author_last_name,
							user_profile.profile_picture AS author_profile_picture

						FROM news
						JOIN user_profile ON user_profile.user_profile_id = news.author_id
						JOIN news_article ON news_article.news_article_id = news.news_id
						JOIN LATERAL(
							SELECT ARRAY (
								SELECT news_tag.name AS tag
								FROM news_tag
								WHERE news_tag.news_id = news_article.news_article_id
							) AS tags
						) news_tags ON TRUE
						WHERE news_article.slug = $1
						ORDER BY news.updated_on DESC
				`,
					[slug]
				)
				.then((response) => response.rows[0]);

			if (!result.news_id) {
				res.status(404).json({
					status: 'error',
					message: 'No Article Found :(',
					data: {},
				});
				return;
			}

			res.status(200).json({
				status: 'success',
				message: 'The Article Arrived Successefully!, Enjoy ;)',
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