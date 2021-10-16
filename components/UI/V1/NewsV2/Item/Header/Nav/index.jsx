import Link from 'next/link';

import classes from './index.module.css';

import NewsItemNavSettings from './Settings';
import LazyLoadImage from '@components/UI/V1/Image/LazyLoad';

const Nav = ({
	isDataOwner,
	newsItemData,
	isLoadingSkeleton,
	hideSettings,
}) => {
	return (
		<nav className={classes.nav}>
			<Link
				href={`/profile/${newsItemData?.author_user_name_id}`}
				prefetch={false}
				passHref
			>
				<a
					disabled={isLoadingSkeleton}
					title={`author ${newsItemData?.author_user_name_id} profile`}
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
							src={newsItemData?.author_profile_picture}
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
						<strong>{newsItemData?.author_user_name_id}</strong>
					</p>
				</a>
			</Link>

			{(isLoadingSkeleton || (!hideSettings && newsItemData.news_id)) && (
				<NewsItemNavSettings
					isDataOwner={isDataOwner}
					newsItemData={newsItemData}
					isLoadingSkeleton={isLoadingSkeleton}
				/>
			)}
		</nav>
	);
};

export default Nav;
