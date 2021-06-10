import React /*, { useEffect, useState }*/ from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// import classes from './PostHeader.module.css';

const PostHeader = ({ author, post }) => {
	const router = useRouter();

	return (
		<header>
			<div className=''>
				<Image
					src={
						author.profile_picture
							? author.profile_picture
							: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa3%2F28%2F00%2Fa3280086331589746635e698769c48a2.gif&f=1&nofb=1'
					}
					alt=''
					width={60}
					height={60}
					// layout='responsive'
				/>
				<Link href={`/profile/${author.user_name_id}`}>
					<a target='_blank' target='_blank' rel='noopener noreferrer'>
						{author.first_name} {author.last_name}
					</a>
				</Link>
				<p>Created At: {post.created_at}</p>
				{post.updated_on !== post.created_at ? (
					<p>Updated On: {post.updated_on}</p>
				) : null}
			</div>
			<div className=''>
				{!router.query.slug ? (
					<Link href={`/posts/${post.slug}`}>
						<a target='_blank' rel='noopener noreferrer'>
							<h1>{post.title}</h1>
						</a>
					</Link>
				) : (
					<h1>{post.title}</h1>
				)}
				<Image
					src={
						author.image
							? author.image
							: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa3%2F28%2F00%2Fa3280086331589746635e698769c48a2.gif&f=1&nofb=1'
					}
					alt=''
					width={60}
					height={30}
					layout='responsive'
				/>
				<p>Tags: {post.tags.join(', ')}</p>
			</div>
		</header>
	);
};

export default PostHeader;
