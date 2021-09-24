import { useContext, useEffect } from 'react';

import classes from './Feed.module.css';

import NewsContext from '@store/NewsContext';
import { handleLoadMoreNewsItems } from '@store/NewsContext/actions';
import { handleAllClasses } from '@/lib/v1/className';

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
		const AddNews = () => {
			if (news.length !== 0) {
				dispatch({
					type: types.INIT_STATE,
					payload: { news, newsType: types.ALL },
				});
			}
		};

		AddNews();
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
			{isLoadingSkeleton &&
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
				))}

			{!isLoadingSkeleton &&
				news.length !== 0 &&
				state.news.map((item, index) => (
					<Wrapper
						key={`Feed-${index}-${item.news_id}`}
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
				))}
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
