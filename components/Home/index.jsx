// import { useEffect } from 'react';
import Head from 'next/head';

import Section1 from '@components/Home/Section1';

const Home = ({
	// dynamicComponentReady = true,
	// setDynamicComponentReady,
	// isLoading,
	// user,
	userExist = false,
	news,
	newsFetchRouteQuery,
}) => {
	// useEffect(() => {
	// 	if (!dynamicComponentReady && setDynamicComponentReady) {
	// 		setDynamicComponentReady(true);
	// 	}
	// }, [dynamicComponentReady, setDynamicComponentReady]);

	// if (!dynamicComponentReady && isLoading && setDynamicComponentReady) {
	// 	return <p>Loading...</p>;
	// }

	return (
		<main className='main'>
			<Head>
				<title>
					Home | LogNMaze | Create blogs, articles using Markdown {'&'} share
					them in your social media
				</title>
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
