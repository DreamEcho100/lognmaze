import type { GetServerSideProps } from 'next';

import { websiteBasePath } from '@utils/core/app';
import { prisma } from '@server/db/client';
import { CreativeWorkStatus } from '@prisma/client';
import toolsData from '@utils/core/appData/tools';

//pages/sitemap.xml.js

function generateSiteMap({
	users,
	blogPosts,
	staticPaths
}: {
	users: { name: string }[];
	blogPosts: {
		slug: string;
		CreativeWork: {
			createdAt: Date;
			Author: {
				name: string;
			};
		};
		updatedAt: Date | null;
	}[];
	staticPaths: string[];
}) {
	return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${websiteBasePath}</loc>
     </url>
     ${staticPaths
				.map((item) => {
					return `
       <url>
           <loc>${`${websiteBasePath}/${item}`}</loc>
       </url>
     `;
				})
				.join('')}
				${users
					.map(({ name }) => {
						return `
					<url>
							<loc>${`${websiteBasePath}/users/${name}`}</loc>
							<changefreq>weekly</changefreq>
					</url>
				`;
					})
					.join('')}
					${blogPosts
						.map(({ slug, updatedAt, CreativeWork }) => {
							return `
						<url>
								<loc>${`${websiteBasePath}/users/${CreativeWork.Author.name}/creative-works/blog-posts/${slug}`}</loc>
								<lastmod>${(updatedAt || CreativeWork.createdAt).toISOString()}</lastmod>
								<changefreq>monthly</changefreq>
						</url>
					`;
						})
						.join('')}
   </urlset>
 `;
}

function SiteMap() {
	// getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
	// We make an API call to gather the URLs for our site
	const blogPosts = await prisma.blogPost.findMany({
		select: {
			slug: true,
			updatedAt: true,
			CreativeWork: {
				select: { createdAt: true, Author: { select: { name: true } } }
			}
		},
		where: {
			CreativeWork: {
				status: CreativeWorkStatus.PUBLIC
				// AND: { Author: { name: { not: null } } }
			}
		}
	});
	const users = await prisma.user.findMany({
		select: { name: true },
		where: { role: { not: null } }
	});

	const toolsRelativePaths = toolsData.pages
		.map((page) => [
			`${toolsData.relativePath}/${page.relativePath}`,
			page.pages.map(
				(subPage) =>
					`${toolsData.relativePath}/${page.relativePath}/${subPage.relativePath}`
			)
		])
		.flat(2);

	const staticPaths = ['auth', ...toolsRelativePaths];

	// We generate the XML sitemap with the products data
	const sitemap = generateSiteMap({ blogPosts, users, staticPaths });

	res.setHeader('Content-Type', 'text/xml');
	// we send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
		props: {}
	};
};

export default SiteMap;
