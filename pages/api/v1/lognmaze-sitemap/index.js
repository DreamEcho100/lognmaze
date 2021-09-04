// Credit to https://tuomokankaanpaa.com/blog/nextjs-seo-how-to-add-sitemap-and-robots-txt

const path = require('path');
const fs = require('fs');

import { getAllArticlesSlugs, getAllUsersNameId } from '@lib/v1/pg';
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

export default async (req, res) => {
	try {
		if (req.method !== 'POST') return res.status(404).end();

		if (
			req.headers['lognmaze-sitemap-token'] !==
			process.env.LOGNMAZE_SITEMAP_TOKEN
		) {
			return res.status(400).json({
				status: 'error',
				message: 'Wrong token!',
			});
		}
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
			hostname:
				process.env.FRONT_END_DOMAIN ||
				`https://${'lognmaze' || req.headers.host}`,
		});

		res.writeHead(200, {
			'Content-Type': 'application/xml',
		});

		const xmlString = await streamToPromise(
			Readable.from(links).pipe(stream)
		).then((data) => data.toString());

		fs.writeFile(
			path.join(process.cwd(), 'public', 'sitemap.xml'),
			xmlString,
			function (err) {
				if (err) throw err;
				console.log('Replaced!');
			}
		);

		return res.end(xmlString);
	} catch (error) {
		console.error(`Error, ${error.message}`);
		res.status(500).json({
			status: 'error',
			message: error.message,
		});
	}
};
