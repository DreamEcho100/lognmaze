import Link from 'next/link';

import classes from './CommonNav.module.css';

import Settings from './Settings/Settings';
import LazyLoadImage from '@components/UI/V1/Image/LazyLoad';

const CommonNav = ({
	isDataOwner,
	newsItem,
	isLoadingSkeleton,
	setIsLoadingContent,
	isLoadingContent,
	hideSettings,
}) => (
	<nav className={classes.nav}>
		<Link
			href={`/profile/${newsItem?.author_user_name_id}`}
			prefetch={false}
			passHref
		>
			<a
				disabled={isLoadingSkeleton}
				title={`author ${newsItem?.author_user_name_id} profile`}
				className={`${classes.author_profile_link} ${
					isLoadingSkeleton ? classes.isLoadingSkeleton : ''
				}`}
			>
				<div
					className={`${classes.author_profile_picture_wrapper} ${
						isLoadingSkeleton
							? `${classes.isLoadingSkeleton} skeleton-loading`
							: ''
					}`}
				>
					<LazyLoadImage
						src={newsItem?.author_profile_picture}
						alt=''
						className={classes.author_profile_picture}
						effect='blur'
					/>
				</div>
				<p
					className={`${classes.author_user_name_id} ${
						isLoadingSkeleton
							? `${classes.isLoadingSkeleton} skeleton-loading`
							: ''
					}`}
				>
					<strong>{newsItem?.author_user_name_id}</strong>
				</p>
			</a>
		</Link>

		{(isLoadingSkeleton || (!hideSettings && newsItem.news_id)) && (
			<Settings
				isDataOwner={isDataOwner}
				newsItem={newsItem}
				setIsLoadingContent={setIsLoadingContent}
				isLoadingContent={isLoadingContent}
				isLoadingSkeleton={isLoadingSkeleton}
			/>
		)}
	</nav>
);

export default CommonNav;
