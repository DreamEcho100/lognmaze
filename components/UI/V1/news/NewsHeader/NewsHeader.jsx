import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
// import Image from 'next/image';
import { useRouter } from 'next/router';

import UserContext from '@/store/UserContext';

import Settings from './Settings/Settings';

// import classes from './NewsHeader.module.css';

const NewsHeader = ({ author, news, setNews }) => {
	const router = useRouter();

	const { user, ...UserCxt } = useContext(UserContext);

	const [isNewsOwner, setIsNewsOwner] = useState(false);

	useEffect(() => {
		if (user && user.user_name_id === author.user_name_id) {
			setIsNewsOwner(true);
		} else if (isNewsOwner) {
			setIsNewsOwner(false);
		}
	}, [user]);

	return (
		<header>
			<div className=''>
				<div className=''>
					<Link href={`/profile/${author.user_name_id}`}>
						<a target='_blank' target='_blank' rel='noopener noreferrer'>
							{/* <Image
								src={
									author.profile_picture
										? author.profile_picture
										: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa3%2F28%2F00%2Fa3280086331589746635e698769c48a2.gif&f=1&nofb=1'
								}
								alt=''
								width={60}
								height={60}
								// layout='responsive'
							/> */}
							<img
								src={author.profile_picture}
								alt=''
								style={{ width: '6rem', height: '6rem' }}
								loading='lazy'
							/>
							{author.first_name} {author.last_name}
						</a>
					</Link>
					<Settings
						isNewsOwner={isNewsOwner}
						newsContent={news}
						setNewsContent={setNews}
					/>
				</div>
				<p>Created At: {news.created_at}</p>
				{news.updated_on !== news.created_at ? (
					<p>Updated On: {news.updated_on}</p>
				) : null}
			</div>
			<div className=''>
				{!router.query.slug ? (
					<Link href={`/Newss/News/${news.slug}`}>
						<a target='_blank' rel='noopener noreferrer'>
							<h1>{news.title}</h1>
						</a>
					</Link>
				) : (
					<h1>{news.title}</h1>
				)}
				{/* <Image
					src={
						News.image
							? News.image
							: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fa3%2F28%2F00%2Fa3280086331589746635e698769c48a2.gif&f=1&nofb=1'
					}
					alt=''
					width={60}
					height={30}
					layout='responsive'
				/> */}
				<img src={news.image} alt='' style={{ width: '100%' }} loading='lazy' />
				<p>
					<strong>Tags:</strong> {news.tags.join(', ')}
				</p>
			</div>
		</header>
	);
};

export default NewsHeader;
