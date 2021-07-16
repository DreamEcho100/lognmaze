import { handleIsAuthorized } from '@/lib/v1/auth';
import { pool, arrayToCTE } from '@/lib/v1/pg';

export default async (req, res) => {
	if (
		!(req.method === 'GET' || req.method === 'POST' || req.method === 'PATCH')
	) {
		return;
	}
	if (req.method === 'GET') {
		try {
			const { with_news_article_content } = req.headers;
			const result = await pool
				.query(
					`
						SELECT
							news.news_id,
							news.type,
							news.comments_count,
							news.created_at,
							news.updated_on,
						
							user_profile.user_profile_id AS author_id,
							user_profile.user_name_id AS author_user_name_id,
							user_profile.first_name AS author_first_name,
							user_profile.last_name AS author_last_name,
							user_profile.profile_picture AS author_profile_picture

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
								news_article.iso_language,
								news_article.iso_country,
								news_article.image,
								news_article.description
								${with_news_article_content ? ',news_article.content' : ''}

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
	} else if (req.method === 'POST') {
		try {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const { type, ...news_data } = req.body;

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
						const { CTEFuncs, CTEFuncsNames } = arrayToCTE([
							{
								table: 'news_article',
								type: 'insert',
								sharedkeys: ['news_article_id'],
								sharedValues: ['$1'],
								distencKeysAndValues: {
									keys: [
										'format_type',
										'title',
										'slug',
										'iso_language',
										'iso_country',
										'image',
										'description',
										'content',
									],
									values: [['$2', '$3', '$4', '$5', '$6', '$7', '$8', '$9']],
									returning: [
										'format_type',
										'title',
										'slug',
										'iso_language',
										'iso_country',
										'image',
										'description',
										'content',
									],
								},
							},
							{
								table: 'news_tag',
								type: 'insert',
								sharedkeys: ['news_id'],
								sharedValues: ['$1'],
								distencKeysAndValues: {
									keys: ['name'],
									values: news_data.tags.map((tag) => [`'${tag}'`]),
								},
							},
						]);

						const sqlQuery = `WITH ${CTEFuncs.join(',')}

						SELECT * FROM ${CTEFuncsNames.join(',')}
					`;

						const response2 = await pool.query(sqlQuery, [
							response.rows[0].news_id,
							news_data.format_type,
							news_data.title,
							news_data.slug,
							news_data.iso_language,
							news_data.iso_country,
							news_data.image,
							news_data.description,
							news_data.content,
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
							[response.rows[0].news_id, news_data.content]
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
	} else if (req.method === 'PATCH') {
		try {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const { type /*, ...news_data*/ } = req.body;
			const array = [];

			array.push({
				table: 'news',
				type: 'update',
				keysAndValues: {
					updated_on: `'${new Date().toLocaleString()}'`,
				},
				$where: {
					news_id: `'${req.body.news_id}'`,
				},
			});

			if (type === 'article') {
				const { tags } = req.body;
				let startIndex = 0;
				const removedTags = [];

				array.push({
					table: 'news_article',
					type: 'update',
					keysAndValues: {
						...req.body.news_data,
					},
					$where: {
						news_article_id: `'${req.body.news_id}'`,
					},
				});

				tags.removed.forEach((tag, index) => {
					if (index < tags.added.length) {
						array.push({
							table: 'news_tag',
							type: 'update',
							keysAndValues: {
								name: `'${tags.added[0]}'`,
							},
							$where: {
								news_id: `'${req.body.news_id}'`,
								$and: {
									name: `'${tag}'`,
								},
							},
						});
						startIndex = index + 1;
					} else {
						removedTags.push(`'${tag}'`);
					}
				});

				if (removedTags.length !== 0) {
					array.push({
						table: 'news_tag',
						type: 'delete',
						$where: {
							news_id: `'${req.body.news_id}'`,
							$and: {
								$in: { name: removedTags },
							},
						},
					});
				}

				if (startIndex < tags.added.length) {
					array.push({
						table: 'news_tag',
						type: 'insert',
						sharedkeys: ['news_id'],
						sharedValues: [`'${req.body.news_id}'`],
						distencKeysAndValues: {
							keys: ['name'],
							values: tags.added.slice(startIndex).map((tag) => [`'${tag}'`]),
						},
					});
				}
			} else if (type === post) {
				array.push({
					table: 'news_post',
					type: 'update',
					keysAndValues: {
						...req.body.news_data,
					},
					$where: {
						news_id: `'${req.body.news_id}'`,
					},
				});
			}

			const { CTEFuncs, CTEFuncsNames } = arrayToCTE(array);
			const result = await pool
				.query(
					`
				WITH ${CTEFuncs.join(',')}

				SELECT * FROM ${CTEFuncsNames.join(',')}
			`
				)
				.then((response) => response.rows);

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

	return;
};
