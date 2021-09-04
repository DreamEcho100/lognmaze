// import { useState } from 'react';
import { useRouter } from 'next/router';
// import dynamic from 'next/dynamic';
import { pool } from '@lib/v1/pg';

import { NewsContextProvider } from '@store/NewsContext';

// const DynamicOneNewsContent = dynamic(() =>
// 	import('@components/OneNewsContent')
// );
import OneNewsContent from '@components/OneNewsContent';

const ArticlePage = ({ data }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	// const [dynamicComponentReady, setDynamicComponentReady] = useState(false);

	return (
		<NewsContextProvider>
			<OneNewsContent
				// DynamicOneNewsContent
				// dynamicComponentReady={dynamicComponentReady}
				// setDynamicComponentReady={setDynamicComponentReady}
				newsItem={typeof data === 'string' ? JSON.parse(data) : data}
			/>
		</NewsContextProvider>
	);
};

export default ArticlePage;

export const getStaticProps = async (context) => {
	const {
		params: { slug },
	} = context;

	try {
		if (!slug) {
			return {
				props: {
					data: {},
				},
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
				[slug]
			)
			.then((response) => response.rows[0]);

		if (!result) {
			return {
				props: {
					data: false,
				},
			};
		}

		return {
			props: {
				data: JSON.stringify(result),
			},
			revalidate: 60,
		};
	} catch (error) {
		console.error(`Error, ${error}`);

		return {
			props: {
				data: false,
			},
		};
	}
};

export const getStaticPaths = async () => {
	try {
		const result = await pool
			.query('SELECT slug FROM news_article')
			.then(async (response) => response.rows);

		const paths = result.map((post) => ({
			params: { slug: post.slug },
		}));

		return {
			paths,
			fallback: true,
		};
	} catch (error) {
		console.error(`Error, ${error}`);

		return {
			paths: [],
			fallback: true,
		};
	}
};
