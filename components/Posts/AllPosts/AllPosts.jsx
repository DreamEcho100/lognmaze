import React from 'react';
import Head from 'next/head';

import classes from './AllPosts.module.css';

import PostContainer from '../../UI/V1/posts/PostContainer/PostContainer';

const AllPosts = ({ data }) => {
	return (
		<>
			{data.map((item, index) => (
				<PostContainer data={item} key={index} />
			))}
		</>
	);
};

export default AllPosts;
