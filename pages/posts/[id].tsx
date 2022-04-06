import { GetServerSideProps, NextPage } from 'next';

import pool from '@coreLib/db/pg/connection';
import { INewsItemTypePost } from '@coreLib/ts/global';
import {
	ISetNewsContextStoreProps,
	setNewsContextStore,
} from '@store/NewsContext';

import PostScreen from '@screens/Post';

// import { useSetNewsContextStore } from '@store/NewsContext';
// import { pool } from '@lib/v1/pg';
// import { XMLCharactersEncoding } from '@lib/v1/regex';

// import OneNewsContent from '@components/OneNewsContent';

/*
			// https://schema.org/DiscussionForumPosting *
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
*/

interface IProps {
	newsItemData?: Required<INewsItemTypePost>;
}

const PostPage: NextPage<IProps> = ({ newsItemData }) => {
	if (!newsItemData) return <></>;

	const newsExtra: ISetNewsContextStoreProps['data']['newsExtra'] = {};
	const actions: ISetNewsContextStoreProps['actions'] = {
		items: {},
	};

	actions.items[newsItemData.news_id] = {
		priorityForHeaderImage: true,
	};

	newsExtra[newsItemData.news_id] = {
		hit_comments_limit: false,
		newsItemDetailsType: 'content',
		newsItemModelDetailsType: 'content',
	};

	const { NewsContextSharedProvider } = setNewsContextStore({
		data: {
			news: [newsItemData],
			newsExtra,
			hit_news_items_limit: true,
		},
		actions,
	});

	return (
		<NewsContextSharedProvider>
			<PostScreen />
		</NewsContextSharedProvider>
	);
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async ({
	query,
	res,
}) => {
	try {
		if (!query.id) {
			res.statusCode = 404;
			// throw new Error('The id is not provided!');
			return {
				props: {
					message: 'The id is not provided!',
					date: new Date().toISOString(),
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
							
							json_build_object (
								'content', news_post.content
							) type_data
					
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
			res.statusCode = 404;
			// throw new Error('There is no data found!');
			return {
				props: {
					message: 'There is no data found!',
					date: new Date().toISOString(),
				},
				notFound: true,
			};
		}

		// throw new Error('');

		result.created_at = result.created_at.toString();
		result.updated_at = result.updated_at.toString();

		res.setHeader(
			'Cache-Control',
			'public, s-maxage=60, stale-while-revalidate=60'
		);
		return {
			props: {
				newsItemData: result,
			},
		};
	} catch (error) {
		console.error(`Error, ${error}`);

		if (res.statusCode < 400) res.statusCode = 500;
		res.statusMessage = `Error, ${error}`;
		// res.end();

		return {
			props: {
				message: '',
			},
		};
	}
};
