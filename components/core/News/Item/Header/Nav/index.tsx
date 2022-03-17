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
			<Link
				href={`/users/${newsItemData.author_user_name_id}`}
				prefetch={false}
				passHref
			>
				<a
					title={`author ${newsItemData.author_user_name_id} profile`}
					className={classes.author_profile_link}
				>
					<div className={classes.author_profile_picture_wrapper}>
						{newsItemData.author_profile_picture && (
							<CustomNextImage
								src={newsItemData.author_profile_picture}
								alt=''
								className={classes.author_profile_picture}
							/>
						)}
					</div>
					<p className={classes.author_user_name_id}>
						<span className={helpersClasses.fontWeightBold}>
							{newsItemData.author_user_name_id}
						</span>
					</p>
				</a>
			</Link>

			{/* {!hideHeaderSettings && newsItemData.news_id && (
				<NewsItemNavSettings
					newsItemData={newsItemData}
				/>
			)} */}
		</nav>
	);
};

export default NewsItemHeaderNav;
