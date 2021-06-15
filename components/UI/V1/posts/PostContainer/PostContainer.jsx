import { useEffect, useState } from 'react';

import PostHeader from '../PostHeader/PostHeader';
import PostDetails from '../PostDetails/PostDetails';

const PostContainer = ({ data }) => {
	const [author, setAuthor] = useState(data.author);
	const [post, setPost] = useState(data.post);

	// useEffect(() => { }, [data.author]);

	return (
		<article>
			<PostHeader author={author} post={post} setPost={setPost} />
			<PostDetails post={post} />
		</article>
	);
};

export default PostContainer;
