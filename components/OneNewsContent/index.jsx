import { useContext, useEffect } from 'react';

import NewsContext from '@store/NewsContext';
import { handleAddingNewsFirstTime } from '@store/NewsContext/actions';

import Container from '@components/UI/V1/News/Container';
import Wrapper from '@components/UI/V1/Wrapper';

const OneNewsContent = ({ newsItem = {} }) => {
	const articleProps = {
		newsItem: newsItem,
		detailsType: 'content',
		loadingUserVote: true,
		isContainerContentOnView: true,
	};

	return (
		<main className='main'>
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
		handleAddingNewsFirstTime({ dispatch, news: [newsItem], newsType: 'ONE' });
	}, []);

	return state.news.map((item, index) => (
		<OneNewsContent
			key={`OneNewsContent-${index}-${newsItem.news_id}`}
			newsItem={item}
		/>
	));
};

export default NewsContextWrapper;
