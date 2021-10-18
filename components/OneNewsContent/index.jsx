import { useEffect } from 'react';

import {
	NewsContextSharedProvider,
	useNewsSharedState,
} from '@store/NewsContext';
import { handleAddingNewsFirstTime } from '@store/NewsContext/actions';

import NewsItem from '@components/UI/V1/NewsV2/Item';
import Wrapper from '@components/UI/V1/Wrapper';

const OneNewsContent = ({ newsItemData = {} }) => {
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
				<NewsItem
					newsItemData={newsItemData}
					detailsType={'content'}
					loadingUserVote={true}
					isContainerContentOnView={true}
				/>
			</Wrapper>
		</main>
	);
};

const NewsContextWrapper = ({ newsItemData }) => {
	const [newsState, newsDispatch] = useNewsSharedState();

	useEffect(() => {
		handleAddingNewsFirstTime({
			newsDispatch,
			news: [newsItemData],
			newsType: 'ONE',
		});
	}, []);

	return newsState.news.map((item, index) => (
		<OneNewsContent
			key={`OneNewsContent-${index}-${newsItemData.news_id}`}
			newsItemData={item}
		/>
	));
};

const NewsContextWrapperParent = (props) => {
	return (
		<NewsContextSharedProvider>
			<NewsContextWrapper {...props} />
		</NewsContextSharedProvider>
	);
};

export default NewsContextWrapperParent;
