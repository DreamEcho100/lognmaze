import Post from '@/components/Posts/Post/Post';

const PostPage = ({ data }) => {
	return <Post data={data} />;
};

export const getStaticPaths = async () => {
	const response = await fetch(
		`${process.env.BACK_END_ROOT_URL}/api/v1/users/posts/get/all`
	);
	const { status, message, data } = await response.json();

	const paths = data.map((post) => ({
		params: { slug: post.slug },
	}));

	return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
	const {
		params: { slug },
	} = context;

	const response = await fetch(
		`${process.env.BACK_END_ROOT_URL}/api/v1/users/posts/get/${slug}`
	);

	const { status, message, data } = await response.json();

	if (status === 'error' || !data) {
		return { props: { data: {} } };
	}

	return { props: { data }, revalidate: 3600 };
};

export default PostPage;
