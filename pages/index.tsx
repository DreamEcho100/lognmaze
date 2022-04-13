import pgActions from '@coreLib/db/pg/actions';
import { TNewsData } from '@coreLib/ts/global';
import HomeScreen from '@screens/Home';
import {
	ISetNewsContextStoreProps,
	setNewsContextStore,
} from '@store/NewsContext';
import type { GetStaticProps, NextPage } from 'next';

interface IProps {
	newsData: { news: TNewsData; hit_news_items_limit: boolean };
}

const HomePage: NextPage<IProps> = ({ newsData }) => {
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
			<HomeScreen />
		</NewsContextSharedProvider>
	);
};

export const getStaticProps: GetStaticProps = async () => {
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
			date: new Date().toISOString(),
		},
		revalidate: 60 * 5,
	};
};

export default HomePage;
