import { useEffect, useState } from 'react';

import classes from './AllPosts.module.css';

import Post from './post/Post';

const AllPosts = () => {
	const [posts, setPosts] = useState([]);

	useEffect(async () => {
		await fetch('api/v1/user/posts/get-all-posts')
			.then((response) => response.json())
			.then(({ status, message, data }) => setPosts(data))
			.catch((error) => console.error(error));
	}, []);

	console.log(posts);

	return (
		<>
			{posts.map((post, index) => (
				<Post key={index} post={post} />
			))}
		</>
	);
};

export default AllPosts;
