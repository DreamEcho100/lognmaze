import { NextApiRequest, NextApiResponse } from 'next';

import {
	INewsItemTypeBlog,
	INewsItemTypeBlogContent,
	INewsItemTypePost,
	NextApiRequestExtended,
} from '@coreLib/ts/global';
import pgActions from '@coreLib/db/pg/actions';
import { itemsInObject } from '@commonLibIndependent/object';
import pool from '@coreLib/db/pg/connection';
import newsItemController from './[news_id]';

interface INewsDataBlog {
	type: INewsItemTypeBlog['type'];
	title: INewsItemTypeBlog['type_data']['title'];
	slug: INewsItemTypeBlog['type_data']['slug'];
	iso_language: INewsItemTypeBlog['type_data']['iso_language'];
	iso_country: INewsItemTypeBlog['type_data']['iso_country'];
	image_alt: INewsItemTypeBlog['type_data']['image_alt'];
	image_src: INewsItemTypeBlog['type_data']['image_src'];
	description: INewsItemTypeBlog['type_data']['description'];
	content: INewsItemTypeBlogContent;
	tags: INewsItemTypeBlog['type_data']['tags'];
}

interface INewsDataPost {
	type: INewsItemTypePost['type'];
	content: INewsItemTypePost['type_data']['content'];
}

// @desc    Get News
// @route   GET /api/news
// @access  Public
export const getNewsController = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const { existingItems } = itemsInObject(req.query, [
		'filterByBlogTagsAnd',
		'filterByBlogTagsOr',
		'newsByUserId',
		'newsCreatedBefore',
		'isNewsVotedByUser',
		'with_news_blog_content',
	]);

	if (typeof existingItems.filterByBlogTagsAnd === 'string')
		existingItems.filterByBlogTagsAnd = JSON.parse(
			existingItems.filterByBlogTagsAnd
		);
	if (typeof existingItems.filterByBlogTagsOr === 'string')
		existingItems.filterByBlogTagsOr = JSON.parse(
			existingItems.filterByBlogTagsOr
		);

	const news = await pgActions.news.get({
		...existingItems,
	});

	res.json(news);
};

// @desc    Create news
// @route   Post /api/news
// @access  Private
export const createNewsItemController = async (
	req: NextApiRequestExtended,
	res: NextApiResponse
) => {
	let news_id_to_delete;

	try {
		let news_data: INewsDataBlog | INewsDataPost;

		if (req.body.newsItemBasicData.type === 'blog') {
			if (
				!req.body.newsItemBasicData ||
				!req.body.newsItemBasicData.basics ||
				!req.body.newsItemBasicData.basics.title ||
				!req.body.newsItemBasicData.basics.slug ||
				!req.body.newsItemBasicData.basics.iso_language ||
				!req.body.newsItemBasicData.basics.iso_country ||
				!req.body.newsItemBasicData.basics.image_alt ||
				!req.body.newsItemBasicData.basics.image_src ||
				!req.body.newsItemBasicData.basics.description ||
				!req.body.newsItemBasicData.basics.content ||
				!req.body.newsItemBasicData.basics.tags
			) {
				res.status(400);
				throw new Error("Items doesn't exist");
			}

			const { existingItems /*, atLeastOneItemExist*/ } = itemsInObject(
				req.body.newsItemBasicData.basics,
				[
					'title',
					'slug',
					'iso_language',
					'iso_country',
					'image_alt',
					'image_src',
					'description',
					'content',
					'tags',
				]
			);

			news_data = existingItems;
			news_data.type = req.body.newsItemBasicData.type;
			// if (atLeastOneItemExist) news_data = existingItems;
			// else {
			// 	res.status(400);
			// 	throw new Error("Items doesn't exist");
			// }
		} else if (req.body.newsItemBasicData.type === 'post') {
			if (
				!req.body.newsItemBasicData ||
				!req.body.newsItemBasicData.basics ||
				!req.body.newsItemBasicData.basics.content
			) {
				res.status(400);
				throw new Error("Items doesn't exist");
			}

			const { existingItems /*, atLeastOneItemExist*/ } = itemsInObject(
				req.body.newsItemBasicData.basics,
				['content']
			);

			news_data = existingItems;
			news_data.type = req.body.newsItemBasicData.type;

			// if (atLeastOneItemExist) news_data = existingItems;
			// else {
			// 	res.status(400);
			// 	throw new Error("Items doesn't exist");
			// }
		} else {
			res.status(400);
			throw new Error("Items type doesn't exist");
		}

		const newPost = await pool
			.query(
				`
				INSERT INTO news
					(
						author_id,
						type
					)
				VALUES
					($1, $2)
				RETURNING news_id, author_id
			`,
				[req.user.id, news_data.type]
			)
			.then(async (response: { rows: any[] }) => {
				news_id_to_delete = response.rows[0].news_id;

				if (news_data.type === 'blog') {
					const params = [
						response.rows[0].news_id,
						news_data.title,
						news_data.slug,
						news_data.iso_language,
						news_data.iso_country,
						news_data.image_alt,
						news_data.image_src,
						news_data.description,
						news_data.content,
					];

					const tagsToInsert =
						news_data.tags?.length !== 0
							? [...new Set<string>(news_data.tags as string[])]
							: [];
					let tagsToInsertStringValue = [];

					let i;
					for (i = 0; i < tagsToInsert.length; i++) {
						params.push(tagsToInsert[i]);
						tagsToInsertStringValue.push(`$${params.length}`);
					}

					params.push(response.rows[0].author_id);

					const sqlQuery = `
					WITH insert_items_1 AS (
						INSERT INTO news_blog 
						(news_blog_id, title, slug, iso_language, iso_country, image_alt, image_src, description, content)
						VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
						RETURNING news_blog_id
					),
					upsert_items_1 AS (
						INSERT INTO tag (name) 
						VALUES (${tagsToInsertStringValue.join('),(')})
						ON CONFLICT (name) DO UPDATE 
						SET counter = tag.counter + 1
						RETURNING tag.name
					),
					insert_items_2 AS (
						INSERT INTO news_tag
						(news_id, name)
						VALUES ($1,${tagsToInsertStringValue.join('),($1,')})
						RETURNING news_tag_id
					),
					update_news_blog_counter_on_user_profile AS (
						UPDATE user_profile SET news_blog_counter = news_blog_counter + 1
						WHERE user_profile_id = ($${params.length})
						RETURNING user_profile_id
					)

					SELECT news_blog_id, name, news_tag_id user_profile_id
					FROM insert_items_1, upsert_items_1, insert_items_2, update_news_blog_counter_on_user_profile
				`;

					const response2 = await pool.query(sqlQuery, params);
				} else if (news_data.type === 'post') {
					const response2 = await pool.query(
						`
					WITH insert_item_1 AS (
						INSERT INTO news_post
							(
								news_post_id,
								content
							)
						VALUES ($1, $2)
						RETURNING news_post_id
					),
					update_news_post_counter_on_user_profile AS (
						UPDATE user_profile SET news_post_counter = news_post_counter + 1
						WHERE user_profile_id = ($3)
						RETURNING user_profile_id
					)

					SELECT * FROM insert_item_1, update_news_post_counter_on_user_profile;
					`,
						[response.rows[0].news_id, news_data.content, req.user.id]
					);
				}

				news_id_to_delete = '';

				return response.rows[0];
			});

		return res.status(200).json(newPost);
	} catch (error) {
		if (news_id_to_delete) {
			const result = await pool
				.query('DELETE FROM news WHERE news_id = ($1) RETURNING type', [
					news_id_to_delete,
				])
				.then((response: { rows: any[] }) => response.rows[0]);
		}
		throw new Error(
			error instanceof Error ? error.message : 'Something went wrong!'
		);
	}
};

const newsController = {
	get: getNewsController,
	item: {
		create: createNewsItemController,
		...newsItemController,
	},
};

export default newsController;
