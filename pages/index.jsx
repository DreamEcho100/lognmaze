import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import UserContext from '@store/UserContext';

const DynamicHome = dynamic(() => import('@components/Home'));
// import Home from '@components/Home';

const HomePage = () => {
	const router = useRouter();

	const { state: userState } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(true);
	const [newsFetchRouteQuery, setNewsFetchRouteQuery] = useState('');
	const [news, setNews] = useState([]);

	useEffect(async () => {
		if (userState.isVerifyingUserLoading) return;

		let linkQuery = '';
		if (userState.userExist) {
			linkQuery = `/?voter_id=${userState.user.id}`;
			setNewsFetchRouteQuery(linkQuery);
		}

		if (news.length === 0) {
			const news = await fetch(`api/v1/news${newsFetchRouteQuery}`) // ${process.env.BACK_END_ROOT_URL}/
				.then((response) => response.json())
				.then(({ status, message, data }) => {
					if (!status || (status && status === 'error')) {
						console.error(message);
						return;
					}
					const formattedData = data.news.map((obj) => {
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
				})
				.catch((error) => {
					console.error(error);
					return {
						status: 'error',
						message: error.message,
						data: [],
					};
				});
			setIsLoading(false);
		}
	}, [userState.isVerifyingUserLoading /*, userState.userExist*/]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<DynamicHome
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
				// isAuthorized: false,
				// visitorIdentity: GUEST,
			};
		});

	return {
		props: {
			news,
			// user: data.user ? data.user : {},
			// posts: data.posts ? data.posts : [],
		}, // will be passed to the page component as props
	};
};
*/
