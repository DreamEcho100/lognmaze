import { pool, getAllArticlesSlugs } from '@lib/v1/pg';

import { NewsContextProvider } from '@store/NewsContext';

import OneNewsContent from '@components/OneNewsContent';

const ArticlePage = ({ data }) => {
	return (
		<NewsContextProvider>
			<OneNewsContent
				newsItem={typeof data === 'string' ? JSON.parse(data) : data}
			/>
		</NewsContextProvider>
	);
};

export default ArticlePage;

export const getStaticProps = async ({ params: { slug }, res }) => {
	// const {
	// 	params: { slug },
	// 	res,
	// } = context;

	const slugsToReplace = {
		'basic-guide-to-jsonb-in-postgresql':
			'basic-guide-to-json-in-postgresql-jsonb',
		'basic-guide-to-json-in-postgresql':
			'basic-guide-to-json-in-postgresql-jsonb',
			'full-guide-to-cookies-and-javascript-clint-side': 'full-guide-to-cookies-and-javascript-client-side'
	};

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
							news.updated_on,
							
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
				[slugsToReplace[slug] || slug]
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
