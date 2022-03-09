// import { useCallback, useEffect } from 'react';
import Head from 'next/head';

// import { useNewsSharedState } from '@store/NewsContext';

import Section1 from '@components/Home/Section1';

const Home = ({
	isLoadingSkeleton,
	userExist = false,
	// news,
	newsFetchRouteQuery,
}) => {
	// const [newsState, newsDispatch] = useNewsSharedState();

	// useSetNewsContextStore

	// const init = useCallback(
	// 	(news, newsDispatch, newsFetchRouteQuery) => {
	// 		handleAddingNewsFirstTime({
	// 			newsDispatch,
	// 			news,
	// 			newsType: 'ALL',
	// 			newsFetchRouteQuery,
	// 		});
	// 	},
	// 	[news, newsDispatch, newsFetchRouteQuery]
	// );

	// useEffect(() => init(news, newsDispatch, newsFetchRouteQuery), [init]);

	// init(news, newsDispatch, newsFetchRouteQuery);

	return (
		<main className='main'>
			<Head>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'http://schema.org',
							'@type': 'Organization',
							name: 'LogNMaze',
							legalName: 'LogNMaze',
							url: 'https://lognmaze.com',
							logo: 'https://lognmaze.com/favicon.ico',
							foundingDate: '2021',
							founders: [
								{
									'@type': 'Person',
									name: 'Mazen Mohamed',
								},
							],
							address: {
								'@type': 'PostalAddress',
								// streetAddress: '',
								// addressLocality: '',
								addressRegion: 'Cairo',
								postalCode: '11849',
								addressCountry: 'Egypt',
							},
							contactPoint: {
								'@type': 'ContactPoint',
								contactType: 'customer support',
								telephone: '[+201-148-744-881]',
								email: 'lognmaze@gmail.com',
							},
							// sameAs: [
							// 	'http://www.freebase.com/m/0_h96pq',
							// 	'http://www.facebook.com/elitestrategies',
							// 	'http://www.twitter.com/delraybeachseo',
							// 	'http://pinterest.com/elitestrategies/',
							// 	'http://elitestrategies.tumblr.com/',
							// 	'http://www.linkedin.com/company/elite-strategies',
							// 	'https://plus.google.com/106661773120082093538',
							// ],
						}),
					}}
				/>
			</Head>
			<Section1
				// news={newsState.news}
				isLoadingSkeleton={isLoadingSkeleton}
				userExist={userExist}
				newsFetchRouteQuery={newsFetchRouteQuery}
			/>
		</main>
	);
};

export default Home;
