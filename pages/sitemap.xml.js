// Credit to:
// https://tuomokankaanpaa.com/blogs/nextjs-seo-how-to-add-sitemap-and-robots-txt
// https://cheatcode.co/tutorials/how-to-generate-a-dynamic-sitemap-with-next-js

import { pool } from '@lib/v1/pg';
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

	const linksPush = ({ url, lastmod, changefreq, priority }) => {
		links.push({
			url,
			lastmod,
			changefreq,
			priority,
		});
	};

	try {
		await pool
			.query(
				`
					SELECT
						news_blog.slug,
						news.updated_at
					FROM news_blog
					JOIN news ON news.news_id = news_blog.news_blog_id
				`
			)
			.then((response) => {
				response.rows.forEach((blog) => {
					linksPush({
						url: `/blogs/${blog.slug}`,
						lastmod: blog.updated_at
							? new Date(blog.updated_at).toISOString()
							: new Date().toISOString(),
						changefreq: 'weekly',
						priority: 0.9,
					});
				});
			});
	} catch (error) {
		console.error(`Error, ${error.message}`);
	}

	try {
		await pool
			.query('SELECT user_name_id FROM user_profile')
			.then((response) => {
				response.rows.forEach((profile) => {
					linksPush({
						url: `/users/${profile.user_name_id}`,
						lastmod: new Date().toISOString(),
						changefreq: 'weekly',
						priority: 0.9,
					});
				});
			});
	} catch (error) {
		console.error(`Error, ${error.message}`);
	}

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

	res.setHeader(
		'Cache-Control',
		'public, s-maxage=86400, stale-while-revalidate=60'
	);

	res.write(xmlString);
	res.end();

	return {
		props: {},
	};
};

export default Sitemap;
