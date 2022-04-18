import { ArticleJsonLd, NextSeo } from 'next-seo';

import helpersClasses from '@styles/helpers.module.css';
import classes from './index.module.css';

import { useNewsSharedState } from '@store/NewsContext';
import SectionWrapper from '@commonComponentsIndependent/SectionWrapper';
import NewsItem from '@coreComponents/News/Item';

const BlogScreen = () => {
	const [
		{
			data: { news: newsData },
		},
		// userDispatch,
	] = useNewsSharedState();

	if (newsData[0].type !== 'blog') return <></>;

	const newsItemData = newsData[0];

	return (
		<>
			<NextSeo
				title={`${newsItemData.type_data.title} | LogNMaze`}
				description={newsItemData.type_data.description}
				canonical={`https://lognmaze.com/blogs/${newsItemData.type_data.slug}`}
				// openGraph={{
				// 	locale: `${newsItemData.type_data.iso_language}_${newsItemData.type_data.iso_country}`,
				// }}

				openGraph={{
					title: `${newsItemData.type_data.title} | LogNMaze`,
					description: newsItemData.type_data.description,
					url: `https://lognmaze.com/blogs/${newsItemData.type_data.slug}`,
					type: 'article',

					article: {
						publishedTime: new Date(newsItemData.created_at).toISOString(),
						modifiedTime: new Date(newsItemData.updated_at).toISOString(),
						// expirationTime: '2022-12-21T22:04:11Z',
						// section: 'Section II',
						authors: [
							`${newsItemData.author_first_name} ${newsItemData.author_last_name} - @${newsItemData.author_user_name_id}`,
						],
						tags: newsItemData.type_data?.tags || [],
					},
					...(() => {
						const images = [
							{
								url: 'https://lognmaze.com/favicon.ico',
								width: 250,
								height: 250,
								alt: 'LogNMaze Logo',
							},
							{
								url: newsItemData.type_data.image_src,
								width: 850,
								height: 650,
								alt: newsItemData.type_data.image_alt,
							},
						];

						if (newsItemData.author_profile_picture)
							images.push({
								url: newsItemData.author_profile_picture,
								width: 850,
								height: 650,
								alt: 'Author Profile Picture',
							});

						return {
							images,
						};
					})(),
				}}
			/>
			<ArticleJsonLd
				title={`${newsItemData.type_data.title} | LogNMaze`}
				description={newsItemData.type_data.description}
				url={`https://lognmaze.com/blogs/${newsItemData.type_data.slug}`}
				type='Blog'
				datePublished={new Date(newsItemData.created_at).toISOString()}
				publisherLogo='https://lognmaze.com/favicon.ico'
				publisherName='LogNMaze'
				dateModified={new Date(newsItemData.updated_at).toISOString()}
				authorName={`${newsItemData.author_first_name} ${newsItemData.author_last_name} - @${newsItemData.author_user_name_id}`}
				{...(() => {
					const images = [
						'https://lognmaze.com/favicon.ico',
						newsItemData.type_data.image_src,
					];

					if (newsItemData.author_profile_picture)
						images.push(newsItemData.author_profile_picture);

					return {
						images,
					};
				})()}
			/>
			<main className={helpersClasses.main}>
				<SectionWrapper className={classes.mainNewsItemData}>
					<NewsItem newsItemData={newsItemData} detailsType='content' />
				</SectionWrapper>
			</main>
		</>
	);
};

export default BlogScreen;
