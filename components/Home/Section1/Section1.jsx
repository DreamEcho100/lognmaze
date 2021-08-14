import classes from './Section1.module.css';

import Feed from '@components/UI/V1/News/Feed/Feed';
import Wrapper from '@components/UI/V1/Wrapper';

const Section1 = ({ news = [] }) => {
	return (
		<main className={classes['main-section']}>
			<Feed news={news} />

			<section className={classes['side-section']}>
				<Wrapper>
					<section>
						<h2>Side Section 1</h2>
					</section>
				</Wrapper>
			</section>
		</main>
	);
};

export default Section1;
