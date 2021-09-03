import { useState } from 'react';
import dynamic from 'next/dynamic';
import { pool } from '@lib/v1/pg';

import { NewsContextProvider } from '@store/NewsContext';

// import OneNewsContent from '@components/OneNewsContent';
const DynamicOneNewsContent = dynamic(() =>
	import('@components/OneNewsContent')
);

const PostPage = ({ data }) => {
	const [dynamicComponentReady, setDynamicComponentReady] = useState(false);

	return (
		<NewsContextProvider>
			<DynamicOneNewsContent
				dynamicComponentReady={dynamicComponentReady}
				setDynamicComponentReady={setDynamicComponentReady}
				newsItem={data ? JSON.parse(data) : {}}
			/>
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
							news.updated_on,
							
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
