import { handleIsAuthorized } from '@lib/v1/auth';
import { pool, QueryBuilder /*, queryBuilder */ } from '@lib/v1/pg';

export default async (req, res) => {
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

	let news_id_to_delete;

	try {
		if (req.method === 'GET') {
			const { with_news_article_content, voter_id, filter_by_user_id } =
				req.query;

			const queryParams = [];
			let whereClause = '';
			let voter_id_index = '';

			if (filter_by_user_id) {
				queryParams.push(filter_by_user_id);
				whereClause += `WHERE news.author_id = $${queryParams.length}`;
			}

			if (voter_id) {
				queryParams.push(voter_id);
				voter_id_index = queryParams.length;
			}

			const result = await pool
				.query(
					`
						SELECT 
						news.news_id,
						news.type,
						news.comments_counter,
						news.up_votes_counter,
						news.down_votes_counter,
						news.created_at,
						news.updated_on,
					
						user_profile.user_profile_id AS author_id,
						user_profile.user_name_id AS author_user_name_id,
						user_profile.first_name AS author_first_name,
						user_profile.last_name AS author_last_name,
						user_profile.profile_picture AS author_profile_picture,
						user_profile.bio AS author_bio,

						${voter_id ? 'user_vote.vote_type AS user_vote_type,' : ''}
					
						CASE WHEN news.type = 'article' THEN (
							SELECT 
									json_build_object(
									'title', news_article.title,
									'slug', news_article.slug,
									'iso_language', news_article.iso_language,
									'iso_country', news_article.iso_country,
									'image_alt', news_article.image_alt,
									'image_src', news_article.image_src,
									'description', news_article.description,
									${with_news_article_content ? "'content', news_article.content," : ''}
									'tags', ARRAY (
										SELECT news_tag.name AS tag
										FROM news_tag
										WHERE news_tag.news_id = news_article.news_article_id
									)
								) AS data
							FROM news_article
							WHERE news_article_id = news_id
						)
						ELSE (
							SELECT json_build_object( 'content', news_post.content) FROM news_post WHERE news_post_id = news_id
						)
						END AS type_data
					FROM news
					JOIN user_profile ON user_profile.user_profile_id = news.author_id
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
					;				
					`,
					queryParams
				)
				.then(async (response) => response.rows);

			return res.status(200).json({
				status: 'success',
				message: 'The newest News Arrived Successfully!, Enjoy ;)',
				data: result,
			});
		} else if (req.method === 'POST') {
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
					news_id_to_delete = response.rows[0].news_id;

					if (type === 'article') {
						const queryBuilder = new QueryBuilder();
						const {
							// SQLCTEQuery,
							CTEFuncCounter,
							CTEParamsArray,
							CTEFuncsNames,
							CTEFuncs,
						} = queryBuilder.arrayToCTE([
							{
								table: 'news_article',
								type: 'insert',
								target: 'one',
								sharedkeys: ['news_article_id'],
								sharedValues: [response.rows[0].news_id],
								distencKeysAndValues: {
									keys: [
										'title',
										'slug',
										'iso_language',
										'iso_country',
										'image_alt',
										'image_src',
										'description',
										'content',
									],
									values: [
										news_data.title,
										news_data.slug,
										news_data.iso_language,
										news_data.iso_country,
										news_data.image_alt,
										news_data.image_src,
										news_data.description,
										news_data.content,
									],
									returning: [
										'title',
										'slug',
										'iso_language',
										'iso_country',
										'image_alt',
										'image_src',
										'description',
										'content',
									],
								},
							},
							{
								table: 'news_tag',
								type: 'insert',
								target: 'many',
								sharedkeys: ['news_id'],
								sharedValues: [response.rows[0].news_id],
								distencKeysAndValues: {
									keys: ['name'],
									values: news_data.tags.map((tag) => [tag]),
								},
							},
						]);

						const response2 = await pool.query(
							`
								WITH ${CTEFuncs.join(',')},
								update_news_article_counter_on_user_profile AS (
									UPDATE user_profile SET news_article_counter = news_article_counter + 1
									WHERE user_profile_id = ($${CTEParamsArray.length + 1})
									RETURNING user_profile_id
								)
					
								SELECT * FROM ${CTEFuncsNames.join(
									','
								)}, update_news_article_counter_on_user_profile;
							`,
							[...CTEParamsArray, isAuthorized.id]
						);
					} else if (type === 'post') {
						const response2 = await pool.query(
							`
							WITH insert_item_1 AS (
								INSERT INTO news_post
									(
										news_post_id,
										content
									)
								VALUES ($1, $2)
								RETURNING news_post_id
							),
							update_news_post_counter_on_user_profile AS (
								UPDATE user_profile SET news_post_counter = news_post_counter + 1
								WHERE user_profile_id = ($3)
								RETURNING user_profile_id
							)

							SELECT * FROM insert_item_1, update_news_post_counter_on_user_profile;
							`,
							[response.rows[0].news_id, news_data.content, isAuthorized.id]
						);
					}

					return response.rows[0];
				});

			return res.status(200).json({
				status: 'success',
				message: 'Posted Successfully!',
				data: newPost,
				isAuthorized: true,
			});
		} else if (req.method === 'PATCH') {
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
					updated_on: new Date().toLocaleString(),
				},
				$where: {
					news_id: req.body.news_id,
					$and: {
						author_id: isAuthorized.id,
					},
				},
			});

			if (type === 'article') {
				const { tags } = req.body;
				let startIndex = 0;
				const removedTags = [];

				if (Object.keys(req.body.news_data).length !== 0) {
					array.push({
						table: 'news_article',
						type: 'update',
						keysAndValues: {
							...req.body.news_data,
						},
						$where: {
							news_article_id: req.body.news_id,
						},
					});
				}

				if (
					(req.body.tags.added && req.body.tags.added.length !== 0) ||
					(req.body.tags.removed && req.body.tags.removed.length !== 0)
				) {
					tags.removed.forEach((tag, index) => {
						if (index < tags.added.length) {
							array.push({
								table: 'news_tag',
								type: 'update',
								keysAndValues: {
									name: tags.added[0],
								},
								$where: {
									news_id: req.body.news_id,
									$and: {
										name: tag,
									},
								},
							});
							startIndex = index + 1;
						} else {
							removedTags.push(tag);
						}
					});

					if (removedTags.length !== 0) {
						array.push({
							table: 'news_tag',
							type: 'delete',
							$where: {
								news_id: req.body.news_id,
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
							target: 'many',
							sharedkeys: ['news_id'],
							sharedValues: [req.body.news_id],
							distencKeysAndValues: {
								keys: ['name'],
								values: tags.added.slice(startIndex).map((tag) => [tag]),
							},
						});
					}
				}
			} else if (type === 'post') {
				array.push({
					table: 'news_post',
					type: 'update',
					keysAndValues: {
						...req.body.news_data,
					},
					$where: {
						news_post_id: req.body.news_id,
					},
				});
			}

			const queryBuilder = new QueryBuilder();
			const { SQLCTEQuery, CTEParamsArray } = queryBuilder.arrayToCTE(array);

			const result = await pool
				.query(SQLCTEQuery, CTEParamsArray)
				.then((response) => response.rows);

			return res.status(200).json({
				status: 'success',
				message: 'Posted Successfully!',
				data: {},
				isAuthorized: true,
			});
		} else if (req.method === 'DELETE') {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const result = await pool
				.query(
					'DELETE FROM news WHERE news_id = ($1) AND author_id = ($2) RETURNING type',
					[req.body.news_id, isAuthorized.id]
				)
				.then((response) => response.rows[0]);

			const result2 = await pool
				.query(
					`
						UPDATE user_profile SET news_${result.type}_counter = news_${result.type}_counter - 1
						WHERE user_profile_id = ($1)
						RETURNING user_profile_id
					`,
					[isAuthorized.id]
				)
				.then((response) => response.rows[0]);

			return res.status(200).json({
				status: 'success',
				message: 'Deleted Successfully!',
				data: {},
				isAuthorized: true,
			});
		}
	} catch (error) {
		console.error(`Error, ${error.message}`);
		try {
			if (news_id_to_delete && req.method === 'POST') {
				const result = await pool
					.query(
						'DELETE FROM news WHERE news_id = ($1) AND author_id = ($2) RETURNING type',
						[req.body.news_id, isAuthorized.id]
					)
					.then((response) => response.rows[0]);
			}
		} catch (error2) {
			console.error(`Error, ${error2.message}`);
		}
		return res.status(500).json({
			status: 'error',
			message: error.message || 'Something went wrong!',
			data: {},
			isAuthorized: false,
		});
	}

	return;
};
