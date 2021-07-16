import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import Image from 'next/image';

import classes from './Header.module.css';

import { dateToHumanReadableDate } from '../../../../../lib/v1/time';

import UserContext from '@/store/UserContext';

import Settings from './Settings/Settings';

const Header = ({ data, setData, setCloseModal }) => {
	const router = useRouter();

	const { user, ...UserCxt } = useContext(UserContext);

	const [isDataOwner, setIsDataOwner] = useState(false);

	useEffect(() => {
		if (user && user.user_name_id === data.author_user_name_id) {
			setIsDataOwner(true);
		} else if (isDataOwner) {
			setIsDataOwner(false);
		}
	}, [user]);

	return (
		<header>
			<nav className={classes.nav}>
				<Link href={`/profile/${data.author_user_name_id}`}>
					<a
						target='_blank'
						target='_blank'
						className={classes.author_profile_link}
						rel='noopener noreferrer'
					>
						<img
							src={data.author_profile_picture}
							alt=''
							className={classes.author_profile_picture}
							loading='lazy'
						/>
						<p className={classes.author_user_name_id}>
							<strong>{data.author_user_name_id}</strong>
						</p>
					</a>
				</Link>
				<Settings isDataOwner={isDataOwner} data={data} setData={setData} />
			</nav>
			{data.type === 'article' && (
				<section
					onClick={() => {
						if (setCloseModal) setCloseModal(false);
					}}
				>
					<div className=''>
						<p>
							Created At:{' '}
							{dateToHumanReadableDate(data.created_at, {
								locale: 'en-us',
								format: { day: 'numeric', month: 'long', year: 'numeric' },
							})}
						</p>
						{data.updated_on !== data.created_at ? (
							<p>
								Updated On:{' '}
								{dateToHumanReadableDate(data.updated_on, {
									locale: 'en-us',
									format: { day: 'numeric', month: 'long', year: 'numeric' },
								})}
							</p>
						) : null}
					</div>
					<div className=''>
						{!router.query.slug && data.type === 'article' ? (
							<Link href={`/article/${data.slug}`}>
								<a target='_blank' rel='noopener noreferrer'>
									<h1>{data.title}</h1>
								</a>
							</Link>
						) : (
							<h1>{data.title}</h1>
						)}
						<img
							src={data.image}
							alt=''
							style={{ width: '100%' }}
							loading='lazy'
						/>
						<p>
							<strong>Tags:</strong> {data.tags.join(', ')}
						</p>
					</div>
				</section>
			)}

			{data.type === 'post' && (
				<section>
					<div className=''>
						<p>
							Created At:{' '}
							{dateToHumanReadableDate(data.created_at, {
								locale: 'en-us',
								format: { day: 'numeric', month: 'long', year: 'numeric' },
							})}
						</p>
						{data.updated_on !== data.created_at ? (
							<p>
								Updated On:{' '}
								{dateToHumanReadableDate(data.updated_on, {
									locale: 'en-us',
									format: { day: 'numeric', month: 'long', year: 'numeric' },
								})}
							</p>
						) : null}
					</div>
				</section>
			)}
		</header>
	);
};

export default Header;
