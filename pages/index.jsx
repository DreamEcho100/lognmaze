import {
	useEffect,
	// useMemo,
	useState,
} from 'react';
import { useRouter } from 'next/router';

// import { NewsContextSharedProvider } from '@store/NewsContext';
import { useSetUserContextStore } from '@store/NewsContext';
import { useUserSharedState } from '@store/UserContext';
import { getCookie } from '@lib/v1/cookie';
import { getNews } from '@lib/v1/pg/news';

import Home from '@components/Home';

const HomePage = (
	{ data: { news, newsFetchRouteQuery } } = {
		data: { news: [], newsFetchRouteQuery: '' },
	}
) => {
	const router = useRouter();

	const [userState, userDispatch] = useUserSharedState();

	const [isLoading, setIsLoading] = useState(false);

	// const newsFetchRouteQuery = newsFetchRouteQuery;
	// const news = useMemo(
	// 	() =>
	// 		Array.isArray(news)
	// 			? news.map((obj) => {
	// 					const formattedItem = {};
	// 					let itemA;
	// 					for (itemA in obj) {
	// 						if (itemA !== 'type_data') {
	// 							formattedItem[itemA] = obj[itemA];
	// 						} else {
	// 							let itemB;
	// 							for (itemB in obj['type_data']) {
	// 								formattedItem[itemB] = obj.type_data[itemB];
	// 							}
	// 						}
	// 					}

	// 					return formattedItem;
	// 			  })
	// 			: [],
	// 	[news]
	// );

	const { NewsContextSharedProvider } =
		// useMemo((news) =>
		useSetUserContextStore({
			news: Array.isArray(news)
				? news.map((obj) => {
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
		});
	// , [news]);

	useEffect(() => {
		if (!router.isReady) return;
		setIsLoading(false);
	}, [router.isReady]);

	return (
		<NewsContextSharedProvider>
			<Home
				isLoadingSkeleton={isLoading}
				user={userState.user}
				userExist={userState.userExist}
				news={news}
				newsFetchRouteQuery={newsFetchRouteQuery}
			/>
		</NewsContextSharedProvider>
	);
};

export default HomePage;

export const getServerSideProps = async ({ req, res, query }) => {
	const fetcher = async (userCookieString, query) => {
		// const newsResult;
		const filters = {};
		let newsFetchRouteQuery = '';

		if (userCookieString) {
			filters.newsVotedByUser = JSON.parse(userCookieString).id;
			newsFetchRouteQuery = `/?newsVotedByUser=${filters.newsVotedByUser}`;
		}

		try {
			const newsResult = await getNews(filters);

			newsResult.news.forEach((item, index) => {
				item.updated_at = '' + item.updated_at;
				item.created_at = '' + item.created_at;
			});

			return {
				status: 'succuss',
				message: 'succuss',
				data: {
					...newsResult,
					newsFetchRouteQuery,
				},
			};
		} catch (error) {
			console.error(error.message);
			return {
				status: 'error',
				message: error.message,
				data: {
					news: [],
					newsFetchRouteQuery,
				},
			};
		}
	};

	const userCookieString = getCookie({
		cookieName: 'user_data',
		cookieString: req.headers.cookie,
	});

	const result = await fetcher(userCookieString, query);

	res.setHeader(
		'Cache-Control',
		'public, s-maxage=60, stale-while-revalidate=60'
	);

	return {
		props: result,
	};
};
