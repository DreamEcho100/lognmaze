import Head from 'next/head';

import Section1 from '@components/Home/Section1';
import { useEffect } from 'react';

const Home = ({
	dynamicComponentReady = true,
	setDynamicComponentReady,
	isLoading,
	/*user,*/ userExist = false,
	news,
	newsFetchRouteQuery,
}) => {
	useEffect(() => {
		if (!dynamicComponentReady && setDynamicComponentReady) {
			setDynamicComponentReady(true);
		}
	}, []);

	if (!dynamicComponentReady) {
		return <p>Loading...</p>;
	}

	return (
		<main className='main'>
			<Head>
				<meta name='robots' content='index,follow' />
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
