import React from 'react';
import Head from 'next/head';

import PostContainer from '@/components/UI/V1/posts/PostContainer/PostContainer';

const Post = ({ data }) => {
	if (Object.keys(data).length === 0) {
		return (
			<p>
				No Post Found{' '}
				<div style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}>
					@ّّّّّّّّّّّّّّّ=@ّّّّّّّّّّّّّّّ
				</div>
			</p>
		);
	}

	const { post, author } = data;

	return (
		<article>
			<Head>
				<meta name='description' content={post.description} />
				<meta name='keywords' content={post.tags.join(',')} />
				<meta
					name='copyright'
					content={`Copyright owner: ${author.first_name} ${author.last_name}`}
				/>
				<meta
					name='author'
					content={`${author.first_name} ${author.last_name}`}
				/>
				<title>{post.metaTitle ? post.metaTitle : post.title}</title>
			</Head>
			<PostContainer data={data} />
		</article>
	);
};

export default Post;
