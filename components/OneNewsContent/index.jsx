import { useCallback, useEffect } from 'react';

import {
	NewsContextSharedProvider,
	useNewsSharedState,
} from '@store/NewsContext';
import { handleAddingNewsFirstTime } from '@store/NewsContext/actions';

import NewsItem from '@components/UI/V1/News/Item';
import Wrapper from '@components/UI/V1/Wrapper';

const OneNewsContent = ({ newsItemData = {} }) => {
	const [newsState, newsDispatch] = useNewsSharedState();

	const CBHandleAddingNewsFirstTime = useCallback(
		() =>
			handleAddingNewsFirstTime({
				newsDispatch,
				news: [newsItemData],
				newsType: 'ONE',
			}),
		[newsDispatch, newsItemData]
	);

	useEffect(() => {
		CBHandleAddingNewsFirstTime();
	}, [CBHandleAddingNewsFirstTime]);

	return newsState.news.map((item, index) => (
		<main
			className='main'
			key={`OneNewsContent-${index}-${newsItemData.news_id}`}
		>
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
	));
};

const NewsContextWrapper = (props) => {
	return (
		<NewsContextSharedProvider>
			<OneNewsContent {...props} />
		</NewsContextSharedProvider>
	);
};

export default NewsContextWrapper;
