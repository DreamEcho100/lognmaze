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
				removedTags,
				addedTags,
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
				.then(async (response) => {
					const sqlQuery = `WITH${addedTags
						.map(
							(tag, index) => ` add_post_tag_${index} AS (
								INSERT INTO post_tags (post_id, name) VALUES ('${response.rows[0].id}', '${tag}') RETURNING *
						)`
						)
						.join(',')} 
						${removedTags.length !== 0 && addedTags.length !== 0 ? ', ' : ''}${removedTags
						.map(
							(tag, index) => ` remove_post_tag_${index} AS (
								DELETE FROM post_tags WHERE post_id = '${response.rows[0].id}' AND name='${tag}' RETURNING ''
						)`
						)
						.join(',')}
						SELECT * FROM${addedTags
							.map((tag, index) => ` add_post_tag_${index}`)
							.join(',')}${
						removedTags.length !== 0 && addedTags.length !== 0 ? ', ' : ''
					}${removedTags
						.map((tag, index) => ` remove_post_tag_${index}`)
						.join(',')}`;

					const response2 = await pool.query(sqlQuery);

					response.rows[0];
				});

			return res.status(200).json({
				status: 'success',
				message: 'Posted Successefully!',
				data: {
					...result,
					// tags,
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
