import { handleIsAuthorized } from '@/lib/v1/auth';
import { pool } from '@/lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'POST') {
		return;
	}

	if (req.method === 'POST') {
		try {
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const {
				authorId,
				formatType,
				title,
				metaTitle,
				slug,
				image,
				tags,
				metaDescription,
				excerpt,
				content,
			} = req.body;

			const newPost = await pool
				.query(
					`
          INSERT INTO posts
            ( author_id, format_type, title, meta_title, slug, image, meta_description, excerpt, content)
          VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING *
        `,
					[
						authorId,
						formatType,
						title,
						metaTitle,
						slug,
						image,
						metaDescription,
						excerpt,
						content,
					]
				)
				.then(async (response) => {
					const sqlQuery = `WITH${tags
						.map(
							(tag, index) => ` add_post_tag_${index} AS (
								INSERT INTO post_tags (post_id, name) VALUES ('${response.rows[0].id}', '${tag}') RETURNING *
							)`
						)
						.join(',')} 
							SELECT * FROM${tags.map((tag, index) => ` add_post_tag_${index}`).join(',')};`;
					const response2 = await pool.query(sqlQuery);
					return response;
				});

			return res.status(200).json({
				status: 'success',
				message: 'Posted Successefully!',
				data: {},
				isAuthorized: true,
			});
		} catch (error) {
			console.error(`Error, ${error}`);
			return res.status(500).json({
				status: 'error',
				message: error.message || 'Something went wrong!',
				data: {},
				isAuthorized: false,
			});
		}
	}
};
