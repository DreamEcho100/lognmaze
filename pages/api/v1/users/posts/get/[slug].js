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
						posts.id,
						posts.author_id,
						posts.author_user_name_id,
						posts.format_type,
						posts.title,
						posts.meta_title,
						posts.slug,
						posts.image,
						posts.tags,
						posts.meta_description,
						posts.excerpt,
						posts.content,
						posts.like_user_id,
						posts.likes,
						posts.created_at,
						posts.updated_on,
						users.user_name_id,
						users.first_name,
						users.last_name,
						users.profile_picture
					FROM
						posts
					JOIN users 
						ON posts.author_id = users.id
					WHERE posts.slug = $1;
				`,
					[slug]
				)
				.then((response) => response.rows[0]);

			if (!result.id) {
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
						id: result.id,
						author_id: result.author_id,
						author_user_name_id: result.author_user_name_id,
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
