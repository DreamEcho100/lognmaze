import { handleIsAuthorized } from '@/lib/v1/auth';
import { pool } from '@/lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'POST') {
		return;
	}

	if (req.method === 'POST') {
		try {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.Authorization
			);

			if (!isAuthorized.id) return;

			const { type, ...newsData } = req.body;

			const newPost = await pool
				.query(
					`
						INSERT INTO news
							(
								author_id,
								type
							)
						VALUES
							($1, $2)
						RETURNING news_id;				
					`,
					[isAuthorized.id, type]
				)
				.then(async (response) => {
					if (type === 'article') {
						const sqlQuery = `
							WITH add_news_article AS (
								INSERT INTO news_article
									(
										news_article_id,
										format_type,
										title,
										slug,
										image,
										description,
										content
									)
								VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
							)${
								newsData.tags.length !== 0
									? `, 
								${newsData.tags
									.map(
										(tag, index) => ` add_news_tag_${index} AS (
										INSERT INTO news_tag (news_id, name) VALUES ('${response.rows[0].news_id}', '${tag}') RETURNING *
									)`
									)
									.join(',')}`
									: ''
							}
								
							SELECT * FROM add_news_article${
								newsData.tags.length !== 0
									? ' ,' +
									  newsData.tags
											.map((tag, index) => ` add_news_tag_${index}`)
											.join(',')
									: ''
							};
						`;
						const response2 = await pool.query(sqlQuery, [
							response.rows[0].news_id,
							newsData.formatType,
							newsData.title,
							newsData.slug,
							newsData.image,
							newsData.description,
							newsData.content,
						]);
					} else if (type === 'post') {
						const response2 = await pool.query(
							`
							INSERT INTO news_post
								(
									news_post_id,
									content
								)
							VALUES ($1, $2)`,
							[response.rows[0].news_id, newsData.content]
						);
					}
				});

			return res.status(200).json({
				status: 'success',
				message: 'Posted Successefully!',
				data: {},
				isAuthorized: true,
			});
		} catch (error) {
			console.error(`Error, ${error}`);
			return res.status(500).json({
				status: 'error',
				message: error.message || 'Something went wrong!',
				data: {},
				isAuthorized: false,
			});
		}
	}
};
