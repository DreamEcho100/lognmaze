// Credit to:
// https://tuomokankaanpaa.com/blog/nextjs-seo-how-to-add-sitemap-and-robots-txt
// https://cheatcode.co/tutorials/how-to-generate-a-dynamic-sitemap-with-next-js

import { getAllArticlesSlugs, getAllUsersNameId } from '@lib/v1/pg';
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

const Sitemap = () => {};

export const getServerSideProps = async ({ res, req }) => {
	try {
		// An array with your links
		const links = [];

		await getAllArticlesSlugs().then((articles = []) => {
			articles.map((article) => {
				links.push({
					url: `/article/${article.slug}`,
					changefreq: 'daily',
					priority: 0.9,
				});
			});
		});

		await getAllUsersNameId().then((profiles = []) => {
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
			hostname: `https://${req.headers.host}`,
			//'https://lognmaze.com',
		});

		res.writeHead(200, {
			'Content-Type': 'application/xml',
		});

		const xmlString = await streamToPromise(
			Readable.from(links).pipe(stream)
		).then((data) => data.toString());

		res.write(xmlString);
		res.end();

		return {
			props: {},
		};
	} catch (error) {
		console.error(`Error, ${error.message}`);

		return {
			props: {},
		};
	}
};

export default Sitemap;
