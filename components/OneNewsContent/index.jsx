import { useCallback, useEffect } from 'react';

import {
	NewsContextSharedProvider,
	useNewsSharedState,
} from '@store/NewsContext';
import { handleAddingNewsFirstTime } from '@store/NewsContext/actions';

import NewsItem from '@components/UI/V1/News/Item';
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

	const CBHandleAddingNewsFirstTime = useCallback(
		() =>
			handleAddingNewsFirstTime({
				newsDispatch,
				news: [newsItemData],
				newsType: 'ONE',
			}),
		[]
	);

	useEffect(() => {
		CBHandleAddingNewsFirstTime;
	}, [CBHandleAddingNewsFirstTime]);

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
