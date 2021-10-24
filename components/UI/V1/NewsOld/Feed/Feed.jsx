import { Fragment, useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';

import classes from './Feed.module.css';

import NewsContext from '@store/NewsContext';
import {
	handleAddingNewsFirstTime,
	handleLoadMoreNewsItems,
} from '@store/NewsContext/actions';
import { handleAllClasses } from '@/lib/v1/className';

const DynamicHorizontalPhotoAd1 = dynamic(
	() => import('@components/UI/V1/AddsByGoogle/DisplayAd/Horizontal/PhotoAd1'),
	{ ssr: false }
);

import Wrapper from '@components/UI/V1/Wrapper';
import Container from '@components/UI/V1/News/Container';

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
		handleAddingNewsFirstTime({ dispatch, news, newsType: 'ALL' });
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
						<Container
							isLoadingSkeleton={isLoadingSkeleton}
							newsItem={item}
							detailsType='description'
							modalOnClick
							className={classes['news-container']}
						/>
					</Wrapper>
				))} */}
			{isLoadingSkeleton && (
				<Wrapper>
					<Container
						isLoadingSkeleton={isLoadingSkeleton}
						// newsItem={{}}
						detailsType='description'
						modalOnClick
						className={classes['news-container']}
					/>
				</Wrapper>
			)}

			{!isLoadingSkeleton &&
				news.length !== 0 &&
				state.news.map((item, index) => {
					return (
						<Fragment key={`Feed-${index}-${item.news_id}`}>
							<Wrapper
								style={{
									padding: '1em',
								}}
							>
								<Container
									newsItem={item}
									detailsType='description'
									modalOnClick
									className={classes['news-container']}
								/>
							</Wrapper>
							{/* <Wrapper> */}
							{false && (index % 2 === 0 || state.news.length === 1) && (
								<DynamicHorizontalPhotoAd1 />
							)}
							{/* </Wrapper> */}
						</Fragment>
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

export default Feed;