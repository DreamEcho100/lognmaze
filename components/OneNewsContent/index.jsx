import { useContext, useEffect } from 'react';

import Head from 'next/head';

import NewsContext from '@store/NewsContext';

import Container from '@components/UI/V1/News/Container';
import Wrapper from '@components/UI/V1/Wrapper';

const OneNewsContent = ({ newsItem }) => {
	const articleProps = {
		newsItem: newsItem,
		detailsType: 'content',
		loadingUserVote: true,
		isContainerContentOnView: true,
	};

	return (
		<main className='main'>
			<Head>
				<meta property='og:type' content='article' />
				<meta
					property='article:publisher'
					content={newsItem.author_user_name_id}
				/>
				<meta
					property='article:author'
					content={newsItem.author_user_name_id}
				/>
				<meta property='article:published_time' content={newsItem.created_at} />
				{newsItem.created_at !== newsItem.updated_on ? (
					<meta
						property='article:modified_time'
						content={newsItem.updated_on}
					/>
				) : (
					''
				)}

				{newsItem.type === 'article' ? (
					<>
						<script
							type='application/ld+json'
							dangerouslySetInnerHTML={{
								__html: JSON.stringify({
									'@context': 'http://schema.org',
									'@type': 'Article',
									headline: newsItem.title,
									alternativeHeadline: newsItem.slug,
									image: newsItem.image,
									author: newsItem.author_user_name_id,
									// award: 'Best article ever written',
									// editor: 'Craig Mount',
									genre: newsItem.tags.join(' '),
									keywords: newsItem.tags.join(' '),
									wordcount: newsItem.content.length,
									publisher: {
										'@type': 'Organization',
										name: 'LogNMaze',
										logo: {
											'@type': 'ImageObject',
											url: 'https://lognmaze.com/favicon.ico',
										},
									},
									url: `http://lognmaze.com/article/${newsItem.slug}`,
									mainEntityOfPage: {
										'@type': 'WebPage',
										'@id': 'https://google.com/article',
									},
									datePublished: newsItem.created_at,
									dateCreated: newsItem.created_at,
									dateModified: newsItem.updated_on,
									description: newsItem.description,
									articleBody: newsItem.content,
								}),
							}}
						/>

						<meta property='article:tag' content={newsItem.tags.join(',')} />

						<meta name='keywords' content={newsItem.tags.join(',')} />

						<meta property='og:image' content={newsItem.image_src} />
						<meta property='og:image:width' content='1200' />
						<meta property='og:image:height' content='630' />
						<meta property='og:image:alt' content={newsItem.image_alt} />

						<meta name='twitter:image' content={newsItem.image_src} />
						<meta name='twitter:card' content='summary_large_image' />

						<meta
							property='og:url'
							content={`https://lognmaze.com/article/${newsItem.slug}`}
						/>
						<meta
							name='twitter:url'
							content={`https://lognmaze.com/article/${newsItem.slug}`}
						/>

						<meta name='twitter:description' content={newsItem.description} />
						<meta property='og:description' content={newsItem.description} />
						<meta name='description' content={newsItem.description} />

						<meta
							name='twitter:title'
							content={`${newsItem.title} | LogNMaze`}
						/>
						<meta
							property='og:title'
							content={`${newsItem.title} | LogNMaze`}
						/>
						<title>{newsItem.title} | LogNMaze</title>
					</>
				) : (
					<>
						<meta
							property='og:url'
							content={`https://lognmaze.com/post/${newsItem.news_id}`}
						/>
						<meta
							name='twitter:url'
							content={`https://lognmaze.com/post/${newsItem.news_id}`}
						/>
						<meta property='og:description' content={newsItem.content} />
						<meta name='description' content={newsItem.content} />
					</>
				)}
			</Head>
			<Wrapper
				style={{
					borderRadius: '1rem',
					width: 'fit-content',
					maxWidth: '100%',
					padding: '1em',
				}}
			>
				<Container {...articleProps} />
			</Wrapper>
		</main>
	);
};

const NewsContextWrapper = ({ newsItem }) => {
	const { state, dispatch, types } = useContext(NewsContext);

	useEffect(() => {
		dispatch({
			type: types.INIT_STATE,
			payload: { news: [newsItem], newsType: types.ONE },
		});
	}, []);

	return state.news.map((item, index) => (
		<OneNewsContent
			key={`OneNewsContent-${index}-${newsItem.news_id}`}
			newsItem={item}
		/>
	));
};

export default NewsContextWrapper;
