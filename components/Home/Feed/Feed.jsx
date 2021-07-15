import Container from '@/components/UI/V1/News/Container/Container';

import classes from './Feed.module.css';

const Feed = ({ news = [] }) => {
	// console.log('news', news);

	return (
		<section>
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
