import { pool } from '@lib/v1/pg';

export const getNews = async ({
  with_news_article_content,
  newsVotedByUser,
  newsCreatedBefore,
  newsByUserId,
  filterByArticleTagsOr,
  filterByArticleTagsAnd,
} = {}) => {
  // const {
  //   with_news_article_content,
  //   newsVotedByUser,
  //   newsCreatedBefore,
  //   newsByUserId,
  //   filterByArticleTagsOr,
  //   filterByArticleTagsAnd,
  // } = req.query;

  const queryParams = [];
  let whereClause = 'WHERE type_data IS NOT NULL';
  let articleTagsJoinCondition = 'TRUE';
  let voter_id_index = '';

  if (newsCreatedBefore) {
    queryParams.push(newsCreatedBefore);
    whereClause += ` AND news.created_at < $${queryParams.length}`;
  }

  if (newsByUserId) {
    queryParams.push(newsByUserId);
    whereClause += ` AND news.author_id = $${queryParams.length}`;
  }

  if (newsVotedByUser) {
    queryParams.push(newsVotedByUser);
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
          news.updated_at,
        
          user_profile.user_profile_id AS author_id,
          user_profile.user_name_id AS author_user_name_id,
          user_profile.first_name AS author_first_name,
          user_profile.last_name AS author_last_name,
          user_profile.profile_picture AS author_profile_picture,
          user_profile.bio AS author_bio,

          ${newsVotedByUser ? 'user_vote.vote_type AS user_vote_type,' : ''}

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
          newsVotedByUser
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
      `,
      queryParams
    )
    .then(async (response) => response.rows);

  let hit_news_items_limit = false;

  if (result?.length < 10) {
    hit_news_items_limit = true;
  }
  
  return { news: result, hit_news_items_limit };
}
