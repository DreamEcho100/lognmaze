import { Fragment, useCallback, useEffect, useState } from 'react';

import { useNewsSharedState } from '@store/NewsContext';
import { handleAddingNewsFirstTime } from '@store/NewsContext/actions';

import NewsItem from '@components/UI/V1/News/Item';
import Wrapper from '@components/UI/V1/Wrapper';

const OneNewsContent = ({ newsItemData = {}, NewsHeader, ...props }) => {
	const [newsState, newsDispatch] = useNewsSharedState();
	const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(
		!!props.isLoadingSkeleton
	);

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

	useEffect(() => {
		if (newsState.news && newsState.news.length !== 0)
			setIsLoadingSkeleton(false);
	}, [props.isLoadingSkeleton, newsState.news]);

	return newsState.news.map((item, index) => (
		<Fragment key={`${index}-${item.id}`}>
			{NewsHeader &&
			(newsState.news[0]?.type === 'blog' ||
				newsState.news[0]?.type === 'post') ? (
				<NewsHeader data={newsState.news[0]} />
			) : null}
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
						isLoadingSkeleton={isLoadingSkeleton}
					/>
				</Wrapper>
			</main>
		</Fragment>
	));
};

export default OneNewsContent;
