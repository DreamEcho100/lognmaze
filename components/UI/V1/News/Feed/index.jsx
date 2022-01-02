import classes from './index.module.css';

import { handleLoadMoreNewsItems } from '@store/NewsContext/actions';
import { handleAllClasses } from '@lib/v1/className';
import { useNewsSharedState } from '@store/NewsContext';

import Wrapper from '@components/UI/V1/Wrapper';
import NewsItem from '../Item';

const Feed = ({
	defaultClasses = 'feed',
	extraClasses = '',
	className = '',
	isLoadingSkeleton,
	// newsState,
	newsFetchRouteQuery,
	...props
}) => {
	const [newsState, newsDispatch] = useNewsSharedState();

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

	return (
		<section {...feedProps}>
			{/* {isLoadingSkeleton &&
				new Array(10).fill().map((item, index) => (
					<Wrapper key={index}>
						<NewsItem
							isLoadingSkeleton={isLoadingSkeleton}
							newsItem={item}
							detailsType='description'
							modalOnClick
							className={classes['news-NewsItem']}
						/>
					</Wrapper>
				))} */}
			{isLoadingSkeleton && (
				<Wrapper>
					<NewsItem
						isLoadingSkeleton={isLoadingSkeleton}
						// newsItemData={{}}
						detailsType='description'
						modalOnClick
						className={classes['news-NewsItem']}
					/>
				</Wrapper>
			)}

			{!isLoadingSkeleton &&
				newsState?.length !== 0 &&
				newsState.news.map((item, index) => {
					return (
						<Wrapper
							key={`Feed-${index}-${item.news_id}`}
							style={{
								padding: '1em',
							}}
						>
							<NewsItem newsItemData={item} modalOnClick />
						</Wrapper>
					);
				})}
			{!isLoadingSkeleton &&
				newsState.news.length !== 0 &&
				!newsState.hit_news_items_limit && (
					<Wrapper
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
							disabled={newsState.isLoadingMoreNewsItems}
							onClick={() =>
								handleLoadMoreNewsItems({
									newsDispatch,
									last_news_item_created_at:
										newsState.last_news_item_created_at,
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
					</Wrapper>
				)}
		</section>
	);
};

export default Feed;
