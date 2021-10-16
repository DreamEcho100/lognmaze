import Head from 'next/head';

import { pool } from '@lib/v1/pg';
import { XMLCharactersEncoding } from '@lib/v1/regex';

import { NewsContextProvider } from '@store/NewsContext';

import OneNewsContent from '@components/OneNewsContent';

const PostPage = (props) => {
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

				<meta
					property='og:url'
					content={`https://lognmaze.com/post/${data.news_id}`}
				/>
				<meta
					name='twitter:url'
					content={`https://lognmaze.com/post/${data.news_id}`}
				/>
				<meta
					property='twitter:description'
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
			</Head>
			<OneNewsContent newsItemData={data} />
		</NewsContextProvider>
	);
};

export default PostPage;

export const getServerSideProps = async ({ query }) => {
	try {
		if (!query.id) {
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
							news.updated_at,
							
							user_profile.user_profile_id AS author_id,
							user_profile.user_name_id AS author_user_name_id,
							user_profile.first_name AS author_first_name,
							user_profile.last_name AS author_last_name,
							user_profile.profile_picture AS author_profile_picture,
							user_profile.bio AS author_bio,

							news_post.content
					
						FROM news
						JOIN user_profile ON user_profile.user_profile_id = news.author_id
						JOIN news_post ON news_post.news_post_id = news.news_id
						WHERE news_post.news_post_id = $1
						;
					`,
				[query.id]
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
