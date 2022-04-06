import pool from '@coreLib/db/pg/connection';
import { INewsItemTypeBlog } from '@coreLib/ts/global';
import BlogScreen from '@screens/Blog';
import {
	ISetNewsContextStoreProps,
	setNewsContextStore,
} from '@store/NewsContext';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

/*
			// https://schema.org/BlogPosting
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
	newsItemData: Required<INewsItemTypeBlog>;
}

const BlogPage: NextPage<IProps> = ({ newsItemData }) => {
	const newsData = { news: [newsItemData] };

	const newsExtra: ISetNewsContextStoreProps['data']['newsExtra'] = {};
	const actions: ISetNewsContextStoreProps['actions'] = {
		items: {},
	};

	newsData.news.forEach((item, index) => {
		if (index === 0) {
			actions.items[item.news_id] = {
				priorityForHeaderImage: true,
			};
		}

		newsExtra[item.news_id] = {
			hit_comments_limit: false,
			newsItemDetailsType: 'content',
			newsItemModelDetailsType: 'content',
		};
	});

	const { NewsContextSharedProvider } = setNewsContextStore({
		data: {
			news: newsData.news,
			newsExtra,
			hit_news_items_limit: true,
		},
		actions,
	});

	return (
		<NewsContextSharedProvider>
			<BlogScreen />
		</NewsContextSharedProvider>
	);
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		if (!params?.slug) {
			throw new Error('params.slug Not Found!');
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
							'title', news_blog.title,
							'slug', news_blog.slug,
							'iso_language', news_blog.iso_language,
							'iso_country', news_blog.iso_country,
							'image_alt', news_blog.image_alt,
							'image_src', news_blog.image_src,
							'description', news_blog.description,
							'content', news_blog.content,
					
							'tags', ARRAY (
								SELECT news_tag.name AS tag
								FROM news_tag
								WHERE news_tag.news_id = news_blog.news_blog_id
							)
						) type_data
					
					FROM news
					JOIN user_profile ON user_profile.user_profile_id = news.author_id
					JOIN news_blog ON news_blog.news_blog_id = news.news_id
					WHERE news_blog.slug = $1
					;
				`,
				[
					// slugsToReplace[slug] ||
					params.slug,
				]
			)
			.then((response) => response.rows[0]);

		if (!result) {
			// res.statusCode = 404;

			return {
				props: {
					newsItemData: {},
				},
				notFound: true,
			};
		}

		result.created_at = result.created_at.toString();
		result.updated_at = result.updated_at.toString();

		if (result) {
			return {
				props: {
					newsItemData: result, // JSON.stringify(result)
				},
				revalidate: 60,
			};
		}
	} catch (error) {
		console.error(`Error, ${error}`);
	}

	return {
		props: {},
		notFound: true,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
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
