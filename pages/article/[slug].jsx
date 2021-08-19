import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DynamicOneNewsContent = dynamic(() =>
	import('@components/OneNewsContent')
);

const ArticlePage = ({ data }) => {
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}

	return <DynamicOneNewsContent data={data} />;
};

export default ArticlePage;

export const getStaticProps = async (context) => {
	const {
		params: { slug },
	} = context;

	const result = await fetch(
		`${process.env.BACK_END_ROOT_URL}/api/v1/news/articles/article/${slug}`
	)
		.then((response) => response.json())
		.catch((error) => ({ status: 'error', message: error.message, data: {} }));

	const { status, message, data } = result;

	if (!status || !data || (status && status === 'error')) {
		return { props: { data: {} } };
	}

	return {
		props: {
			data,
			revalidate: 60,
		},
	};
};

export const getStaticPaths = async () => {
	const result = await fetch(
		`${process.env.BACK_END_ROOT_URL}/api/v1/news/articles/?with_news_article_content=true&with_author_data=true`
	)
		.then((response) => response.json())
		.catch((error) => ({ status: 'error', message: error.message, data: {} }));

	const { status, message, data } = result;

	const paths = data.map((post) => ({
		params: { slug: post.slug },
	}));

	return {
		paths,
		fallback: true,
	};
};
