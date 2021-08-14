import Container from '@components/UI/V1/News/Container/Container';

import classes from './Feed.module.css';

import { NewsContextProvider } from '@store/NewsContext';
import { handleAllClasses } from '../../utils/index';

const Feed = ({
	defaultClasses = 'feed',
	extraClasses = '',
	className = '',
	news = [],
	...props
}) => {
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
			{news.map((item, key) =>
				Object.keys.length !== 0 ? (
					<NewsContextProvider key={item.news_id}>
						<Container
							data={item}
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
