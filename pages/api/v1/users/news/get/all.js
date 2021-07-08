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
							news.author_id,
							news.type,
							news.content,
							news.comments_count,
							news.created_at,
							news.updated_on,
						
							user_profile.user_profile_id AS author_user_name_id,
							user_profile.first_name,
							user_profile.last_name,
							user_profile.profile_picture
						
						FROM user_profile
						JOIN news ON news.author_id = user_profile.user_profile_id
						ORDER BY news.created_at DESC;
					`
				)
				.then((response) => {
					// response.rows
				});

			return res.status(200).json({
				status: 'success',
				message: 'The newest Posts Arrived Successefully!, Enjoy ;)',
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

/*
(() => {
const articles = [];
const posts = [];

const news = [
    {
        id: '1',
        type: 'article'
    },
    {
        id: '2',
        type: 'post'
    },
    {
        id: '3',
        type: 'article'
    },
];

news.forEach((item, index) => {
    if(item.type === 'article') articles.push({
        id: item.id,
        index
    });
    else if(item.type === 'post') posts.push({
        id: item.id,
        index
    });
});

const withGetPosts = posts.length ? `WITH get_posts as (
    SELECT
        post.content
    from post WHERE post_id IN (${posts.map(post => post.id).join(', ')});
)` : '';
const withGetArticles = articles.length ? `WITH get_articles as (
    SELECT
        article.format_type
        article.title
        article.slug
        article.image
        article.description
        article.content
    from article WHERE article_id IN (${articles.map(article => article.id).join(', ')});
)` : '';

const sqlQuery = `
    ${[withGetPosts, withGetArticles].filter(item => item.length !== 0).join(',\n')}
    
    SELECT * FROM ${[withGetPosts, withGetArticles].filter(item => item.length !== 0).join(',\n')}
    
`;


})()
*/
