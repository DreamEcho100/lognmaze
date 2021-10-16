// import { useState } from 'react';
import Head from 'next/head';

import { XMLCharactersEncoding } from '@lib/v1/regex';
import { pool, getAllArticlesSlugs } from '@lib/v1/pg';

import { NewsContextProvider } from '@store/NewsContext';

import OneNewsContent from '@components/OneNewsContent';

const ArticlePage = (props) => {
	const data =
		typeof props.data === 'string' ? JSON.parse(props.data) : props.data;

	const descriptionWithXMLCharactersEncoding =
		data?.type === 'article'
			? XMLCharactersEncoding(data.description)
			: data?.type === 'post'
			? XMLCharactersEncoding(data.content)
			: undefined;

	return (
		<NewsContextProvider>
			<Head>
				<meta property='og:type' content='article' />
				<meta property='article:publisher' content={data.author_user_name_id} />
				<meta property='article:author' content={data.author_user_name_id} />
				<meta property='article:published_time' content={data.created_at} />
				{data.created_at !== data.updated_at && (
					<meta property='article:modified_time' content={data.updated_at} />
				)}

				{data.slug && <link rel='canonical' href={`article/${data.slug}`} />}

				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'http://schema.org',
							'@type': 'Article',
							headline: data.title,
							alternativeHeadline: data.slug,
							image: data.image,
							author: data.author_user_name_id,
							// award: 'Best article ever written',
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
							url: `http://lognmaze.com/article/${data.slug}`,
							mainEntityOfPage: {
								'@type': 'WebPage',
								'@id': 'https://google.com/article',
							},
							datePublished: data.created_at,
							dateCreated: data.created_at,
							dateModified: data.updated_at,
							description: data.description,
							articleBody: data.content,
						}),
					}}
				/>

				<meta property='article:tag' content={data.tags.join(',')} />

				<meta name='keywords' content={data.tags.join(',')} />

				<meta property='og:image' content={data.image_src} />
				<meta property='og:image:width' content='1200' />
				<meta property='og:image:height' content='630' />
				<meta property='og:image:alt' content={data.image_alt} />

				<meta name='twitter:image' content={data.image_src} />
				<meta name='twitter:card' content='summary_large_image' />

				<meta
					property='og:url'
					content={`https://lognmaze.com/article/${data.slug}`}
				/>
				<meta
					name='twitter:url'
					content={`https://lognmaze.com/article/${data.slug}`}
				/>

				<meta
					name='twitter:description'
					content={descriptionWithXMLCharactersEncoding}
				/>
				<meta
					property='og:description'
					content={descriptionWithXMLCharactersEncoding}
				/>
				<meta
					name='description'
					content={descriptionWithXMLCharactersEncoding}
				/>

				<meta name='twitter:title' content={`${data.title} | LogNMaze`} />
				<meta property='og:title' content={`${data.title} | LogNMaze`} />
				<title>{data.title} | LogNMaze</title>
			</Head>
			<OneNewsContent newsItemData={data} />
		</NewsContextProvider>
	);
};

export default ArticlePage;

export const getStaticProps = async ({ params: { slug }, res }) => {
	// const {
	// 	params: { slug },
	// 	res,
	// } = context;

	// const slugsToReplace = {
	// 	'basic-guide-to-jsonb-in-postgresql':
	// 		'basic-guide-to-json-in-postgresql-jsonb',
	// 	'basic-guide-to-json-in-postgresql':
	// 		'basic-guide-to-json-in-postgresql-jsonb',
	// 	'full-guide-to-cookies-and-javascript-clint-side':
	// 		'full-guide-to-cookies-and-javascript-client-side',
	// };

	try {
		if (!slug) {
			// res.statusCode = 404;

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

							news_article.title,
							news_article.slug,
							news_article.iso_language,
							news_article.iso_country,
							news_article.image_alt,
							news_article.image_src,
							news_article.description,
							news_article.content,

							ARRAY (
								SELECT news_tag.name AS tag
								FROM news_tag
								WHERE news_tag.news_id = news_article.news_article_id
							) AS tags
					
						FROM news
						JOIN user_profile ON user_profile.user_profile_id = news.author_id
						JOIN news_article ON news_article.news_article_id = news.news_id
						WHERE news_article.slug = $1
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
		const result = await getAllArticlesSlugs();

		const paths = result.map((post) => ({
			params: { slug: post.slug },
		}));

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
