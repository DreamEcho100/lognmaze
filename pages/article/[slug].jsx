const Article = () => {
	return (
		<section>
			<h1>Slug</h1>
		</section>
	);
};

export default Article;

export const getStaticProps = async (ctx) => {
	return {
		props: {
			data: null,
		},
	};
};

export const getStaticPaths = async () => {
	return {
		paths: [],
		fallback: false,
	};
};
