import { pool } from '@/lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'GET') {
		return;
	}

	if (req.method === 'GET') {
		try {
			const { user_name_id } = req.query;

			const results = await pool
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
					WHERE posts.author_user_name_id = $1;
				`,
					[user_name_id]
				)
				.then((response) => response.rows);

			if (!results || results.length === 0) {
				res.status(404).json({
					status: 'error',
					message: 'No Posts Found :(',
					data: {},
				});
				return;
			}

			res.status(200).json({
				status: 'success',
				message: 'The Posts Arrived Successefully!, Enjoy ;)',
				data: results,
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
