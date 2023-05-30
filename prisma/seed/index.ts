import {
	LanguageTagType,
	UserGender,
	CreativeWorkType,
	CreativeWorkStatus
} from '@prisma/client';
import { PrismaClient } from '@prisma/client';

import fs from 'fs';

import path from 'path';

import grayMatter from 'gray-matter';

import { z } from 'zod';

import { default as slugify } from 'slug';

import IETF_BCP_47_STANDARD from '../../src/utils/core/appData/IETF_BCP_47_STANDARD';

export const prisma = new PrismaClient({
	log: ['query', 'error', 'warn']
});

const seedingTheLanguagesTagsTable = async () => {
	await prisma.languageTag.deleteMany();

	const data = await prisma.languageTag.createMany({
		data: IETF_BCP_47_STANDARD.body.map((item) => ({
			...item,
			type: LanguageTagType.IETF_BCP_47_STANDARD // IETF_BCP_47_STANDARD.header.type
		}))
	});

	console.log(
		"%cDone the 'languages tags' table",
		'font-size: 42px; font-weight: bold; color: green;'
	);
	console.log('data', JSON.stringify(data, null, 2));
};

const seedingTheGendersTagsTable = async () => {
	const data = await prisma.gender.createMany({
		data: [{ name: UserGender.M }, { name: UserGender.F }]
	});

	console.log(
		"%cDone the 'genders' table",
		'font-size: 42px; font-weight: bold; color: green;'
	);
	console.log('data', JSON.stringify(data, null, 2));
};

const seedingTheBlogPostsTable = async () => {
	const directory = path.join(
		process.cwd(),
		'src/utils/core/appData/blogs/mazen-mohamed'
	);
	const tagsPages: string[][] = [];
	const creativeWorksTypeBlogPostData: NonNullable<
		Parameters<typeof prisma.creativeWork.create>['0']
	>[] = [];
	const authorId = await prisma.user
		.findFirstOrThrow({ where: { email: 'maze6572198@gmail.com' } })
		.then((result) => result.id);
	if (typeof authorId !== 'string') throw new Error('Invalid author id');

	const languageTagId = await prisma.languageTag
		.findFirstOrThrow({
			where: { code: 'en', countryCode: 'us' }
		})
		.then((result) => result.id);

	console.log('authorId', authorId);
	console.log('languageTagId', languageTagId);

	throw new Error('Remember to update the blog post tags correctly!');

	/*
	try {
		const files = await fs
			.readdirSync(directory)
			.sort((a, b) => (parseInt(a) > parseInt(b) ? 1 : -1));

		console.log('files', files);

		console.log('Deleting creative works');
		await prisma.creativeWork
			.deleteMany({
				// where: { type: CreativeWorkType.BLOG_POST }
			})
			.then(console.log);
		await prisma.tag.deleteMany().then(console.log);
		await prisma.tagStats.deleteMany().then(console.log);

		for (const file of files) {
			const filePath = path.join(directory, file);
			const fileStats = await fs.statSync(filePath);

			if (fileStats.isFile() && file.endsWith('.md')) {
				console.log('file', file);
				const fileContent = await fs.readFileSync(filePath, 'utf8');
				const parsed = grayMatter(fileContent);
				const content = parsed.content.trim();

				console.log('parsed.data', parsed.data);
				const data = z
					.object({
						title: z.string().trim(),
						tags: z
							.string()
							.trim()
							.transform((item) => [...new Set(item.split(/\s+/))]),
						// image_alt: z.string().trim(),
						thumbnailUrl: z.string().trim(),
						description: z.string().trim()
					})
					.parse(parsed.data);

				tagsPages.push(data.tags);
				creativeWorksTypeBlogPostData.push({
					data: {
						authorId,
						type: CreativeWorkType.BLOG_POST,
						status: CreativeWorkStatus.PUBLIC,
						tags: {
							connectOrCreate: data.tags.map((tag) => ({
								create: {
									name: tag,
									Stats: {
										connectOrCreate: {
											create: { blogPostsCount: 0 },
											where: { tagName: tag }
										}
									}
								},
								where: { name: tag }
							}))
						},
						blogPost: {
							create: {
								content,
								description: data.description,
								slug: slugify(data.title),
								thumbnailUrl: data.thumbnailUrl,
								title: data.title,
								discussionForum: {
									create: {
										creativeWork: {
											create: {
												authorId: authorId,
												status: CreativeWorkStatus.PUBLIC,
												type: CreativeWorkType.DISCUSSION_FORUM
											}
										}
									}
								},
								languageTag: { connect: { id: languageTagId } }
							}
						}
					},
					select: { id: true, blogPost: { select: { slug: true } } }
				});

				// This is a regular .md file.
				// You can read the file using fs.readFile or any other method.
			}
		}

		console.log('Creating creative work type blog Post');
		let i = 0;
		for (; i < creativeWorksTypeBlogPostData.length; i++) {
			const element = creativeWorksTypeBlogPostData[i];
			if (!element) break;

			console.log('element', element.data.blogPost?.create?.slug);
			await prisma.creativeWork
				.create(element)
				.then(console.log)
				.catch((error) => {
					console.log('element', element.data.blogPost?.create?.slug);
					console.error(error);
					throw new Error('creative');
				});
		}

		console.log('Updating tagStats table');
		await prisma.tagStats
			.updateMany({
				data: { blogPostsCount: { increment: 1 } },
				where: { tagName: { in: tagsPages.flat(1).map((tagName) => tagName) } }
			})
			.then(console.log)
			.catch(console.error);

		console.log('Updating userStats table');
		await prisma.userStats
			.update({
				data: { blogPostsCount: 0, postsCount: 0 },
				where: { userId: authorId }
			})
			.then(console.log)
			.catch(console.error);

		console.log('Updating userStats table');
		await prisma.userStats
			.update({
				data: { blogPostsCount: creativeWorksTypeBlogPostData.length },
				where: { userId: authorId }
			})
			.then(console.log)
			.catch(console.error);
	} catch (err) {
		console.error(err);
	}
	*/

	// const data = await prisma.blogPost.createMany
};

// const updatingTagsBlogStatsCounter = async () => {
// 	const blogPostsCreativeWork = await prisma.creativeWork.findMany({
// 		select: { tags: true },
// 		where: { type: CreativeWorkType.BLOG_POST }
// 	});

// 	const tagNameToCountMap: Record<string, number> = {};

// 	blogPostsCreativeWork.forEach((blogPost) => {
// 		blogPost.tags.forEach((tag) => {
// 			tagNameToCountMap[tag.name] = (tagNameToCountMap[tag.name] || 0) + 1;
// 		});
// 	});

// 	console.log('tagNameToCountMap', tagNameToCountMap);

// 	await prisma.$transaction(
// 		Object.entries(tagNameToCountMap).map((item) =>
// 			prisma.tagStats.update({
// 				data: { blogPostsCount: item[1] },
// 				where: { tagName: item[0] }
// 			})
// 		)
// 	);
// };

// seedingTheLanguagesTagsTable();
// seedingTheGendersTagsTable();
// seedingTheBlogPostsTable();
