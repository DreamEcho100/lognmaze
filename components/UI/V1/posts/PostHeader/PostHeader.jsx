import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import UserContext from '@/store/UserContext';

import Settings from './Settings/Settings';

// import classes from './PostHeader.module.css';

const PostHeader = ({ author, post, setPost }) => {
	const router = useRouter();

	console.log('author', author);

	const { user, ...UserCxt } = useContext(UserContext);

	const [isPostOwner, setIsPostOwner] = useState(false);

	useEffect(() => {
		if (user && user.user_name_id === author.user_name_id) {
			setIsPostOwner(true);
		} else if (isPostOwner) {
			setIsPostOwner(false);
		}
	}, [user]);

	return (
		<header>
			<div className=''>
				<div className=''>
					<Link href={`/profile/${author.user_name_id}`}>
						<a target='_blank' target='_blank' rel='noopener noreferrer'>
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
							{author.first_name} {author.last_name}
						</a>
					</Link>
					<Settings
						isPostOwner={isPostOwner}
						postContent={post}
						setPostContent={setPost}
					/>
				</div>
				<p>Created At: {post.created_at}</p>
				{post.updated_on !== post.created_at ? (
					<p>Updated On: {post.updated_on}</p>
				) : null}
			</div>
			<div className=''>
				{!router.query.slug ? (
					<Link href={`/posts/post/${post.slug}`}>
						<a target='_blank' rel='noopener noreferrer'>
							<h1>{post.title}</h1>
						</a>
					</Link>
				) : (
					<h1>{post.title}</h1>
				)}
				<Image
					src={
						post.image
							? post.image
							: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa3%2F28%2F00%2Fa3280086331589746635e698769c48a2.gif&f=1&nofb=1'
					}
					alt=''
					width={60}
					height={30}
					layout='responsive'
				/>
				<p>
					<strong>Tags:</strong> {post.tags.join(', ')}
				</p>
			</div>
		</header>
	);
};

export default PostHeader;
