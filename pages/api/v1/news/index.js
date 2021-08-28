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
			const {
				with_news_article_content,
				voter_id,
				filter_by_user_id,
				filterByArticleTagsOr,
				filterByArticleTagsAnd,
			} = req.query;

			const queryParams = [];
			let whereClause = '';
			let articleTagsJoinCondition = 'TRUE';
			let voter_id_index = '';

			if (filter_by_user_id) {
				queryParams.push(filter_by_user_id);
				whereClause += `AND news.author_id = $${queryParams.length}`;
			}

			if (voter_id) {
				queryParams.push(voter_id);
				voter_id_index = queryParams.length;
			}

			if (filterByArticleTagsOr) {
				queryParams.push(filterByArticleTagsOr.split(','));
				if (articleTagsJoinCondition === 'TRUE') {
					articleTagsJoinCondition = `tags_agg.tags && $${queryParams.length}`;
				} else {
					articleTagsJoinCondition += `AND tags_agg.tags && $${queryParams.length}`;
				}
			}

			if (filterByArticleTagsAnd) {
				queryParams.push(filterByArticleTagsAnd.split(','));
				if (articleTagsJoinCondition === 'TRUE') {
					articleTagsJoinCondition = `tags_agg.tags <@ $${queryParams.length}`;
				} else {
					articleTagsJoinCondition += `AND tags_agg.tags <@ $${queryParams.length}`;
				}
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

						type_data_agg.type_data

					FROM news
					JOIN user_profile ON user_profile.user_profile_id = news.author_id
					JOIN LATERAL (
						SELECT (CASE WHEN news.type = 'article' THEN (
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
									'tags', tags_agg.tags
								) AS type_data

							FROM news_article
							INNER JOIN LATERAL (
								SELECT ARRAY (
									SELECT news_tag.name AS tag
									FROM news_tag
									WHERE news_tag.news_id = news_article.news_article_id
									GROUP BY name
									) AS tags
							) tags_agg ON ${articleTagsJoinCondition}
							WHERE news_article.news_article_id = news.news_id
						) ELSE (
							SELECT json_build_object( 'content', news_post.content) AS type_data FROM news_post WHERE news_post_id = news_id
						) END)
					) type_data_agg ON TRUE
					${
						voter_id
							? `
						LEFT JOIN LATERAL (
							SELECT news_vote.vote_type FROM news_vote WHERE news_vote.news_id = news.news_id AND news_vote.voter_id = ($${voter_id_index})
						) user_vote ON TRUE
					`
							: ''
					}
					WHERE type_data IS NOT NULL ${whereClause}
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
						RETURNING news_id, author_id
					`,
					[isAuthorized.id, type]
				)
				.then(async (response) => {
					news_id_to_delete = response.rows[0].news_id;

					if (type === 'article') {
						const params = [
							response.rows[0].news_id,
							news_data.title,
							news_data.slug,
							news_data.iso_language,
							news_data.iso_country,
							news_data.image_alt,
							news_data.image_src,
							news_data.description,
							news_data.content,
						];

						const tagsToInsert = news_data.tags;
						let tagsToInsertStringValue = [];

						let i;
						for (i = 0; i < tagsToInsert.length; i++) {
							params.push(tagsToInsert[i]);
							tagsToInsertStringValue.push(`$${params.length}`);
						}

						params.push(response.rows[0].author_id);

						const sqlQuery = `
							WITH insert_items_1 AS (
								INSERT INTO news_article 
								(news_article_id, title, slug, iso_language, iso_country, image_alt, image_src, description, content)
								VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
								RETURNING news_article_id
							),
							upsert_items_1 AS (
								INSERT INTO tag (name) 
								VALUES (${tagsToInsertStringValue.join('),(')})
								ON CONFLICT (name) DO UPDATE 
								SET counter = tag.counter + 1
								RETURNING tag.name
							),
							insert_items_2 AS (
								INSERT INTO news_tag
								(news_id, name)
								VALUES ($1,${tagsToInsertStringValue.join('),($1,')})
								RETURNING news_tag_id
							),
							update_news_article_counter_on_user_profile AS (
								UPDATE user_profile SET news_article_counter = news_article_counter + 1
								WHERE user_profile_id = ($${params.length})
								RETURNING user_profile_id
							)

							SELECT news_article_id, name, news_tag_id user_profile_id
							FROM insert_items_1, upsert_items_1, insert_items_2, update_news_article_counter_on_user_profile
						`;

						const response2 = await pool.query(sqlQuery, params);
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

					news_id_to_delete = '';

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
			const cte = [
				`
				update_item_1 AS (
					UPDATE news SET updated_on = ($3)
					WHERE news_id = ($1) AND author_id = ($2)
				)
			`,
			];
			const cteNames = ['update_item_1'];
			const params = [
				req.body.news_id,
				isAuthorized.id,
				new Date().toUTCString(),
			];

			const array = [];

			// array.push({
			// 	table: 'news',
			// 	type: 'update',
			// 	keysAndValues: {
			// 		updated_on: new Date().toUTCString(),
			// 	},
			// 	$where: {
			// 		news_id: req.body.news_id,
			// 		$and: {
			// 			author_id: isAuthorized.id,
			// 		},
			// 	},
			// });

			if (type === 'article') {
				if (Object.keys(req.body.news_data).length !== 0) {
					const newsDataToUpdate = [];
					let item;
					for (item in req.body.news_data) {
						params.push(req.body.news_data[item]);
						newsDataToUpdate.push(`${item}=($${params.length})`);
					}

					cte.push(`
						update_item_2 AS (
							UPDATE news_article SET ${newsDataToUpdate.join(',')}
							WHERE news_article_id = ($1)
						)
					`);
					cteNames.push('update_item_2');

					// array.push({
					// 	table: 'news_article',
					// 	type: 'update',
					// 	keysAndValues: {
					// 		...req.body.news_data,
					// 	},
					// 	$where: {
					// 		news_article_id: req.body.news_id,
					// 	},
					// });
				}

				const { tags } = req.body;
				let startIndex = 0;

				const tagsToUpdateTo = [];
				const tagsToUpdateFrom = [];

				const tagsToRemove = [];
				const tagsToInsert = [];

				const tagsToDecrement = [];
				const tagsToIncrement = [];

				if (tags?.added?.length !== 0 || tags?.removed?.length !== 0) {
					tags.removed.forEach((tag, index) => {
						if (index < tags.added.length) {
							params.push(tags.added[index]);

							tagsToUpdateTo.push(tags.added[index]);
							tagsToUpdateFrom.push(tag);

							startIndex = index + 1;
						} else {
							tagsToRemove.push(tag);
						}
					});

					let tagsToUpdateTotLocation = [];
					let tagsToUpdateFromLocation = [];
					if (tagsToUpdateTo.length !== 0 && tagsToUpdateFrom.length !== 0) {
						tagsToUpdateTo.forEach((tag, index) => {
							params.push(tag);
							params.push(tagsToUpdateFrom[index]);

							tagsToUpdateTotLocation.push(`$${params.length - 1}`);
							tagsToUpdateFromLocation.push(`$${params.length}`);

							cte.push(`
						update_news_tag_${index} AS (
							UPDATE news_tag SET=($${params.length - 1})
							WHERE news_id = ($1) AND name = ($${params.length})
						)
					`);
							cteNames.push('update_news_tag_!{ind$x}');
						});
					}

					let tagsToRemoveLocation = [];
					if (tagsToRemove.length !== 0) {
						tagsToRemove.forEach((tag, index) => {
							params.push(tag);

							tagsToRemoveLocation.push(`$${params}`);
						});

						cte.push(`
							delete_item_1 AS (
								DELETE FROM news_tags
								WHERE news_id = ($1) AND name IN (${tagsToRemoveLocation.join(',')})
							)
						`);
						cteNames.push('delete_item_1');
					}

					let tagsToInsertLocation = [];
					if (startIndex < tags.added.length) {
						tagsToInsert = tags.added.slice(startIndex);

						tagsToInsert.forEach((tag, index) => {
							params.push(tag);

							tagsToInsertLocation.push(`$${params}`);
						});

						cte.push(`
							insert_news_tags AS (
								INSERT INTO news_tag (news_id, name)
								VALUES ($1,${tagsToInsertLocation.join('),($1,')})
							)
						`);
						cteNames.push('insert_news_tags');
					}

					cte.push(`
							upsert_tag AS (
								INSERT INTO tag (name) 
								VALUES (${[...tagsToInsertLocation, ...tagsToUpdateTotLocation].join('),(')})
								ON CONFLICT (name) DO UPDATE 
								SET counter = tag.counter + 1
								RETURNING tag.name
							),
					`);
					cteNames.push('upsert_tag');

					cte.push(`
							update_tag AS (
								UPDATE tag
								SET counter = tag.counter - 1
								WHERE name IN (${[
									...tagsToInsetagsToRemoveLocationrtLocation,
									...tagsToUpdateFromLocation,
								].join('),(')})
								RETURNING tag.name
							),
					`);
					cteNames.push('update_tag');
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

			console.log('params', params);
			console.log('cte', cte);
			console.log('cteNames', cteNames);

			// const queryBuilder = new QueryBuilder();
			// const { SQLCTEQuery, CTEParamsArray } = queryBuilder.arrayToCTE(array);

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
					.query('DELETE FROM news WHERE news_id = ($1) RETURNING type', [
						news_id_to_delete,
					])
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
