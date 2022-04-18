import pgActions from '@coreLib/db/pg/actions';
import { TNewsData } from '@coreLib/ts/global';
import HomeScreen from '@screens/Home';
import type { GetStaticProps, NextPage } from 'next';

interface IProps {
	newsData: { news: TNewsData; hit_news_items_limit: boolean };
}

const HomePage: NextPage<IProps> = ({ newsData }) => {
	return (
		<>
			{/* <NewsContextSharedProvider> */}
			<HomeScreen newsData={newsData} />
			{/* </NewsContextSharedProvider> */}
		</>
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
