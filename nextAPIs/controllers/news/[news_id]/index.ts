import { itemsInObject } from '@commonLibIndependent/object';
import pool from '@coreLib/db/pg/connection';
import {
	IUpdateNewsItemReqArgs,
	IUpdateNewsItemReqArgsPropsBodyContentTypeBlog,
	IUpdateNewsItemReqArgsPropsBodyContentTypePost,
} from '@coreLib/networkReqArgs/_app/news/[news_id]/ts';
import {
	INewsItemTypeBlog,
	INewsItemTypeBlogContent,
	INewsItemTypePost,
	NextApiRequestExtended,
} from '@coreLib/ts/global';
import { NextApiResponse } from 'next';
import newsItemTypeBlogController from './blog';
import newsItemCommentsController from './comments';

interface INewsDataBlogToUpdate {
	title?: INewsItemTypeBlog['type_data']['title'];
	iso_language?: INewsItemTypeBlog['type_data']['iso_language'];
	iso_country?: INewsItemTypeBlog['type_data']['iso_country'];
	image_alt?: INewsItemTypeBlog['type_data']['image_alt'];
	image_src?: INewsItemTypeBlog['type_data']['image_src'];
	description?: INewsItemTypeBlog['type_data']['description'];
	content?: INewsItemTypeBlogContent;
	tags?: {
		added?: INewsItemTypeBlog['type_data']['tags'];
		removed?: INewsItemTypeBlog['type_data']['tags'];
	};
}

interface INewsDataPostToUpdate {
	content: INewsItemTypePost['type_data']['content'];
}

// @desc    Update news
// @route   PUT /api/news/:news_id
// @access  Private
export const updateNewsItemController = async (
	req: NextApiRequestExtended,
	res: NextApiResponse
) => {
	const bodyContent: IUpdateNewsItemReqArgs['bodyContent'] = {
		type: req.body.type,
		dataToUpdate: req.body.dataToUpdate,
	};

	let dataToUpdate: INewsDataBlogToUpdate | INewsDataPostToUpdate;

	if (bodyContent.type === 'blog') {
		const test = itemsInObject<
			IUpdateNewsItemReqArgsPropsBodyContentTypeBlog['dataToUpdate']
		>(bodyContent.dataToUpdate, [
			'title',
			'iso_language',
			'iso_country',
			'image_alt',
			'image_src',
			'description',
			'content',
			'tags',
		]);

		if (test.atLeastOneItemExist) bodyContent.dataToUpdate = test.existingItems;
		else {
			res.status(400);
			throw new Error("Items doesn't exist");
		}
	} else if (bodyContent.type === 'post') {
		const test = itemsInObject<
			IUpdateNewsItemReqArgsPropsBodyContentTypePost['dataToUpdate']
		>(bodyContent.dataToUpdate, ['content']);

		if (test.atLeastOneItemExist) bodyContent.dataToUpdate = test.existingItems;
		else {
			res.status(400);
			throw new Error("Items doesn't exist");
		}
	} else {
		res.status(400);
		throw new Error('No data provided to Update!');
	}

	const cte = [
		`
		update_item_1 AS (
			UPDATE news SET updated_at = ($3)
			WHERE news_id = ($1) AND author_id = ($2)
			RETURNING news_id
		)
	`,
	];
	const cteNames = ['update_item_1'];
	const params = [req.query.news_id, req.user.id, new Date().toISOString()];

	if (bodyContent.type === 'blog') {
		const newsDataToUpdate = [];
		let item: keyof typeof bodyContent.dataToUpdate;
		let tags;
		for (item in bodyContent.dataToUpdate) {
			if (item === 'tags') {
				// 'tags' in bodyContent.dataToUpdate
				tags = bodyContent.dataToUpdate.tags;
				continue;
			}
			params.push(bodyContent.dataToUpdate[item]);
			newsDataToUpdate.push(`${item}=($${params.length})`);
		}

		if (newsDataToUpdate.length !== 0) {
			cte.push(`
				update_item_2 AS (
					UPDATE news_blog SET ${newsDataToUpdate.join(',')}
					WHERE news_blog_id = ($1)
					RETURNING  news_blog_id
				)
			`);
			cteNames.push('update_item_2');
		}

		// const { tags } = req.body;

		if (tags) {
			const tagsAdded =
				tags?.added?.length !== 0 ? [...new Set(tags.added)] : [];
			const tagsRemoved =
				tags?.removed?.length !== 0 ? [...new Set(tags.removed)] : [];
			let startIndex = 0;

			const tagsToUpdateTo: string[] = [];
			const tagsToUpdateFrom: string[] = [];

			const tagsToRemove: string[] = [];
			let tagsToInsert: string[] = [];

			if (tagsAdded.length !== 0 || tagsRemoved.length !== 0) {
				tagsRemoved.forEach((tag, index) => {
					if (index < tagsAdded.length) {
						tagsToUpdateTo.push(tagsAdded[index]);
						tagsToUpdateFrom.push(tag);

						startIndex = index + 1;
					} else {
						tagsToRemove.push(tag);
					}
				});

				let tagsToUpdateTotLocation: string[] = [];
				let tagsToUpdateFromLocation: string[] = [];
				if (tagsToUpdateTo.length !== 0 && tagsToUpdateFrom.length !== 0) {
					tagsToUpdateTo.forEach((tag, index) => {
						params.push(tag);
						params.push(tagsToUpdateFrom[index]);

						tagsToUpdateTotLocation.push(`$${params.length - 1}`);
						tagsToUpdateFromLocation.push(`$${params.length}`);

						cte.push(`
				update_news_tag_${index} AS (
					UPDATE news_tag SET name=($${params.length - 1})
					WHERE news_id = ($1) AND name = ($${params.length})
					RETURNING news_tag_id
				)
			`);
						cteNames.push(`update_news_tag_${index}`);
					});
				}

				let tagsToRemoveLocation: string[] = [];
				if (tagsToRemove.length !== 0) {
					tagsToRemove.forEach((tag, index) => {
						params.push(tag);

						tagsToRemoveLocation.push(`$${params.length}`);
					});

					cte.push(`
					delete_item_1 AS (
						DELETE FROM news_tag
						WHERE news_id = ($1) AND name IN (${tagsToRemoveLocation.join(',')})
						RETURNING news_tag_id
					)
				`);
					cteNames.push('delete_item_1');
				}

				let tagsToInsertLocation: string[] = [];
				if (startIndex < tagsAdded.length) {
					tagsToInsert = tagsAdded.slice(startIndex);

					tagsToInsert.forEach((tag, index) => {
						params.push(tag);

						tagsToInsertLocation.push(`$${params.length}`);
					});

					if (tagsToInsertLocation.length !== 0) {
						cte.push(`
					insert_news_tag AS (
						INSERT INTO news_tag (news_id, name)
						VALUES ($1,${tagsToInsertLocation.join('),($1,')})
						RETURNING news_tag_id
					)
				`);
						cteNames.push('insert_news_tag');
					}
				}

				if (
					tagsToInsertLocation.length !== 0 ||
					tagsToUpdateTotLocation.length !== 0
				) {
					cte.push(`
					upsert_tag AS (
						INSERT INTO tag (name) 
						VALUES (${[...tagsToInsertLocation, ...tagsToUpdateTotLocation].join('),(')})
						ON CONFLICT (name) DO UPDATE 
						SET counter = tag.counter + 1
						RETURNING tag.name
					)
			`);
					cteNames.push('upsert_tag');
				}

				if (
					tagsToRemoveLocation.length !== 0 ||
					tagsToUpdateFromLocation.length !== 0
				) {
					cte.push(`
					update_tag AS (
						UPDATE tag
						SET counter = tag.counter - 1
						WHERE name IN (${[...tagsToRemoveLocation, ...tagsToUpdateFromLocation].join(
							','
						)})
						RETURNING tag.name
					)
			`);
					cteNames.push('update_tag');
				}
			}
		}
	} else if (bodyContent.type === 'post') {
		const newsDataToUpdate = [];
		let item: keyof typeof bodyContent.dataToUpdate;
		for (item in bodyContent.dataToUpdate) {
			params.push(bodyContent.dataToUpdate[item]);
			newsDataToUpdate.push(`${item}=($${params.length})`);
		}

		if (newsDataToUpdate.length !== 0) {
			cte.push(`
			update_news_post AS (
				UPDATE news_post SET ${newsDataToUpdate.join(',')}
				WHERE news_post_id = ($1)
				RETURNING  news_post_id
			)
		`);
			cteNames.push('update_news_post');
		}
	}

	const result = await pool
		.query(
			`
				WITH ${cte.join(',')}
				SELECT * FROM ${cteNames.join(',')}
			`,
			params
		)
		.then((response: { rows: any[] }) => response.rows);

	return res.status(200).json({
		news_id: req.query.news_id,
	});
};

// @desc    Delete news
// @route   DELETE /api/news/:news_id
// @access  Private
export const deleteNewsItemController = async (
	req: NextApiRequestExtended,
	res: NextApiResponse
) => {
	if (
		(req.body.type !== 'blog' || req.body.type !== 'post') &&
		req.body.type === 'blog' &&
		!req.body.tags
	) {
		if (!req.body.tags) {
			res.status(400);
			throw new Error('Required data not provided!');
		}
	}

	const result = await pool
		.query(
			'DELETE FROM news WHERE news_id = ($1) AND author_id = ($2) RETURNING type',
			[req.query.news_id, req.user.id]
		)
		.then((response: { rows: any[] }) => response.rows[0]);

	if (req.body.type === 'blog') {
		const result2 = await pool
			.query(
				`
				WITH update_user_profile AS (
					UPDATE user_profile SET news_${req.body.type}_counter = news_${req.body.type}_counter - 1
					WHERE user_profile_id = ($1)
					RETURNING user_profile_id
				),
				update_tag AS (
					UPDATE tag
					SET counter = tag.counter - 1
					WHERE name = ANY($2)
					RETURNING tag.name
				)

				SELECT * FROM update_user_profile, update_tag;
			`,
				[req.user.id, req.body.tags]
			)
			.then((response: { rows: any[] }) => response.rows[0]);
	} else {
		const result2 = await pool
			.query(
				`
				UPDATE user_profile SET news_${req.body.type}_counter = news_${req.body.type}_counter - 1
				WHERE user_profile_id = ($1)
				RETURNING user_profile_id
			`,
				[req.user.id]
			)
			.then((response: { rows: any[] }) => response.rows[0]);
	}

	return res.status(200).end();
};

const newsItemController = {
	update: updateNewsItemController,
	delete: deleteNewsItemController,
	type: {
		blog: newsItemTypeBlogController,
	},
	...newsItemCommentsController,
};

export default newsItemController;
