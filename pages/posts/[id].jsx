import Head from 'next/head';

import { useSetNewsContextStore } from '@store/NewsContext';
import { pool } from '@lib/v1/pg';
import { XMLCharactersEncoding } from '@lib/v1/regex';

import OneNewsContent from '@components/OneNewsContent';

const PostHeader = ({ data }) => {
	const descriptionWithXMLCharactersEncoding = XMLCharactersEncoding(
		data.content
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
			<meta
				property='og:url'
				content={`https://lognmaze.com/posts/${data.news_id}`}
			/>
			<meta
				name='twitter:url'
				content={`https://lognmaze.com/posts/${data.news_id}`}
			/>
			<meta
				property='twitter:description'
				content={descriptionWithXMLCharactersEncoding}
			/>
			<meta
				property='og:description'
				content={descriptionWithXMLCharactersEncoding}
			/>
			<meta name='description' content={descriptionWithXMLCharactersEncoding} />

			{/* https://schema.org/DiscussionForumPosting */}
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'http://schema.org',
						'@type': 'DiscussionForumPosting',
						headline: data.title,
						alternativeHeadline: data.slug,
						author: data.author_user_name_id,
						wordCount: data.content.length,
						publisher: {
							'@type': 'Organization',
							name: 'LogNMaze',
							logo: {
								'@type': 'ImageObject',
								url: 'https://lognmaze.com/favicon.ico',
							},
						},
						url: `https://lognmaze.com/blogs/${data.slug}`,
						mainEntityOfPage: {
							'@type': 'WebPage',
							'@id': 'https://google.com/blog',
						},
						datePublished: data.created_at,
						dateCreated: data.created_at,
						dateModified: data.updated_at,
						description: data.description,
						// contentRating
					}),
				}}
			/>
		</Head>
	);
};

const PostPage = (props) => {
	const data =
		typeof props.data === 'string' ? JSON.parse(props.data) : props.data;

	const { NewsContextSharedProvider } = useSetNewsContextStore({
		newsType: 'ONE',
		news: [data],
	});

	return (
		<NewsContextSharedProvider>
			<PostHeader data={data} />
			<OneNewsContent
				// isLoadingSkeleton={true}
				newsItemData={data}
				newsHeader={PostHeader}
			/>
		</NewsContextSharedProvider>
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
