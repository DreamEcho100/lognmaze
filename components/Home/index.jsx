import Head from 'next/head';
// import classes from './index.module.css';

// import Hero from '@components/Home/Hero/Hero';
import Section1 from '@components/Home/Section1';

const Home = ({ /*user,*/ userExist = false, news, newsFetchRouteQuery }) => {
	return (
		<main className='main'>
			<Head>
				<meta name="robots" content="index,follow" />
				<title>Home | LogNMaze</title>
			</Head>
			{/* <Hero user={user} /> */ ''}
			<Section1
				news={news}
				userExist={userExist}
				newsFetchRouteQuery={newsFetchRouteQuery}
			/>
		</main>
	);
};

export default Home;
