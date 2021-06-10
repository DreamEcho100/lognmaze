import React from 'react';
import Head from 'next/head';

import classes from './AllPosts.module.css';

import PostHeader from '../../UI/V1/posts/PostHeader/PostHeader';
import PostDetails from '../../UI/V1/posts/PostDetails/PostDetails';

const AllPosts = ({ data }) => {
	return (
		<>
			{data.map(({ author, post }, index) => (
				<article key={index}>
					<PostHeader author={{ ...author }} post={post} />
					<PostDetails post={post} />
				</article>
			))}
		</>
	);
};

export default AllPosts;
