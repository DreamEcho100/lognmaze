import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import classes from './index.module.css';

import { useUserSharedState } from '@store/UserContext';

import CommonNav from './CommonNav/CommonNav';
import TimeAndDate from './TimeAndDate/TimeAndDate';
import LazyLoadImage from '@components/UI/V1/Image/LazyLoad';

const Header = ({
	newsItem,
	isLoadingSkeleton,
	detailsType,
	setShowModal,
	setIsLoadingContent,
	isLoadingContent,
	hideHeaderSettings,
}) => {
	const router = useRouter();

	const [userState, userDispatch] = useUserSharedState();

	const [isDataOwner, setIsDataOwner] = useState(false);

	useEffect(() => {
		if (userState?.user?.user_name_id === newsItem?.author_user_name_id) {
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
				isLoadingSkeleton={isLoadingSkeleton}
				setIsLoadingContent={setIsLoadingContent}
				isLoadingContent={isLoadingContent}
				hideSettings={hideHeaderSettings}
			/>
			<section>
				<TimeAndDate
					setShowModal={setShowModal}
					created_at={newsItem?.created_at}
					updated_at={newsItem?.updated_at}
					isLoadingSkeleton={isLoadingSkeleton}
				/>

				{(isLoadingSkeleton || newsItem?.type === 'article') && (
					<>
						<div className=''>
							{!router.query.slug && newsItem?.type === 'article' ? (
								<Link
									href={`/article/${newsItem?.slug}`}
									prefetch={false}
									passHref
								>
									<a
										title={`${newsItem?.type} | ${newsItem?.title}`}
										className={`${classes.title} ${
											isLoadingSkeleton
												? `${classes.isLoadingSkeleton} skeleton-loading`
												: ''
										}`}
									>
										{detailsType === 'description' ? (
											<h2>{newsItem?.title}</h2>
										) : (
											<h1>{newsItem?.title}</h1>
										)}
									</a>
								</Link>
							) : (
								<h1
									className={`${classes.title} ${
										isLoadingSkeleton
											? `${classes.isLoadingSkeleton} skeleton-loading`
											: ''
									}`}
								>
									{newsItem?.title}
								</h1>
							)}
							<div
								className={`${classes.img_wrapper} ${
									isLoadingSkeleton
										? `${classes.isLoadingSkeleton} skeleton-loading`
										: ''
								}`}
							>
								<LazyLoadImage
									src={newsItem?.image_src}
									alt={newsItem?.image_alt}
									effect='blur'
									onClick={() => {
										if (setShowModal) setShowModal(true);
									}}
								/>
							</div>
							<p
								className={`${classes.tags} ${
									isLoadingSkeleton
										? `${classes.isLoadingSkeleton} skeleton-loading`
										: ''
								}`}
							>
								{newsItem && (
									<>
										<strong>Tags:</strong> {newsItem.tags.join(', ')}
									</>
								)}
							</p>
						</div>
					</>
				)}
			</section>
		</header>
	);
};

export default Header;
