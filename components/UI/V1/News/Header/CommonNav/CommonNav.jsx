import Link from 'next/link';

import classes from './CommonNav.module.css';

import Settings from './Settings/Settings';

const CommonNav = ({ isDataOwner, data, setData, hideSettings }) => (
	<nav className={classes.nav}>
		<Link href={`/profile/${data.author_user_name_id}`}>
			<a
				className={classes.author_profile_link}
				// target='_blank'
				// rel='noopener noreferrer'
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
		{!hideSettings && (
			<Settings isDataOwner={isDataOwner} data={data} setData={setData} />
		)}
	</nav>
);

export default CommonNav;
