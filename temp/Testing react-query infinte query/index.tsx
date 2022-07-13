import pgActions from '@coreLib/db/pg/actions';
import networkReqArgs from '@coreLib/networkReqArgs';
import { TNewsData } from '@coreLib/ts/global';
import HomeScreen from '@screens/Home';
import {
	ISetNewsContextStoreProps,
	setNewsContextStore,
} from '@store/NewsContext';
import type { GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';

type TNewsDataProps = { news: TNewsData; hit_news_items_limit: boolean };

const InfiniteQueryTest = (newsData: TNewsDataProps) => {
	const [isEnabled, setIsEnabled] = useState(true);

	useEffect(() => setIsEnabled(false), []);

	return useInfiniteQuery<TNewsDataProps, Error>(
		'infinite-blogs-test',
		({ pageParam = 0, ..._p }: QueryFunctionContext) => {
			const queries = {
				newsCreatedBefore: pageParam,
			};

			if (!queries.newsCreatedBefore) delete queries.newsCreatedBefore;

			// pageParam.
			const { requestInfo, requestInit } = networkReqArgs._app.news.get({
				urlOptions: {
					queries,
				},
			});

			return fetch(requestInfo, requestInit).then((response) =>
				response.json()
			);
		},
		{
			initialData: {
				pages: [newsData],
				pageParams: [
					new Date(
						newsData.news[newsData.news.length - 1].created_at
					).toUTCString(),
				],
			},
			getNextPageParam: (newsArr) =>
				new Date(
					newsArr.news[newsArr.news.length - 1].created_at
				).toUTCString(),
			enabled: isEnabled,
			keepPreviousData: true,
			staleTime: Infinity,
		}
	);
};

export type THomePageProps =
	| {
			status: 'success';
			newsData: { news: TNewsData; hit_news_items_limit: boolean };
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  }
	| {
			status: 'error';
			errMsg: string;
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  };

const HomePage: NextPage<THomePageProps> = (props) => {
	if (props.status === 'error') {
		return <HomeScreen {...props} />;
	}

	const {
		fetchNextPage,
		fetchPreviousPage,
		hasNextPage,
		hasPreviousPage,
		isFetchingNextPage,
		isFetchingPreviousPage,
		data,
		...result
	} = InfiniteQueryTest(props.newsData);
	const hit_news_items_limit = !data
		? false
		: data.pages[data.pages.length - 1].hit_news_items_limit;
	console.log('data', data);
	console.log('hit_news_items_limit', hit_news_items_limit);

	const { newsData } = props;

	const newsExtra: ISetNewsContextStoreProps['data']['newsExtra'] = {};
	const actions: ISetNewsContextStoreProps['actions'] = {
		items: {},
	};

	newsData.news.forEach((item, index) => {
		if (index === 0) {
			actions.items[item.news_id] = {
				priorityForHeaderImage: true,
			};
		}

		newsExtra[item.news_id] = {
			hit_comments_limit: false,
			newsItemDetailsType: 'description',
			newsItemModelDetailsType: 'content',
		};
	});

	const { NewsContextSharedProvider } = setNewsContextStore({
		data: {
			news: newsData.news,
			newsExtra,
			hit_news_items_limit: !!newsData.hit_news_items_limit,
		},
		actions,
	});

	return (
		<NewsContextSharedProvider>
			<br />
			<br />
			<br />
			<button
				onClick={() =>
					!hit_news_items_limit &&
					fetchNextPage({
						// pageParam: {  }
					})
				}
				disabled={hit_news_items_limit}
			>
				Test
			</button>
			<HomeScreen />
		</NewsContextSharedProvider>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	try {
		const profileData = {} as {
			newsData: { news: TNewsData; hit_news_items_limit: boolean };
		};

		profileData.newsData = await pgActions.news.get();

		profileData.newsData.news.forEach((item) => {
			item.updated_at = item.updated_at.toString();
			item.created_at = item.created_at.toString();
		});

		return {
			props: {
				...profileData,
				status: 'success',
				date: new Date().toISOString(),
			},
			revalidate: 60 * 5,
		};
	} catch (err) {
		return {
			props: {
				status: 'error',
				errMsg:
					err instanceof Error
						? err.message
						: 'Ops, We&apos;re facing some technical problems \u{1F62D}, please try again later!',
				date: new Date().toISOString(),
			},
			revalidate: 60 * 5,
		};
	}
};

export default HomePage;
