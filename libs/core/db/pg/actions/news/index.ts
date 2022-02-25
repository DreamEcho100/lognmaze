// import { pool } from '@lib/v1/pg';
import pool from '../../connection';
import { TGetNews } from '../../ts';

const getNews: TGetNews = async ({
	with_news_blog_content,
	isNewsVotedByUser,
	newsCreatedBefore,
	newsByUserId,
	filterByBlogTagsOr,
	filterByBlogTagsAnd,
} = {}) => {
	// const {
	//   with_news_blog_content,
	//   isNewsVotedByUser,
	//   newsCreatedBefore,
	//   newsByUserId,
	//   filterByBlogTagsOr,
	//   filterByBlogTagsAnd,
	// } = req.query;

	const queryParams = [];
	let whereClause = 'WHERE type_data IS NOT NULL';
	let blogTagsJoinCondition = 'TRUE';
	let voter_id_index: number | string = '';

	if (newsCreatedBefore)
		whereClause += ` AND news.created_at < $${queryParams.push(
			newsCreatedBefore
		)}`;

	if (newsByUserId)
		whereClause += ` AND news.author_id = $${queryParams.push(newsByUserId)}`;

	if (isNewsVotedByUser) voter_id_index = queryParams.push(isNewsVotedByUser);

	if (filterByBlogTagsOr) {
		queryParams.push(
			Array.isArray(filterByBlogTagsOr)
				? filterByBlogTagsOr
				: filterByBlogTagsOr.split(',')
		);
		if (blogTagsJoinCondition === 'TRUE') {
			blogTagsJoinCondition = `tags_agg.tags && $${queryParams.length}`;
		} else {
			blogTagsJoinCondition += `AND tags_agg.tags && $${queryParams.length}`;
		}
	}

	if (filterByBlogTagsAnd) {
		queryParams.push(
			Array.isArray(filterByBlogTagsAnd)
				? filterByBlogTagsAnd
				: filterByBlogTagsAnd.split(',')
		);
		if (blogTagsJoinCondition === 'TRUE') {
			blogTagsJoinCondition = `tags_agg.tags <@ $${queryParams.length}`;
		} else {
			blogTagsJoinCondition += `AND tags_agg.tags <@ $${queryParams.length}`;
		}
	}

	const sqlQuery = `
	SELECT
		news.news_id,
		news.type,
		news.comments_counter,
		news.up_votes_counter,
		news.down_votes_counter,
		news.created_at,
		news.updated_at,
	
		user_profile.user_profile_id AS author_id,
		user_profile.user_name_id AS author_user_name_id,
		user_profile.first_name AS author_first_name,
		user_profile.last_name AS author_last_name,
		user_profile.profile_picture AS author_profile_picture,
		user_profile.bio AS author_bio,

		${isNewsVotedByUser ? 'user_vote.vote_type AS user_vote_type,' : ''}

		type_data_agg.type_data

	FROM news
	JOIN user_profile ON user_profile.user_profile_id = news.author_id
	JOIN LATERAL (
		SELECT (CASE WHEN news.type = 'blog' THEN (
			SELECT
				json_build_object(
					'title', news_blog.title,
					'slug', news_blog.slug,
					'iso_language', news_blog.iso_language,
					'iso_country', news_blog.iso_country,
					'image_alt', news_blog.image_alt,
					'image_src', news_blog.image_src,
					'description', news_blog.description,
					${with_news_blog_content ? "'content', news_blog.content," : ''}
					'tags', tags_agg.tags
				) AS type_data

			FROM news_blog
			INNER JOIN LATERAL (
				SELECT ARRAY (
					SELECT news_tag.name AS tag
					FROM news_tag
					WHERE news_tag.news_id = news_blog.news_blog_id
					GROUP BY name
					) AS tags
			) tags_agg ON ${blogTagsJoinCondition}
			WHERE news_blog.news_blog_id = news.news_id
		) ELSE (
			SELECT json_build_object( 'content', news_post.content) AS type_data FROM news_post WHERE news_post_id = news_id
		) END)
	) type_data_agg ON TRUE
	${
		isNewsVotedByUser
			? `
		LEFT JOIN LATERAL (
			SELECT news_vote.vote_type FROM news_vote WHERE news_vote.news_id = news.news_id AND news_vote.voter_id = ($${voter_id_index})
		) user_vote ON TRUE
	`
			: ''
	}
	${whereClause}
	ORDER BY news.created_at DESC
	LIMIT 10
	;				
`;

	const result = await pool
		.query(sqlQuery, queryParams)
		.then(async (response: { rows: any[] }) => response.rows);

	let hit_news_items_limit = false;

	if (result?.length < 10) {
		hit_news_items_limit = true;
	}

	return { news: result, hit_news_items_limit };
};

const newsActions = {
	get: getNews,
};

export default newsActions;
