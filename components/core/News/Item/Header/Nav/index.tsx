import Link from 'next/link';

import classes from './index.module.css';
import helpersClasses from '@styles/helpers.module.css';

import { TNewsItemData } from '@coreLib/ts/global';

import CustomNextImage from '@commonComponentsDependent/CustomNextImage';

interface Props {
	newsItemData: TNewsItemData;
}

const NewsItemHeaderNav = ({ newsItemData }: Props) => {
	// hideHeaderSettings

	return (
		<nav className={classes.nav}>
			<div className={classes.author_profile_picture_wrapper}>
				{newsItemData.author_profile_picture && (
					<Link
						href={`/users/${newsItemData.author_user_name_id}`}
						prefetch={false}
					>
						<a title={`author ${newsItemData.author_user_name_id} profile`}>
							<CustomNextImage
								src={newsItemData.author_profile_picture}
								alt=''
								className={classes.author_profile_picture}
							/>
						</a>
					</Link>
				)}
			</div>
			<div className={classes.authorInfo}>
				<p className={classes.author_user_name_id}>
					<Link
						href={`/users/${newsItemData.author_user_name_id}`}
						prefetch={false}
					>
						<a
							title={`author ${newsItemData.author_user_name_id} profile`}
							className={helpersClasses.fontWeightBold}
						>
							{newsItemData.author_user_name_id}
						</a>
					</Link>
				</p>
				<p>
					<em>
						<small>
							{newsItemData.author_first_name} {newsItemData.author_last_name}
						</small>
					</em>
				</p>
			</div>

			{/* {!hideHeaderSettings && newsItemData.news_id && (
				<NewsItemNavSettings
					newsItemData={newsItemData}
				/>
			)} */}
		</nav>
	);
};

export default NewsItemHeaderNav;
