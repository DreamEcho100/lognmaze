import classes from './index.module.css';

// import { handleLoadMoreNewsItems } from '@store/NewsContext/actions';
// import { handleAllClasses } from '@lib/v1/className';
import { useNewsSharedState } from '@store/newsContext';
import { handleAllClasses } from '@commonLibIndependent/className';

import SectionWrapper from '@commonComponentsIndependent/SectionWrapper';
import NewsItem from '@commonComponentsDependent/News/Item';

interface IProps {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
	newsFetchRouteQuery: { [key: string]: any };
}

const NewsFeed = ({
	defaultClasses = 'feed',
	extraClasses = '',
	className = '',
	// isLoadingSkeleton,
	// // newsState,
	// newsFetchRouteQuery,
	...props
}) => {
	const [newsState, newsDispatch] = useNewsSharedState();

	const [newsDataState, newsDataDispatch] = useNewsSharedState();

	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	const feedProps = {
		className: allClasses,
		...props,
	};

	if (!newsDataState.data) return <></>;

	return (
		<section {...feedProps}>
			{newsDataState.data.news.length !== 0 &&
				newsDataState.data.news.map((item, index) => {
					return (
						<SectionWrapper
							key={`NewsFeed-${index}-${item.news_id}`}
							className={classes.SectionWrapper}
						>
							<NewsItem newsItemData={item} />
						</SectionWrapper>
					);
				})}
			{/* {
				newsDataState.data.news.length !== 0 &&
				!newsDataState.data.hit_news_items_limit && (
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
							disabled={newsDataState.data.isLoadingMoreNewsItems}
							onClick={() =>
								handleLoadMoreNewsItems({
									newsDispatch,
									last_news_item_created_at:
										newsDataState.data.last_news_item_created_at,
									newsFetchRouteQuery,
								})
							}
							style={{
								width: '100%',
								height: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<strong>Load More</strong>
						</button>
					</SectionWrapper>
				)} */}
		</section>
	);
};

export default NewsFeed;
