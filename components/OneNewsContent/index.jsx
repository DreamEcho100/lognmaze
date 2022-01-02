import { useCallback, useEffect } from 'react';

import { useNewsSharedState } from '@store/NewsContext';
import { handleAddingNewsFirstTime } from '@store/NewsContext/actions';

import NewsItem from '@components/UI/V1/News/Item';
import Wrapper from '@components/UI/V1/Wrapper';

const OneNewsContent = ({ newsItemData = {}, NewsHeader }) => {
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
		<>
			{
				NewsHeader && (newsState.news[0]?.type === 'article' || newsState.news[0]?.type === 'post') ?
					<NewsHeader data={newsState.news[0]} /> :
					null
			} 
			<main
				className='main'
				key={`OneNewsContent-${index}-${newsState.news[0]?.news_id}`}
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
						newsItemData={newsState.news[0]}
						detailsType={'content'}
						loadingUserVote={true}
						isContainerContentOnView={true}
					/>
				</Wrapper>
			</main>
		</>
	));
};

export default OneNewsContent;
