import Container from '@components/UI/V1/News/Container/Container';

import classes from './Feed.module.css';

import NewsContextTest from '@store/NewsContextTest';
import { NewsContextProvider } from '@store/NewsContext';
import { handleAllClasses } from '../../utils/index';
import { useContext, useEffect } from 'react';

const Feed = ({
	defaultClasses = 'feed',
	extraClasses = '',
	className = '',
	news = [],
	...props
}) => {
	const { state, dispatch, types } = useContext(NewsContextTest);

	useEffect(() => {
		dispatch({
			type: types.INIT_STATE,
			payload: { news, newsType: types.ALL },
		});
	}, []);

	console.log('state', state);

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
			{state.news.map((item, key) =>
				Object.keys.length !== 0 ? (
					<NewsContextProvider key={item.news_id}>
						<Container
							newsItem={item}
							detailsType='description'
							modalOnClick
							className={classes['news-container']}
						/>
					</NewsContextProvider>
				) : null
			)}
		</section>
	);
};

export default Feed;
