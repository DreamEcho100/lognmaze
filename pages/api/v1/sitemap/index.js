// Credit to https://tuomokankaanpaa.com/blog/nextjs-seo-how-to-add-sitemap-and-robots-txt

const path = require('path');
const fs = require('fs');

import { getAllArticlesSlugs, getAllUsersNameId } from '@lib/v1/pg';
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

export default async (req, res) => {
	try {
		// An array with your links
		const links = [];

		await getAllArticlesSlugs().then((articles) => {
			articles.map((article) => {
				links.push({
					url: `/article/${article.slug}`,
					changefreq: 'daily',
					priority: 0.9,
				});
			});
		});

		await getAllUsersNameId().then((profiles) => {
			profiles.map((profile) => {
				links.push({
					url: `/profile/${profile.user_name_id}`,
					changefreq: 'daily',
					priority: 0.9,
				});
			});
		});

		// Add other pages
		const pages = ['/', '/auth'];
		pages.map((url) => {
			links.push({
				url,
				changefreq: 'daily',
				priority: 0.9,
			});
		});

		// Create a stream to write to
		const stream = new SitemapStream({
			hostname: 'https://lognmaze.com',
			// process.env.FRONT_END_DOMAIN ||
			// `https://${'lognmaze' || req.headers.host}`,
		});

		res.writeHead(200, {
			'Content-Type': 'application/xml',
		});

		const xmlString = await streamToPromise(
			Readable.from(links).pipe(stream)
		).then((data) => data.toString());

		if (process.env.NODE_ENV !== 'production') {
			fs.writeFile(
				path.join(process.cwd(), 'public', 'sitemap.xml'),
				xmlString,
				function (err) {
					if (err) throw err;
					console.log('Replaced!');
				}
			);
		} else {
			console.log('process.cwd()', process.cwd());
			console.log('__dirname', __dirname);
		}

		return res.end(xmlString);
	} catch (error) {
		console.error(`Error, ${error.message}`);
		res.status(500).json({
			status: 'error',
			message: error.message,
		});
	}
};
