import Link from 'next/link';

import classes from './CommonNav.module.css';

import Settings from './Settings/Settings';
import Image from '@components/UI/V1/Image';

const CommonNav = ({
	isDataOwner,
	data,
	setData,
	setIsLoadingContent,
	isLoadingContent,
	hideSettings,
}) => (
	<nav className={classes.nav}>
		<Link href={`/profile/${data.author_user_name_id}`}>
			<a
				className={classes.author_profile_link}
				// target='_blank'
				// rel='noopener noreferrer'
			>
				<Image
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
		{!hideSettings && (
			<Settings
				isDataOwner={isDataOwner}
				data={data}
				setData={setData}
				setIsLoadingContent={setIsLoadingContent}
				isLoadingContent={isLoadingContent}
			/>
		)}
	</nav>
);

export default CommonNav;
