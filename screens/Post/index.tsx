import { ArticleJsonLd, NextSeo } from 'next-seo';

import helpersClasses from '@styles/helpers.module.css';
import classes from './index.module.css';

import { useNewsSharedState } from '@store/NewsContext';
import SectionWrapper from '@commonComponentsIndependent/SectionWrapper';
import NewsItem from '@coreComponents/News/Item';

const PostScreen = () => {
	const [
		{
			data: { news: newsData },
		},
		// userDispatch,
	] = useNewsSharedState();

	if (newsData[0].type !== 'post') return <></>;

	const newsItemData = newsData[0];

	return (
		<>
			<NextSeo
				title={`${newsItemData.author_first_name} ${newsItemData.author_last_name} - @${newsItemData.author_user_name_id} | LogNMaze`}
				description={newsItemData.type_data.content}
				canonical={`https://lognmaze.com/posts/${newsItemData.news_id}`}
				// openGraph={{
				// 	locale: `${newsItemData.type_data.iso_language}_${newsItemData.type_data.iso_country}`,
				// }}

				openGraph={{
					title: `${newsItemData.author_first_name} ${newsItemData.author_last_name} - @${newsItemData.author_user_name_id} | LogNMaze`,
					description: newsItemData.type_data.content,
					url: `https://lognmaze.com/posts/${newsItemData.news_id}`,
					type: 'article',

					article: {
						publishedTime: new Date(newsItemData.created_at).toISOString(),
						modifiedTime: new Date(newsItemData.updated_at).toISOString(),
						// expirationTime: '2022-12-21T22:04:11Z',
						// section: 'Section II',
						authors: [
							`${newsItemData.author_first_name} ${newsItemData.author_last_name} - @${newsItemData.author_user_name_id}`,
						],
						tags: ['LogNMaze', 'post'],
					},
					...(() => {
						const images = [
							{
								url: 'https://lognmaze.com/favicon.ico',
								width: 250,
								height: 250,
								alt: 'LogNMaze Logo',
							},
						];

						if (newsItemData.author_profile_picture)
							images.push({
								url: newsItemData.author_profile_picture,
								width: 850,
								height: 650,
								alt: 'Author Profile Picture',
							});

						if (images.length === 0) return {};

						return {
							images,
						};
					})(),
				}}
			/>
			<ArticleJsonLd
				title={`${newsItemData.author_first_name} ${newsItemData.author_last_name} - @${newsItemData.author_user_name_id} | LogNMaze`}
				description={newsItemData.type_data.content}
				url={`https://lognmaze.com/posts/${newsItemData.news_id}`}
				type='Blog'
				datePublished={new Date(newsItemData.created_at).toISOString()}
				publisherLogo='https://lognmaze.com/favicon.ico'
				publisherName='LogNMaze'
				dateModified={new Date(newsItemData.updated_at).toISOString()}
				authorName={`${newsItemData.author_first_name} ${newsItemData.author_last_name} - @${newsItemData.author_user_name_id}`}
				{...(() => {
					const images = ['https://lognmaze.com/favicon.ico'];

					if (newsItemData.author_profile_picture)
						images.push(newsItemData.author_profile_picture);

					return {
						images,
					};
				})()}
			/>
			<main className={helpersClasses.main}>
				<SectionWrapper className={classes.mainNewsItemData}>
					<NewsItem newsItemData={newsItemData} />
				</SectionWrapper>
			</main>
		</>
	);
};

export default PostScreen;
