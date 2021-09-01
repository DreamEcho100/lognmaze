import Link from 'next/link';

import classes from './CommonNav.module.css';

import Settings from './Settings/Settings';
import Image from '@components/UI/V1/Image';

const CommonNav = ({
	isDataOwner,
	newsItem,
	setIsLoadingContent,
	isLoadingContent,
	hideSettings,
}) => (
	<nav className={classes.nav}>
		<Link href={`/profile/${newsItem.author_user_name_id}`}>
			<a
				title={`author ${newsItem.author_user_name_id} profile`}
				className={classes.author_profile_link}
			>
				<Image
					src={newsItem.author_profile_picture}
					alt=''
					className={classes.author_profile_picture}
					loading='lazy'
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
