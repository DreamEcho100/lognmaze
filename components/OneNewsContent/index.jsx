import Head from 'next/head';

// import classes from './index.module.css';

import { NewsContextProvider } from '@store/NewsContext';

import Container from '@components/UI/V1/News/Container/Container';
import Wrapper from '@components/UI/V1/Wrapper';

const OneNewsContent = ({ data }) => {
	const articleProps = {
		data: data,
		detailsType: 'content',
		loadingUserVote: true,
		isContainerContentOnView: true,
	};

	return (
		<main className='main'>
			<Head>
				<meta property='og:type' content='article' />
				<meta property='article:publisher' content={data.author_user_name_id} />
				<meta property='article:author' content={data.author_user_name_id} />
				<meta property='article:published_time' content={data.created_at} />
				{data.created_at !== data.updated_on ? (
					<meta property='article:modified_time' content={data.updated_on} />
				) : (
					''
				)}

				{data.type === 'article' ? (
					<>
						<meta property='article:tag' content={data.tags.join(',')} />

						<meta name='keywords' content={data.tags.join(',')} />

						<meta property='og:image' content={data.image} />
						<meta property='og:image:width' content='1200' />
						<meta property='og:image:height' content='630' />
						<meta property='og:image:alt' content={`${data.title} image`} />

						<meta name='twitter:image' content={data.image} />
						<meta name='twitter:card' content='summary_large_image' />

						<meta
							property='og:url'
							content={`https://lognmaze.com/article/${data.slug}`}
						/>
						<meta
							name='twitter:url'
							content={`https://lognmaze.com/article/${data.slug}`}
						/>

						<meta property='og:description' content={data.description} />
						<meta name='description' content={data.description} />
						<meta property='og:title' content={`${data.title} | LogNMaze`} />
						<title>{data.title} | LogNMaze</title>
					</>
				) : (
					<>
						<meta
							property='og:url'
							content={`https://lognmaze.com/post/${data.news_id}`}
						/>
						<meta
							name='twitter:url'
							content={`https://lognmaze.com/post/${data.news_id}`}
						/>
						<meta
							property='og:description'
							content={data.content.slice(0, 200)}
						/>
						<meta name='description' content={data.content.slice(0, 200)} />
					</>
				)}
			</Head>
			<section
				style={{
					width: '100%',
					maxWidth: '100rem',
					margin: 'auto',
				}}
			>
				<NewsContextProvider>
					<Wrapper>
						<Container {...articleProps} />
					</Wrapper>
				</NewsContextProvider>
			</section>
		</main>
	);
};

export default OneNewsContent;
