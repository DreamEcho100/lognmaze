// Credit to:
// https://tuomokankaanpaa.com/blog/nextjs-seo-how-to-add-sitemap-and-robots-txt
// https://cheatcode.co/tutorials/how-to-generate-a-dynamic-sitemap-with-next-js

import { getAllArticlesSlugs, getAllUsersNameId } from '@lib/v1/pg';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const Sitemap = () => {};

export const getServerSideProps = async ({ res, req }) => {
	// An array with your links
	const links = [
		{
			url: '/auth',
			lastmod: new Date().toISOString(),
			changefreq: 'monthly',
			priority: 1,
		},
	];

	await getAllArticlesSlugs().then((articles = []) => {
		articles.map((article) => {
			links.push({
				url: `/article/${article.slug}`,
				lastmod: new Date().toISOString(),
				changefreq: 'weekly',
				priority: 0.9,
			});
		});
	});

	await getAllUsersNameId().then((profiles = []) => {
		profiles.map((profile) => {
			links.push({
				url: `/profile/${profile.user_name_id}`,
				lastmod: new Date().toISOString(),
				changefreq: 'weekly',
				priority: 0.9,
			});
		});
	});

	// Add static pages
	// const pages = ['/auth'];

	// pages.map((url) => {
	// 	links.push({
	// 		url,
	// 		lastmod: new Date().toISOString(),
	// 		changefreq: 'daily',
	// 		priority: 0.9,
	// 	});
	// });

	// Create a stream to write to
	const stream = new SitemapStream({
		hostname: `https://${req.headers.host}`,
		//'https://lognmaze.com',
	});

	res.writeHead(200, {
		'Content-Type': 'text/xml',
	});

	const xmlString = await streamToPromise(
		Readable.from(links).pipe(stream)
	).then((data) => data.toString());

	res.write(xmlString);
	res.end();

	return {
		props: {},
	};
};

export default Sitemap;
