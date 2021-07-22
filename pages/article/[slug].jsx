import Container from '@components/UI/V1/News/Container/Container';

const Article = ({ data }) => {
	return (
		<section>
			<h1>Slug</h1>
			<Container
				data={data}
				detailsType='content'
				// description
				// ModalOnClick={true}
			/>
		</section>
	);
};

export default Article;

export const getStaticProps = async (context) => {
	const {
		params: { slug },
	} = context;

	const response = await fetch(
		`${process.env.BACK_END_ROOT_URL}/api/v1/news/articles/article/${slug}`
	);

	const { status, message, data } = await response.json();

	if (status === 'error' || !data) {
		return { props: { data: {} } };
	}

	return {
		props: {
			data,
		},
	};
};

export const getStaticPaths = async () => {
	const response = await fetch(
		`${process.env.BACK_END_ROOT_URL}/api/v1/news/articles/?with_news_article_content=true&with_author_data=true`
	);
	const { status, message, data } = await response.json();

	const paths = data.map((post) => ({
		params: { slug: post.slug },
	}));

	return {
		paths,
		fallback: false,
	};
};
