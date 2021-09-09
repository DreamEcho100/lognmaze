import { useContext, useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

import UserContext from '@store/UserContext';

// const DynamicHome = dynamic(() => import('@components/Home'));
import Home from '@components/Home';

const HomePage = () => {
	const { state: userState } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(true);
	// const [dynamicComponentReady, setDynamicComponentReady] = useState(false);
	const [newsFetchRouteQuery, setNewsFetchRouteQuery] = useState('');
	const [news, setNews] = useState([]);

	useEffect(() => {
		if (news.length === 0) {
			(async () => {
				if (userState.isVerifyingUserLoading) return;

				let linkQuery = '';
				if (userState.userExist) {
					linkQuery = `/?voter_id=${userState.user.id}`;
					setNewsFetchRouteQuery(linkQuery);
				}

				const newsResult /*{ status, message, data }*/ = await fetch(
					`/api/v1/news${linkQuery}`
				)
					.then((response) => response.json())
					.catch((error) => {
						console.error(error);
						return {
							status: 'error',
							message: error.message,
							data: [],
						};
					});

				if (newsResult?.status === 'error') {
					console.error(newsResult.message);
					return;
				}
				const formattedData = newsResult.data.news.map((obj) => {
					const formattedItem = {};
					let itemA;
					for (itemA in obj) {
						if (itemA !== 'type_data') {
							formattedItem[itemA] = obj[itemA];
						} else {
							let itemB;
							for (itemB in obj['type_data']) {
								formattedItem[itemB] = obj.type_data[itemB];
							}
						}
					}

					return formattedItem;
				});

				setNews(formattedData);

				setIsLoading(false);
			})();
		}
	}, [userState.isVerifyingUserLoading]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<Home
			// DynamicHome
			// dynamicComponentReady={dynamicComponentReady}
			// setDynamicComponentReady={setDynamicComponentReady}
			// isLoading={isLoading}
			user={userState.user}
			userExist={userState.userExist}
			news={news}
			newsFetchRouteQuery={newsFetchRouteQuery}
		/>
	);
};

export default HomePage;

/*export const getServerSideProps = async () => {
	const news = await fetch(`${process.env.BACK_END_ROOT_URL}/api/v1/news`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.catch((error) => {
			console.error(error);
			return {
				status: 'error',
				message: error.message,
				data: [],
			};
		});

	return {
		props: {
			news,
	};
};
*/
