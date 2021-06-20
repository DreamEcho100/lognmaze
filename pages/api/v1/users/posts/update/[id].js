import { handleIsAuthorized } from '@/lib/v1/auth';
import { pool } from '@/lib/v1/pg';

export default async (req, res) => {
	if (req.method !== 'PATCH') {
		return;
	}

	if (req.method === 'PATCH') {
		try {
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
				metaDescription,
				excerpt,
				content,
				tags,
				removedTags,
				tagsUpdated,
			} = req.body;

			const result = await pool
				.query(
					`
						UPDATE posts SET
							format_type=$1, title=$2, meta_title=$3, slug=$4, image=$5, meta_description=$6, excerpt=$7, content=$8, updated_on=$9
						WHERE id=$10 AND author_id=$11
						RETURNING *
        	`,
					[
						formatType,
						title,
						metaTitle && metaTitle.length > 10 ? metaTitle : null,
						slug,
						image,
						metaDescription,
						excerpt && excerpt.length > 10 ? excerpt : null,
						content,
						new Date().toLocaleString(),
						id,
						isAuthorized.id,
					]
				)
				.then((response) => response.rows[0]);

			console.log('result', result);

			return res.status(200).json({
				status: 'success',
				message: 'Posted Successefully!',
				data: {
					...result,
					tags,
				},
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
