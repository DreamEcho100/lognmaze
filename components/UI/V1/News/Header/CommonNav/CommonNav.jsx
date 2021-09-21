import Link from 'next/link';

import classes from './CommonNav.module.css';

import Settings from './Settings/Settings';
import LazyLoadImage from '@components/UI/V1/Image/LazyLoad';

const CommonNav = ({
	isDataOwner,
	newsItem,
	setIsLoadingContent,
	isLoadingContent,
	hideSettings,
}) => (
	<nav className={classes.nav}>
		<Link
			href={`/profile/${newsItem.author_user_name_id}`}
			prefetch={false}
			passHref
		>
			<a
				title={`author ${newsItem.author_user_name_id} profile`}
				className={classes.author_profile_link}
			>
				<LazyLoadImage
					src={newsItem.author_profile_picture}
					alt=''
					className={classes.author_profile_picture}
					effect='blur'
				/>
				<p className={classes.author_user_name_id}>
					<strong>{newsItem.author_user_name_id}</strong>
				</p>
			</a>
		</Link>
		{!hideSettings && newsItem.news_id && (
			<Settings
				isDataOwner={isDataOwner}
				newsItem={newsItem}
				setIsLoadingContent={setIsLoadingContent}
				isLoadingContent={isLoadingContent}
			/>
		)}
	</nav>
);

export default CommonNav;
