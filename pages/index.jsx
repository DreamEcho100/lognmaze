import { useContext, useEffect, useMemo, useState } from 'react';

import { useUserSharedState } from '@store/UserContext';
import { getCookie } from '@lib/v1/cookie';

import Home from '@components/Home';

const HomePage = ({ data }) => {
	const [userState, userDispatch] = useUserSharedState();

	const [isLoading, setIsLoading] = useState(true);

	const newsFetchRouteQuery = data.newsFetchRouteQuery;
	const news = useMemo(
		() =>
			data?.news?.length !== 0
				? data.news.map((obj) => {
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
				  })
				: [],
		data.news
	);

	useEffect(() => {
		if (!isLoading) return;

		if (news.length !== 0) setIsLoading(false);
	}, [news]);

	return (
		<Home
			isLoadingSkeleton={isLoading}
			user={userState.user}
			userExist={userState.userExist}
			news={news}
			newsFetchRouteQuery={newsFetchRouteQuery}
		/>
	);
};

export default HomePage;

export const getServerSideProps = async ({ req, query }) => {
	const fetcher = async (userCookieString, query) => {
		let newsFetchRouteQuery = '';
		if (userCookieString) {
			newsFetchRouteQuery = `/?voter_id=${JSON.parse(userCookieString).id}`;
		}

		const newsResult /*{ status, message, data }*/ = await fetch(
			`${process.env.BACK_END_ROOT_URL}/api/v1/news${newsFetchRouteQuery}`
		)
			.then((response) => response.json())
			.then((result) => result.data)
			.catch((error) => {
				console.error(error);
				return {
					status: 'error',
					message: error.message,
					data: {
						news: [],
						newsFetchRouteQuery,
					},
				};
			});

		if (newsResult?.status === 'error') {
			console.error(newsResult.message);
			return {
				status: 'error',
				message: error.message,
				data: {
					news: [],
					newsFetchRouteQuery,
				},
			};
		}

		return {
			status: 'succuss',
			message: 'succuss',
			data: {
				...newsResult,
				newsFetchRouteQuery,
			},
		};
	};

	const userCookieString = getCookie({
		cookieName: 'user_data',
		cookieString: req.headers.cookie,
	});

	const result = await fetcher(userCookieString, query);

	return {
		props: result,
	};
};
