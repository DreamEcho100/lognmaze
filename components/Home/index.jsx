import Head from 'next/head';
// import classes from './index.module.css';

// import Hero from '@components/Home/Hero/Hero';
import Section1 from '@components/Home/Section1';

const Home = ({ user, userExist = false, news }) => {
	return (
		<main className='main'>
			<Head>
				<title>Home | LogNMaze</title>
			</Head>
			{/* <Hero user={user} /> */ ''}
			<Section1 news={news} userExist={userExist} />
		</main>
	);
};

export default Home;