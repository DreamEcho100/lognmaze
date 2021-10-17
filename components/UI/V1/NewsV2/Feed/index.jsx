import { useContext, useEffect } from 'react';

import classes from './index.module.css';

import {
	handleAddingNewsFirstTime,
	handleLoadMoreNewsItems,
} from '@store/NewsContext/actions';
import { handleAllClasses } from '@/lib/v1/className';
import NewsContext from '@store/NewsContext';

import Wrapper from '@components/UI/V1/Wrapper';
import NewsItem from '../Item';

const Feed = ({
	defaultClasses = 'feed',
	extraClasses = '',
	className = '',
	isLoadingSkeleton,
	news = [],
	newsFetchRouteQuery,
	...props
}) => {
	const { state, dispatch, types } = useContext(NewsContext);

	useEffect(() => {
		handleAddingNewsFirstTime({
			dispatch,
			news,
			newsType: 'ALL',
			newsFetchRouteQuery,
		});
	}, [news]);

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
				state?.length !== 0 &&
				state.news.map((item, index) => {
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
			{!isLoadingSkeleton && news.length !== 0 && !state.hit_news_items_limit && (
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
						disabled={state.isLoadingMoreNewsItems}
						onClick={() =>
							handleLoadMoreNewsItems({
								dispatch,
								last_news_item_created_at: state.last_news_item_created_at,
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

const FeedNewsContextProvider = (props) => <Feed {...props} />;

export default FeedNewsContextProvider;
