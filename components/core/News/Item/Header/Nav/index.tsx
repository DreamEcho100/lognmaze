import Link from 'next/link';
import dynamic from 'next/dynamic';

import classes from './index.module.css';
import helpersClasses from '@styles/helpers.module.css';

import { TNewsItemData } from '@coreLib/ts/global';
import { imagesWeservNlLoader } from '@commonLibIndependent/image';

import CustomNextImage from '@commonComponentsDependent/CustomNextImage';
const DynamicCustomDropdown = dynamic(() => import('./CustomDropdown'), {
	ssr: false,
});

interface Props {
	newsItemData: TNewsItemData;
	hideHeaderSettings?: boolean;
	priorityForHeaderImage?: boolean;
}

const NewsItemHeaderNav = ({
	newsItemData,
	hideHeaderSettings,
	priorityForHeaderImage,
}: Props) => {
	return (
		<nav className={classes.nav}>
			<div className={classes.authorInfo}>
				<div className={classes.author_profile_picture_wrapper}>
					{newsItemData.author_profile_picture && (
						<Link
							href={`/users/${newsItemData.author_user_name_id}`}
							prefetch={false}
						>
							<a title={`author ${newsItemData.author_user_name_id} profile`}>
								<CustomNextImage
									src={imagesWeservNlLoader({
										url: newsItemData.author_profile_picture,
										w: 300,
										// h: 300,
									})}
									alt=''
									className={classes.author_profile_picture}
									priority={priorityForHeaderImage}
								/>
							</a>
						</Link>
					)}
				</div>
				<div className={classes.authorFullNameAndNameId}>
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
			</div>

			{/* {!hideHeaderSettings && 
			newsItemData.news_id && (
				<NewsItemNavSettings
					newsItemData={newsItemData}
				/>
			)} */}
			{!hideHeaderSettings && (
				<DynamicCustomDropdown newsItemData={newsItemData} />
			)}
		</nav>
	);
};

export default NewsItemHeaderNav;
