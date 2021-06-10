import Post from '@/components/Posts/Post/Post';

const PostPage = ({ data }) => {
	return <Post data={data} />;
};

export const getStaticPaths = async () => {
	const response = await fetch(
		`${process.env.BACK_END_ROOT_URL}/api/v1/user/posts/get-all-posts`
	);
	const { status, message, data } = await response.json();

	console.log(data);

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
		`${process.env.BACK_END_ROOT_URL}/api/v1/users/posts/${slug}`
	);

	const { status, message, data } = await response.json();

	return { props: { data }, revalidate: 6000 };
};

export default PostPage;
