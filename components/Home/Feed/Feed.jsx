import Container from '@/components/UI/V1/News/Container/Container';

import classes from './Feed.module.css';

const Feed = ({ news = [] }) => {
	return (
		<section className={classes.feed}>
			{news.map((item) => (
				<Container
					key={item.news_id}
					data={item}
					detailsType='description'
					ModalOnClick={true}
				/>
			))}
		</section>
	);
};

export default Feed;
