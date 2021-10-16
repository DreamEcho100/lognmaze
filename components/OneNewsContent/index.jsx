import { useContext, useEffect } from 'react';

import NewsContext from '@store/NewsContext';
import { handleAddingNewsFirstTime } from '@store/NewsContext/actions';

import NewsItem from '@components/UI/V1/NewsV2/Item';
import Wrapper from '@components/UI/V1/Wrapper';

const OneNewsContent = ({ newsItemData = {} }) => {
	const articleProps = {
		newsItemData: newsItemData,
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
				<NewsItem {...articleProps} />
			</Wrapper>
		</main>
	);
};

const NewsContextWrapper = ({ newsItemData }) => {
	const { state, dispatch, types } = useContext(NewsContext);

	useEffect(() => {
		handleAddingNewsFirstTime({
			dispatch,
			news: [newsItemData],
			newsType: 'ONE',
		});
	}, []);

	return state.news.map((item, index) => (
		<OneNewsContent
			key={`OneNewsContent-${index}-${newsItemData.news_id}`}
			newsItemData={item}
		/>
	));
};

export default NewsContextWrapper;
