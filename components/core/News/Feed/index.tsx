import { FC } from 'react';

import classes from './index.module.css';
import helpersClasses from '@styles/helpers.module.css';

import { getMoreNewsItems } from '@store/NewsContext/actions';
import { useNewsSharedState } from '@store/NewsContext';
import { handleAllClasses } from '@commonLibIndependent/className';

import SectionWrapper from '@commonComponentsIndependent/SectionWrapper';
import NewsItem from '@coreComponents/News/Item';
import { TNewsItemData } from '@coreLib/ts/global';

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

	const getMoreNewsItemsRequest = newsActions.requests?.getMoreNewsItems;

	const feedProps = {
		className: allClasses,
		...props,
	};

	if (newsData.length === 0) return <></>;

	return (
		<section {...feedProps}>
			{newsData.length !== 0 &&
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				newsData.map((item: TNewsItemData, index: any) => (
					<SectionWrapper
						key={`NewsFeed-${index}-${item.news_id}`}
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
						disabled={getMoreNewsItemsRequest?.isLoading}
						onClick={() => {
							const newsCreatedBefore =
								newsData[newsData.length - 1]?.created_at;

							if (
								newsCreatedBefore &&
								(!getMoreNewsItemsRequest ||
									!getMoreNewsItemsRequest?.isLoading)
							)
								getMoreNewsItems(newsDispatch, {
									urlOptions: {
										queries: {
											newsCreatedBefore: new Date(
												newsCreatedBefore
											).toISOString(),
										},
									},
								});
						}}
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
