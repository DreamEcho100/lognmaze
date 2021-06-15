import { handleIsAuthorized } from '@/lib/v1/auth';
import { pool } from '@/lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'PATCH') {
		return;
	}

	if (req.method === 'PATCH') {
		try {
			console.log(req.body);
			const isAuthorized = await handleIsAuthorized(
				res,
				req.headers.authorization
			);

			if (!isAuthorized.id) return;

			const {
				id,
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
          UPDATE posts SET
            format_type=$1, title=$2, meta_title=$3, slug=$4, image=$5, tags=$6, meta_description=$7, excerpt=$8, content=$9, updated_on=NOW()
          WHERE id=$10
          RETURNING *
        `,
				[
					formatType,
					title,
					metaTitle,
					slug,
					image,
					tags,
					metaDescription,
					excerpt,
					content,
					id,
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
