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
							users.user_name_id AS author_user_name_id,
							
							users_profile.first_name,
							users_profile.last_name,
							users_profile.profile_picture,
							users_profile.cover_photo,
						
							posts.id AS post_id,
							posts.author_id,
							posts.format_type,
							posts.title,
							posts.meta_title,
							posts.slug,
							posts.image,
							posts.meta_description,
							posts.excerpt,
							posts.content,
							posts.likes_users_id,
							posts.likes,
							posts.created_at,
							posts.updated_on,
						
							post_tags.tags
					
					FROM
						users
					JOIN users_profile
						ON users_profile.user_id = users.id
					JOIN posts 
						ON posts.author_id = users.id
					JOIN LATERAL(
						SELECT ARRAY (
							-- SELECT array_agg(post_tags.name) AS tags
							SELECT post_tags.name AS tags
							FROM post_tags
							-- JOIN posts
							-- ON post_tags.post_id = posts.id
							WHERE post_tags.post_id = posts.id
						) AS tags
					) post_tags ON TRUE
					ORDER BY posts.created_at DESC
				`
				)
				.then((response) => response.rows);

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
