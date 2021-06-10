import { pool } from '../../../../../lib/v1/pg';

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
						posts.id,
						posts.author_id,
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
					ORDER BY posts.created_at DESC;
				`
				)
				.then((response) => response.rows);

			console.log(result);

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
			});
		}
	}
};
