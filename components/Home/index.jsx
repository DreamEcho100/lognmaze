// import classes from './index.module.css';

import Hero from '@components/Home/Hero/Hero';
import Section1 from '@components/Home/Section1/Section1';

const Home = ({ user, news }) => {
	return (
		<main id='main'>
			<Hero user={user} />
			<Section1 news={news} />
		</main>
	);
};

export default Home;
