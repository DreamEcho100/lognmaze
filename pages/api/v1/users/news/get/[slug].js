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
						users.user_name_id,

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

						FROM 	users
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
						WHERE posts.slug = $1
					`,
					[slug]
				)
				.then((response) => response.rows[0]);

			if (!result.post_id) {
				res.status(404).json({
					status: 'error',
					message: 'No Post Found :(',
					data: {},
				});
				return;
			}

			res.status(200).json({
				status: 'success',
				message: 'The newest Posts Arrived Successefully!, Enjoy ;)',
				data: {
					post: {
						id: result.post_id,
						author_id: result.author_id,
						author_user_name_id: result.user_name_id,
						format_type: result.format_type,
						title: result.title,
						meta_title: result.meta_title,
						slug: result.slug,
						image: result.image,
						tags: result.tags,
						meta_description: result.meta_description,
						excerpt: result.excerpt,
						content: result.content,
						like_user_id: result.like_user_id,
						likes: result.likes,
						created_at: result.created_at,
						updated_on: result.updated_on,
					},
					author: {
						user_name_id: result.user_name_id,
						first_name: result.first_name,
						last_name: result.last_name,
						profile_picture: result.profile_picture,
					},
				},
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
