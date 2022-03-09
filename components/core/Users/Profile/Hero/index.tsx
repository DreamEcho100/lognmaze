import classes from './index.module.css';

import { useUserSharedState } from 'store/UserContext';
import { useUserProfilePageSharedState } from 'store/ProfilePageContext';
import { VISITOR_PROFILE_OWNER } from '@coreLib/constants';

import CustomNextImage from '@commonComponentsDependent/CustomNextImage';
import SectionWrapper from '@commonComponentsIndependent/SectionWrapper';

type Props = {};

const UserProfileHero = (props: Props) => {
	const [
		{
			data: { user: userData },
		},
	] = useUserSharedState();
	const [{ data: profilePageData }] = useUserProfilePageSharedState();

	const profilePageVisitorStatus = profilePageData?.visitorStatus;

	const profilePageUserData =
		profilePageVisitorStatus === VISITOR_PROFILE_OWNER && userData
			? userData
			: profilePageData?.user;

	if (!profilePageUserData?.id) return <></>;

	return (
		<>
			<div className={classes.profileAndCoverContainer}>
				<div className={classes.coverPhotoOuterContainer}>
					{/* <div className={classes.coverPhotoContainer}> */}
					<div className={classes.coverPhotoInnerContainer}>
						{profilePageUserData?.cover_photo && (
							<CustomNextImage
								src={profilePageUserData.cover_photo}
								alt='cover photo'
								className={classes.coverPhoto}
								priority
							/>
						)}
					</div>
					{/* </div> */}
				</div>
				<div className={classes.profilePictureOuterContainer}>
					{/* <div className={classes.profilePictureContainer}> */}
					<div className={classes.profilePictureInnerContainer}>
						{profilePageUserData?.profile_picture && (
							<CustomNextImage
								src={profilePageUserData.profile_picture}
								alt='profile picture'
								className={classes.profilePicture}
								priority
							/>
						)}
					</div>
					{/* </div> */}
				</div>
			</div>
			<div className={classes.basicData}>
				<p title='user name id'>{profilePageUserData.user_name_id}</p>
				<p title='user name'>
					{profilePageUserData.first_name} {profilePageUserData.last_name}
				</p>
				<p title='gender'>
					{profilePageUserData.gender[0].toUpperCase() +
						profilePageUserData.gender.slice(1)}
				</p>
				<address>
					{profilePageUserData.country_of_resident}
					<br />
					{profilePageUserData.state_of_resident}
					{profilePageUserData?.city_of_resident && (
						<>
							<br /> {profilePageUserData.city_of_resident}
						</>
					)}
				</address>
			</div>
		</>
	);
};

export default UserProfileHero;
