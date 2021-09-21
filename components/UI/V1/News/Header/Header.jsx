import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import classes from './index.module.css';

import UserContext from '@store/UserContext';

import CommonNav from './CommonNav/CommonNav';
import TimeAndDate from './TimeAndDate/TimeAndDate';
import LazyLoadImage from '@components/UI/V1/Image/LazyLoad';

const Header = ({
	newsItem,
	detailsType,
	setShowModal,
	setIsLoadingContent,
	isLoadingContent,
	hideHeaderSettings,
}) => {
	const router = useRouter();

	const { state: userState } = useContext(UserContext);

	const [isDataOwner, setIsDataOwner] = useState(false);

	useEffect(() => {
		if (
			userState.user &&
			userState.user.user_name_id === newsItem.author_user_name_id
		) {
			setIsDataOwner(true);
		} else if (isDataOwner) {
			setIsDataOwner(false);
		}
	}, [userState.user]);

	return (
		<header>
			<CommonNav
				isDataOwner={isDataOwner}
				newsItem={newsItem}
				setIsLoadingContent={setIsLoadingContent}
				isLoadingContent={isLoadingContent}
				hideSettings={hideHeaderSettings}
			/>
			{newsItem.type === 'article' && (
				<section>
					<TimeAndDate
						setShowModal={setShowModal}
						created_at={newsItem.created_at}
						updated_at={newsItem.updated_at}
					/>
					<div className=''>
						{!router.query.slug && newsItem.type === 'article' ? (
							<Link
								href={`/article/${newsItem.slug}`}
								prefetch={false}
								passHref
							>
								<a title={`${newsItem.type} | ${newsItem.title}`}>
									{detailsType === 'description' ? (
										<h2>{newsItem.title}</h2>
									) : (
										<h1>{newsItem.title}</h1>
									)}
								</a>
							</Link>
						) : (
							<h1>{newsItem.title}</h1>
						)}
						<LazyLoadImage
							src={newsItem.image_src}
							alt={newsItem.image_alt}
							className={classes.img}
							effect='blur'
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
						updated_at={newsItem.updated_at}
					/>
				</section>
			)}
		</header>
	);
};

export default Header;
