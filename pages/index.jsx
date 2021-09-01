import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import UserContext from '@store/UserContext';

import Home from '@components/Home';

const HomePage = () => {
	const router = useRouter();

	const { state: userState } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(true);
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

				const { status, message, data } = await fetch(
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

				setIsLoading(false);
			})();
		}
	}, [userState.isVerifyingUserLoading]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<Home
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
