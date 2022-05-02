import pgActions from '@coreLib/db/pg/actions';
import { TNewsData } from '@coreLib/ts/global';
import HomeScreen from '@screens/Home';
import {
	ISetNewsContextStoreProps,
	setNewsContextStore,
} from '@store/NewsContext';
import type { GetStaticProps, NextPage } from 'next';

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
