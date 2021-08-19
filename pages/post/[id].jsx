import dynamic from 'next/dynamic';

const DynamicOneNewsContent = dynamic(() =>
	import('@components/OneNewsContent')
);

const PostPage = ({ data }) => {
	return <DynamicOneNewsContent data={data} />;
};

export default PostPage;

export const getServerSideProps = async ({ query }) => {
	const result = await fetch(
		`${process.env.BACK_END_ROOT_URL}/api/v1/news/posts/post/${query.id}`
	)
		.then((response) => response.json())
		.catch((error) => ({ status: 'error', message: error.message, data: {} }));

	if (
		!result.status ||
		!result.data ||
		(result.status && result.status === 'error')
	) {
		return { props: { data: {} } };
	}

	return {
		props: {
			data: result.data,
		},
	};
};
