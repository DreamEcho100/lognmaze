// Credit to https://tuomokankaanpaa.com/blog/nextjs-seo-how-to-add-sitemap-and-robots-txt

import { getAllArticlesSlugs, getAllUsersNameId } from '@lib/v1/pg';
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

export default async (req, res) => {
	try {
		// An array with your links
		const links = [];

		await getAllArticlesSlugs().then((articles) => {
			console.log('articles', articles);
			articles.map((article) => {
				links.push({
					url: `/article/${article.slug}`,
					changefreq: 'daily',
					priority: 0.9,
				});
			});
		});

		await getAllUsersNameId().then((profiles) => {
			console.log('profiles', profiles);
			profiles.map((profile) => {
				links.push({
					url: `/profile/${profile.user_name_id}`,
					changefreq: 'daily',
					priority: 0.9,
				});
			});
		});

		// Add other pages
		const pages = ['/auth', '/post', '/'];
		pages.map((url) => {
			links.push({
				url,
				changefreq: 'daily',
				priority: 0.9,
			});
		});

		// Create a stream to write to
		const stream = new SitemapStream({
			hostname: `https://${req.headers.host}`,
		});

		res.writeHead(200, {
			'Content-Type': 'application/xml',
		});

		const xmlString = await streamToPromise(
			Readable.from(links).pipe(stream)
		).then((data) => data.toString());

		res.end(xmlString);
	} catch (e) {
		console.log(e);
		res.send(JSON.stringify(e));
	}
};
