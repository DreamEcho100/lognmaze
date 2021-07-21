import Container from '@components/UI/V1/News/Container/Container';

import classes from './Feed.module.css';

const Feed = ({ news = [] }) => {
	return (
		<section className={classes.feed}>
			{news.map((item) =>
				Object.keys.length !== 0 ? (
					<Container
						key={item.news_id}
						data={item}
						detailsType='description'
						ModalOnClick={true}
					/>
				) : null
			)}
		</section>
	);
};

export default Feed;
