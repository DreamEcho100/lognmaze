import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// import classes from './Header.module.css';

import { dateToHumanReadableDate } from '@lib/v1/time';

import UserContext from '@store/UserContext';
import CommonNav from './CommonNav/CommonNav';
import TimeAndDate from './TimeAndDate/TimeAndDate';
import Image from '@components/UI/V1/Image';

const Header = ({
	newsItem,
	setData,
	setShowModal,
	setIsLoadingContent,
	isLoadingContent,
	hideHeaderSettings,
}) => {
	const router = useRouter();

	const { user, ...UserCxt } = useContext(UserContext);

	const [isDataOwner, setIsDataOwner] = useState(false);

	useEffect(() => {
		if (user && user.user_name_id === newsItem.author_user_name_id) {
			setIsDataOwner(true);
		} else if (isDataOwner) {
			setIsDataOwner(false);
		}
	}, [user]);

	return (
		<header>
			<CommonNav
				isDataOwner={isDataOwner}
				newsItem={newsItem}
				setData={setData}
				setIsLoadingContent={setIsLoadingContent}
				isLoadingContent={isLoadingContent}
				hideSettings={hideHeaderSettings}
			/>
			{newsItem.type === 'article' && (
				<section>
					<TimeAndDate
						setShowModal={setShowModal}
						created_at={newsItem.created_at}
						updated_on={newsItem.updated_on}
					/>
					<div className=''>
						{!router.query.slug && newsItem.type === 'article' ? (
							<Link href={`/article/${newsItem.slug}`}>
								<a
								// target='_blank' rel='noopener noreferrer'
								>
									<h1>{newsItem.title}</h1>
								</a>
							</Link>
						) : (
							<h1>{newsItem.title}</h1>
						)}
						<Image
							src={newsItem.image}
							alt=''
							style={{ width: '100%' }}
							loading='lazy'
							onClick={() => {
								if (setShowModal) setShowModal(true);
							}}
						/>
						<p>
							<strong>Tags:</strong> {newsItem.tags.join(', ')}
						</p>
					</div>
				</section>
			)}

			{newsItem.type === 'post' && (
				<section>
					<TimeAndDate
						setShowModal={setShowModal}
						created_at={newsItem.created_at}
						updated_on={newsItem.updated_on}
					/>
				</section>
			)}
		</header>
	);
};

export default Header;
