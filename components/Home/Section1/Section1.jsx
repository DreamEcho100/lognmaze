import Feed from '@components/UI/V1/News/Feed/Feed';

import classes from './Section1.module.css';

const Section1 = ({ news = [] }) => {
	return (
		<section className={classes.feed}>
			<Feed news={news} />
		</section>
	);
};

export default Section1;
