import { useContext, useEffect } from 'react';

import classes from './Feed.module.css';

import NewsContext from '@store/NewsContext';
import { handleAllClasses } from '../../utils/index';

import Container from '@components/UI/V1/News/Container';

const Feed = ({
	defaultClasses = 'feed',
	extraClasses = '',
	className = '',
	news = [],
	...props
}) => {
	const { state, dispatch, types } = useContext(NewsContext);

	useEffect(() => {
		dispatch({
			type: types.INIT_STATE,
			payload: { news, newsType: types.ALL },
		});
	}, []);

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
			{state.news.map((item, index) => (
				<Container
					key={`Feed-${index}-${item.news_id}`}
					newsItem={item}
					detailsType='description'
					modalOnClick
					className={classes['news-container']}
				/>
			))}
		</section>
	);
};

export default Feed;
