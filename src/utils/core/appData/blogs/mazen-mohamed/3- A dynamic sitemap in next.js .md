---
title: Create a dynamic sitemap with Next.js
tags: sitemap next.js
image_alt: Create a dynamic sitemap with Next.js
thumbnailUrl: https://codebycorey.com/static/images/nextjs-sitemap/header.png
description: Generate a dynamic sitemap for your Next.js based site or app to improve the discoverability of your site for search engines like Google, Bing, and DuckDuckGo
---

If you're building a Next.js site or app that needs to be visible to search engines like google, bing, and other search engines, a sitemap is essential especially if it has many pages that you want to be indexed.

## What is a sitemap

A sitemap is a map of the URLs on your site and makes it easier for search engine crawler bots to index your content, and increase your likelihood for ranking in search results.

> browsers and search engines anticipate our sitemap being returned as an XML file

## What will we use?

In Next.js we can rely on:

- The built-in router.

- `getServerSideProps` function provided by Next.js.

- basic data fetching (for dynamic content).

- installing `sitemap` more about it [here](https://www.npmjs.com/package/sitemap) package by npm/yarn, and use it with `stream` package provided by a node to easily build the XML Content.

## Start

Let's start the Work!

in your `/pages` directory at the root folder create a file named `sitemap.xml.js` and add the following to it.

```js
const Sitemap = () => {};

export default Sitemap;
```

> Next.js will automatically create a route in our app at /sitemap.xml which is the location where browsers and search engine crawlers expect our sitemap to live.

Why is it an empty returned function you ask?

because we don't want to render a component at the URL.

Instead we will use `getServerSideProps` and build the XML content and return it as `text/xml`

let's continue.

First, in your terminal navigate to the root component of your project and type `npm I sitemap`

in the `/pages/sitemap.xml.js` do as the following:

```js
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

const Sitemap = () => {};

export const getServerSideProps = ({ res }) => {
	// An array with your links
	const links = [];

	// Add static pages
	const pages = ['/auth', '/about'];

	pages.map((url) => {
		links.push({
			url,
			lastmod: new Date().toISOString(),
			changefreq: 'monthly',
			priority: 0.9,
		});
	});

	const stream = new SitemapStream({
		hostname: `https://${req.headers.host}`,
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
```

Now, What happened?

1. Instead of returning an object of props from getServerSideProps We will override it.

2. We built the `links` array that we will push an object with `url`, `changefreq`, `priority` to it

3. Create a stream to write to and add the `hostname` to it.

4. Set the Content-Type header of the response to `text/XML.

5. Write the response body and end the request.

> if we remove the `return { props: {}, };` Next.js will throw an error at us

Congratulations now if you start your development server by typing `npm run dev` and in your browser and go to `localhost:3000/sitemap.xml` you will get the following:

```xml
<urlset
	xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'
	xmlns:news='http://www.google.com/schemas/sitemap-news/0.9'
	xmlns:xhtml='http://www.w3.org/1999/xhtml'
	xmlns:image='http://www.google.com/schemas/sitemap-image/1.1'
	xmlns:video='http://www.google.com/schemas/sitemap-video/1.1'
>
	<url>
		<loc>https://localhost:3000/auth</loc>
		<lastmod>2021-09-09T20:19:53.534Z</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.9</priority>
	</url>
	<url>
		<loc>https://localhost:3000/about</loc>
		<lastmod>2021-09-09T20:19:53.534Z</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.9</priority>
	</url>
</urlset>
```

In terms of what we're returning here we return the XML content expected by a web browser (or search engine crawler) when reading a sitemap.

- For each URL in our site that we want to add to our map, we add the `<url></url>` tag.

- Placing a `<loc></loc>` tag inside that specifies the location of our URL.

- The `<lastmod></lastmod>` tag specifies when the content at the URL was last updated.

> Time is in [ISO-8601 string](https://en.wikipedia.org/wiki/ISO_8601)
> If you have a date available for when these pages were last updated, it's best to be as accurate as possible with this date and pass that specific date here

- The `<changefreq></changefreq>` tag specifies how frequently the content at the URL is updated.

> We're setting a sensible default of monthly, but this can be any of the following:
>
> - never
> - yearly,
> - monthly
> - weekly
> - daily
> - hourly
> - always

- And a `<priority></priority>` tag to specify the importance of the URL (which translates to how frequently a crawler should crawl that page).

> we set a base of **1.0** (the maximum level of importance). If you wish to change this to be more specific, this number can be anything between **0.0** and **1.0** with **0.0** being unimportant, **1.0** being most important.

## Adding paths dynamically to the sitemap

Let's say we have a dynamic path like `profile/[user_name_id]` or `article/[slug]` how can we add them to the sitemap without adding them manually every single time.

> **_Super easy barely an unconvinced_**

I have built a function to return the `user_name_id` and another one to return the `slug` needed from the database and put it in the `/lib` directory in the root project.

> Create the functions and put them were ever you like and use the path to it to export the functions

example for the `user_name_id` function:

```js
// I am using pg package to connect to the my postgresql database
const { Pool } = require('pg');

export const connectionString = process.env.PG_CONNECTION_STRING;

export const pool = new Pool({
	connectionString
});
// I will return the data using the new Promise so I can easily access it through then

export const getAllUsersNameId = () => {
	return new Promise(async (resolve, reject) => {
		try {
			await pool
				.query('SELECT user_name_id FROM user_profile')
				.then(async (response) => response.rows)
				.then((data) => resolve(data));
		} catch (error) {
			console.error(`Error, ${error.message}`);
			resolve([]);
		}
	});
};

export const getAllArticlesSlugs = () => {
	return new Promise(async (resolve, reject) => {
		try {
			await pool
				.query('SELECT slug FROM news_article')
				.then(async (response) => response.rows)
				.then((data) => resolve(data));
		} catch (error) {
			console.error(`Error, ${error.message}`);
			resolve([]);
		}
	});
};
```

and now in `page/sitemap.xml.js` we will import them:

```js
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

import { getAllArticlesSlugs, getAllUsersNameId } from '../lib/pg';

const Sitemap = () => {};

// Don't forget to add async when using await
export const getServerSideProps = async ({ res }) => {
	const links = [];

	await getAllArticlesSlugs().then((articles = []) => {
		articles.map((article) => {
			links.push({
				url: `/article/${article.slug}`,
				lastmod: new Date().toISOString(),
				changefreq: 'weekly',
				priority: 0.9
			});
		});
	});

	await getAllUsersNameId().then((profiles = []) => {
		profiles.map((profile) => {
			links.push({
				url: `/profile/${profile.user_name_id}`,
				lastmod: new Date().toISOString(),
				changefreq: 'weekly',
				priority: 0.9
			});
		});
	});

	const pages = ['/auth', '/about'];

	pages.map((url) => {
		links.push({
			url,
			lastmod: new Date().toISOString(),
			changefreq: 'monthly',
			priority: 0.9
		});
	});

	const stream = new SitemapStream({
		hostname: `https://${req.headers.host}`
	});

	res.writeHead(200, {
		'Content-Type': 'text/xml'
	});

	const xmlString = await streamToPromise(
		Readable.from(links).pipe(stream)
	).then((data) => data.toString());

	res.write(xmlString);
	res.end();

	return {
		props: {}
	};
};

export default Sitemap;
```

And now when we visit `localhost:3000/sitemap.xml` in the browser we get:

```xml
<urlset
	xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'
	xmlns:news='http://www.google.com/schemas/sitemap-news/0.9'
	xmlns:xhtml='http://www.w3.org/1999/xhtml'
	xmlns:image='http://www.google.com/schemas/sitemap-image/1.1'
	xmlns:video='http://www.google.com/schemas/sitemap-video/1.1'
>
	<url>
		<loc>
			https://localhost:3000/article/full-guide-to-cookies-and-javascript-clint-side
		</loc>
		<lastmod>2021-09-09T20:21:47.464Z</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.9</priority>
	</url>
	<url>
		<loc>
			https://localhost:3000/article/basic-guide-to-json-in-postgresql-jsonb
		</loc>
		<lastmod>2021-09-09T20:21:47.464Z</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.9</priority>
	</url>
	<url>
		<loc>
			https://localhost:3000/article/vocabulary-workshop-level-f-grade-11-unit-1
		</loc>
		<lastmod>2021-09-09T20:21:47.464Z</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.9</priority>
	</url>
	<url>
		<loc>https://localhost:3000/profile/mazen-mohamed</loc>
		<lastmod>2021-09-09T20:21:47.688Z</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.9</priority>
	</url>
	<url>
		<loc>https://localhost:3000/profile/mohamed-bek</loc>
		<lastmod>2021-09-09T20:21:47.688Z</lastmod>
		<changefreq>weekly</changefreq>
		<priority>0.9</priority>
	</url>
	<url>
		<loc>https://localhost:3000/about</loc>
		<lastmod>2021-09-09T20:21:47.688Z</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.9</priority>
	</url>
	<url>
		<loc>https://localhost:3000/auth</loc>
		<lastmod>2021-09-09T20:21:47.689Z</lastmod>
		<changefreq>monthly</changefreq>
		<priority>0.9</priority>
	</url>
</urlset>
```

## Resources

- [How to add sitemap and robots.txt to Next.js application (tuomokankaanpaa.com)](https://tuomokankaanpaa.com/blog/nextjs-seo-how-to-add-sitemap-and-robots-txt)

- [How to Generate a Dynamic Sitemap with Next.js (cheatcode.co)](https://cheatcode.co/tutorials/how-to-generate-a-dynamic-sitemap-with-next-js)

- [sitemap package (npmjs.com)](https://www.npmjs.com/package/sitemap)

- [ISO-8601 string (wikipedia.org)](https://en.wikipedia.org/wiki/ISO_8601)
