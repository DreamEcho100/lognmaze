import type { GetServerSideProps } from 'next';

import { websiteBasePath } from '@utils/core/app';
import toolsData from '@utils/core/appData/tools';
import { drizzleORM } from '@server/utils/drizzle';
import { isNotNull } from 'drizzle-orm';
import { CreativeWorkStatus } from '@prisma/client';
import { creativeWork } from 'drizzle/schema';

//pages/sitemap.xml.js

function generateSiteMap({
	users,
	blogPosts,
	staticPaths
}: {
	users: { name: string }[];
	blogPosts: {
		slug: string;
		creativeWork: {
			createdAt: Date;
			author: {
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
						.map(({ slug, updatedAt, creativeWork }) => {
							return `
						<url>
								<loc>${`${websiteBasePath}/users/${creativeWork.author.name}/creative-works/blog-posts/${slug}`}</loc>
								<lastmod>${(updatedAt || creativeWork.createdAt).toISOString()}</lastmod>
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
	// const blogPosts = await prisma.blogPost.findMany({
	// 	select: {
	// 		slug: true,
	// 		updatedAt: true,
	// 		creativeWork: {
	// 			select: { createdAt: true, author: { select: { name: true } } }
	// 		}
	// 	},
	// 	where: {
	// 		creativeWork: {
	// 			status: CreativeWorkStatus.PUBLIC
	// 			// AND: { author: { name: { not: null } } }
	// 		}
	// 	}
	// });
	const blogPosts = await drizzleORM.query.blogPost.findMany({
		// where: (blogPosts, { eq }) =>
		// 	eq(blogPosts.creativeWork.status, CreativeWorkStatus.PUBLIC),
		// where(fields, { sql }) {
		// 	return sql`${fields.creativeWork}.status=${CreativeWorkStatus.PUBLIC}`;
		// },
		columns: { slug: true, updatedAt: true },
		with: {
			creativeWork: {
				columns: { createdAt: true, status: true },
				with: { author: { columns: { name: true } } }
			}
		}
	}).then(blogPosts => blogPosts.filter(blogPost => blogPost.creativeWork.status === CreativeWorkStatus.PUBLIC));

	// clg
	

	// const users = await prisma.user.findMany({
	// 	select: { name: true },
	// 	where: { role: { not: null } }
	// });
	const users = await drizzleORM.query.user.findMany({
		columns: { name: true },
		where: (user) => isNotNull(user.role)
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
