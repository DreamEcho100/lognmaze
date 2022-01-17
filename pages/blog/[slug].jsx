import Head from 'next/head';

import { NewsContextSharedProvider } from '@store/NewsContext';
import { XMLCharactersEncoding } from '@lib/v1/regex';
import { pool } from '@lib/v1/pg';

import OneNewsContent from '@components/OneNewsContent';

const BlogHead = ({ data = {} }) => {
	const descriptionWithXMLCharactersEncoding = XMLCharactersEncoding(
		data.description
	);

	return (
		<Head>
			<meta property='og:type' content='blog' />
			<meta property='blog:publisher' content={data.author_user_name_id} />
			<meta property='blog:author' content={data.author_user_name_id} />
			<meta property='blog:published_time' content={data.created_at} />
			{data.created_at !== data.updated_at && (
				<meta property='blog:modified_time' content={data.updated_at} />
			)}

			{data.slug && <link rel='canonical' href={`blog/${data.slug}`} />}

			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'http://schema.org',
						'@type': 'BlogPosting',
						headline: data.title,
						alternativeHeadline: data.slug,
						image: data.image,
						author: data.author_user_name_id,
						// award: 'Best blog ever written',
						// editor: 'Craig Mount',
						genre: data.tags.join(' '),
						keywords: data.tags.join(' '),
						wordcount: data.content.length,
						publisher: {
							'@type': 'Organization',
							name: 'LogNMaze',
							logo: {
								'@type': 'ImageObject',
								url: 'https://lognmaze.com/favicon.ico',
							},
						},
						url: `https://lognmaze.com/blog/${data.slug}`,
						mainEntityOfPage: {
							'@type': 'WebPage',
							'@id': 'https://google.com/blog',
						},
						datePublished: data.created_at,
						dateCreated: data.created_at,
						dateModified: data.updated_at,
						description: data.description,
						blogBody: data.content,
					}),
				}}
			/>

			<meta property='blog:tag' content={data.tags.join(',')} />

			<meta name='keywords' content={data.tags.join(',')} />

			<meta property='og:image' content={data.image_src} />
			<meta property='og:image:width' content='1200' />
			<meta property='og:image:height' content='630' />
			<meta property='og:image:alt' content={data.image_alt} />

			<meta name='twitter:image' content={data.image_src} />
			<meta name='twitter:card' content='summary_large_image' />

			<meta
				property='og:url'
				content={`https://lognmaze.com/blog/${data.slug}`}
			/>
			<meta
				name='twitter:url'
				content={`https://lognmaze.com/blog/${data.slug}`}
			/>

			<meta
				name='twitter:description'
				content={descriptionWithXMLCharactersEncoding}
			/>
			<meta
				property='og:description'
				content={descriptionWithXMLCharactersEncoding}
			/>
			<meta name='description' content={descriptionWithXMLCharactersEncoding} />

			<meta name='twitter:title' content={`${data.title} | LogNMaze`} />
			<meta property='og:title' content={`${data.title} | LogNMaze`} />
			<title>{data.title} | LogNMaze</title>
		</Head>
	);
};

const BlogPage = (props) => {
	const data =
		typeof props.data === 'string' ? JSON.parse(props.data) : props.data;

	return (
		<NewsContextSharedProvider>
			<BlogHead data={data} />
			<OneNewsContent newsItemData={data} NewsHeader={BlogHead} />
		</NewsContextSharedProvider>
	);
};

export default BlogPage;

export const getStaticProps = async ({ params: { slug }, res }) => {
	try {
		if (!slug) {
			return {
				props: {
					data: {},
				},
				notFound: true,
			};
		}

		const result = await pool
			.query(
				`
						SELECT
							news.news_id,
							news.type,
							news.comments_counter,
							news.up_votes_counter,
							news.down_votes_counter,
							news.created_at,
							news.updated_at,
							
							user_profile.user_profile_id AS author_id,
							user_profile.user_name_id AS author_user_name_id,
							user_profile.first_name AS author_first_name,
							user_profile.last_name AS author_last_name,
							user_profile.profile_picture AS author_profile_picture,
							user_profile.bio AS author_bio,

							news_blog.title,
							news_blog.slug,
							news_blog.iso_language,
							news_blog.iso_country,
							news_blog.image_alt,
							news_blog.image_src,
							news_blog.description,
							news_blog.content,

							ARRAY (
								SELECT news_tag.name AS tag
								FROM news_tag
								WHERE news_tag.news_id = news_blog.news_blog_id
							) AS tags
					
						FROM news
						JOIN user_profile ON user_profile.user_profile_id = news.author_id
						JOIN news_blog ON news_blog.news_blog_id = news.news_id
						WHERE news_blog.slug = $1
						;
					`,
				[
					// slugsToReplace[slug] ||
					slug,
				]
			)
			.then((response) => response.rows[0]);

		if (!result) {
			// res.statusCode = 404;

			return {
				props: {
					data: {},
				},
				notFound: true,
			};
		}

		if (result) {
			return {
				props: {
					data: JSON.stringify(result),
				},
				revalidate: 60,
			};
		}
	} catch (error) {
		console.error(`Error, ${error}`);

		// res.statusCode = 404;

		return {
			props: {
				data: {},
			},
			notFound: true,
		};
	}
};

export const getStaticPaths = async () => {
	try {
		const paths = await pool
			.query('SELECT slug FROM news_blog')
			.then((response) =>
				response.rows.map((post) => ({
					params: { slug: post.slug },
				}))
			);

		return {
			paths,
			fallback: 'blocking',
		};
	} catch (error) {
		console.error(`Error, ${error}`);

		return {
			paths: [],
			fallback: 'blocking',
		};
	}
};
