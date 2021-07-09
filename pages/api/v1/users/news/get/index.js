import { pool } from '@/lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'GET') {
		return;
	}

	if (req.method === 'GET') {
		try {
			// const { index } = req.header;
			const result = await pool
				.query(
					`
						SELECT
							news.news_id,
							news.type,
							news.comments_count,
							news.created_at,
							news.updated_on,
						
							user_profile.first_name,
							user_profile.last_name,
							user_profile.profile_picture

						FROM news
						JOIN user_profile ON user_profile.user_profile_id = news.author_id
						ORDER BY news.updated_on DESC;				
					`
				)
				.then(async (response) => {
					const idsRefereToIndexes = {};
					const articlesIds = [];
					const postsIds = [];
					let sqlQuery;

					response.rows.forEach((item, index) => {
						idsRefereToIndexes[item.news_id] = index;
						if (item.type === 'article') articlesIds.push(`'${item.news_id}'`);
						else if (item.type === 'post') postsIds.push(`'${item.news_id}'`);
					});

					if (postsIds.length !== 0) {
						sqlQuery = `
							SELECT
								news_post_id AS id,
								content
							from news_post WHERE news_post_id IN (${postsIds.join(',')})
						`;

						await pool.query(sqlQuery).then((response2) => {
							response2.rows.forEach((item) => {
								const id = item.id;
								delete item.id;
								response.rows[idsRefereToIndexes[id]] = {
									...response.rows[idsRefereToIndexes[id]],
									...item,
								};
							});
						});
					}

					if (articlesIds.length !== 0) {
						sqlQuery = `
							SELECT
								news_tags.tags,

								news_article.news_article_id AS id,
								news_article.format_type,
								news_article.title,
								news_article.slug,
								news_article.image,
								news_article.description,
								news_article.content

							FROM news_article
							JOIN LATERAL(
											SELECT ARRAY (
															-- SELECT array_agg(post_tags.name) AS tags
															SELECT news_tag.name AS tag
															FROM news_tag
															-- JOIN posts
															-- ON news_tag.post_id = posts.id
															WHERE news_tag.news_id = news_article.news_article_id
											) AS tags
							) news_tags ON TRUE
							WHERE news_article.news_article_id IN (${articlesIds.join(',')})
						`;

						await pool.query(sqlQuery).then((response2) => {
							response2.rows.forEach((item) => {
								const id = item.id;
								delete item.id;
								response.rows[idsRefereToIndexes[id]] = {
									...response.rows[idsRefereToIndexes[id]],
									...item,
								};
							});
						});
					}

					return response.rows;
				});

			return res.status(200).json({
				status: 'success',
				message: 'The newest News Arrived Successefully!, Enjoy ;)',
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
