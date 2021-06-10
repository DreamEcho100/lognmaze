import { handleIsAuthorized } from '@/lib/v1/auth';
import { pool } from '@/lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'POST') {
		return;
	}

	if (req.method === 'POST') {
		try {
			console.log(req.body);
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const {
				authorId,
				authorUserNameId,
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

			const newPost = await pool.query(
				`
          INSERT INTO posts
            ( author_id, author_user_name_id, format_type, title, meta_title, slug, image, tags, meta_description, excerpt, content)
          VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          RETURNING *
        `,
				[
					authorId,
					authorUserNameId,
					formatType,
					title,
					metaTitle,
					slug,
					image,
					tags,
					metaDescription,
					excerpt,
					content,
				]
			);

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
