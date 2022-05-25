import { FC } from 'react';

import classes from './index.module.css';
import helpersClasses from '@styles/helpers.module.css';

// import { getMoreNewsItems } from '@store/NewsContext/actions';
import { useNewsSharedState } from '@store/NewsContext';
import { handleAllClasses } from '@commonLibIndependent/className';
import { TNewsData, TNewsItemData } from '@coreLib/ts/global';
import useRequestState from '@commonLibDependent/requestState';
import NewsContextConstants from '@coreLib/constants/store/types/NewsContext';
import networkReqArgs from '@coreLib/networkReqArgs';
import { handleRequestStateChanges } from '@commonLibIndependent/fetch';

import SectionWrapper from '@commonComponentsIndependent/SectionWrapper';
import NewsItem from '@coreComponents/News/Item';

interface IProps {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
	detailsType?: 'description' | 'content';
	modelDetailsType?: 'description' | 'content';
	// newsFetchRouteQuery: { [key: string]: any };
}

const NewsFeed: FC<IProps> = ({
	defaultClasses = 'feed',
	extraClasses = '',
	className = '',
	detailsType = 'description',
	modelDetailsType = 'content',
	...props
}) => {
	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});
	const [newsState, newsDispatch] = useNewsSharedState();

	const {
		data: { news: newsData },
		actions: newsActions,
	} = newsState;

	// const getMoreNewsItemsRequest = newsActions.requests?.getMoreNewsItems;

	const { requestState, requestsActionsDispatch, requestsConstants } =
		useRequestState({
			requestString: 'getMoreNewsItems',
		});

	const feedProps = {
		className: allClasses,
		...props,
	};

	if (newsData.length === 0) return <></>;

	const getMoreNewsItems = async () => {
		const newsCreatedBefore = newsData[newsData.length - 1]?.created_at;

		const urlOptions = {
			queries: {
				newsCreatedBefore: new Date(newsCreatedBefore).toISOString(),
			},
		};

		if (
			newsCreatedBefore &&
			(!requestState.getMoreNewsItems ||
				!requestState.getMoreNewsItems?.isLoading)
		)
			return await handleRequestStateChanges<{
				news: TNewsData;
				hit_news_items_limit: boolean;
			}>({
				onInit: async () => {
					requestsActionsDispatch({
						type: requestsConstants.IS_LOADING,
						payload: {
							target: 'getMoreNewsItems',
						},
					});

					const { requestInfo, requestInit } = networkReqArgs._app.news.get({
						urlOptions,
					});

					return await fetch(requestInfo, requestInit);
				},
				onError: (error) => {
					requestsActionsDispatch({
						type: requestsConstants.ERROR,
						payload: {
							target: 'getMoreNewsItems',
							error,
						},
					});
				},
				onSuccess: ({ news, hit_news_items_limit }) => {
					newsDispatch({
						type: NewsContextConstants.ADD_NEWS_ITEMS,
						payload: { newNewsItems: news, hit_news_items_limit },
					});
					requestsActionsDispatch({
						type: requestsConstants.SUCCESS,
						payload: {
							target: 'getMoreNewsItems',
						},
					});
				},
			});
	};

	return (
		<section {...feedProps}>
			{newsData.length !== 0 &&
				newsData.map((item: TNewsItemData) => (
					<SectionWrapper
						key={`main-news-feed-${item.news_id}`}
						className={classes.SectionWrapper}
					>
						<NewsItem
							newsItemData={item}
							updatedToRenderDate={
								newsActions.items?.[item.news_id]?.updatedToRenderDate
							}
							detailsType={detailsType}
							modelDetailsType={modelDetailsType}
						/>
					</SectionWrapper>
				))}
			{newsData.length !== 0 && !newsState.data.hit_news_items_limit && (
				<SectionWrapper
					style={{
						width: '100%',
						marginLeft: 'auto',
						marginRight: 'auto',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<button
						disabled={requestState.getMoreNewsItems?.isLoading}
						onClick={async () => await getMoreNewsItems()}
						style={{
							width: '100%',
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						title='Load more news items'
					>
						<span className={helpersClasses.fontWeightBold}>Load More</span>
					</button>
				</SectionWrapper>
			)}
		</section>
	);
};

export default NewsFeed;
