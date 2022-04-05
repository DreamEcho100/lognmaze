import { useEffect } from 'react';
import {
	NextSeo,
	// ProfilePageJsonLd
} from 'next-seo';

import classes from './index.module.css';
import helpersClasses from '@styles/helpers.module.css';

// import {
// 	VISITOR_PROFILE_GUEST,
// 	VISITOR_PROFILE_OWNER,
// } from '@coreLib/constants';
import { VISITOR_PROFILE_OWNER } from '@coreLib/constants';
import { useUserSharedState } from '@store/UserContext';
// import { useNewsSharedState } from '@store/newsContext';
import { useUserProfilePageSharedState } from '@store/ProfilePageContext';
import { setProfilePageVisitorStatus } from '@store/ProfilePageContext/actions';

import UserProfileHero from '@coreComponents/Users/Profile/Hero';
import ProfileBioSection from '@coreComponents/Users/Profile/BioSection';
import SectionWrapper from '@commonComponentsIndependent/SectionWrapper';
import NewsFeed from '@coreComponents/News/Feed';
import NewsItemActionButton from '@coreComponents/News/Item/Action/UI/Button';

interface Props {}

const UserProfileScreen = (Props: Props) => {
	const [
		{
			data: { user: userData, token: userToken },
		},
		// userDispatch,
	] = useUserSharedState();
	const [{ data: profilePageData }, profilePageDispatch] =
		useUserProfilePageSharedState();
	// const [newsDataState, newsDispatch] = useNewsSharedState();

	const profilePageVisitorStatus = profilePageData?.visitorStatus;

	const profilePageUserData =
		profilePageVisitorStatus === VISITOR_PROFILE_OWNER && userData
			? userData
			: profilePageData?.user;

	useEffect(() => {
		setProfilePageVisitorStatus(profilePageDispatch, {
			userData: userData,
			userProfileData: profilePageData.user,
			visitorStatusInitial: profilePageData.visitorStatus,
		});
	}, [
		profilePageData.user,
		profilePageData.visitorStatus,
		profilePageDispatch,
		userData,
	]);

	if (!profilePageUserData || !profilePageVisitorStatus) {
		return (
			<main className={helpersClasses.main}>
				<p>No User found!</p>
			</main>
		);
	}

	return (
		<>
			<NextSeo
				title={`${profilePageUserData.user_name_id} | LogNMaze | ${profilePageUserData.first_name} ${profilePageUserData.last_name}`}
				description={profilePageUserData.bio || 'Bio is not provided yet!'}
				canonical={`https://lognmaze.com/users/${profilePageUserData.user_name_id}`}
				openGraph={{
					title: `${profilePageUserData.user_name_id} | LogNMaze | ${profilePageUserData.first_name} ${profilePageUserData.last_name}`,
					description: profilePageUserData.bio || 'Bio is not provided yet!',
					url: `https://lognmaze.com/users/${profilePageUserData.user_name_id}`,
					type: 'profile',
					profile: {
						firstName: profilePageUserData.first_name,
						lastName: profilePageUserData.last_name,
						username: profilePageUserData.user_name_id,
						gender: profilePageUserData.gender,
					},
					...(() => {
						const images: any[] = [];

						if (profilePageUserData.profile_picture)
							images.push({
								url: profilePageUserData.profile_picture,
								width: 850,
								height: 650,
								alt: 'Profile Picture',
							});

						if (profilePageUserData.cover_photo)
							images.push({
								url: profilePageUserData.cover_photo,
								width: 850,
								height: 650,
								alt: 'Cover Photo',
							});

						return { images };
					})(),
				}}
			/>
			{/* <ProfilePageJsonLd breadcrumb={''} /> */}
			<main className={helpersClasses.main}>
				<SectionWrapper className={classes.userProfileHeroSectionWrapper}>
					<UserProfileHero />
				</SectionWrapper>
				<div className={helpersClasses.mainContent}>
					<NewsFeed
					// newsFetchRouteQuery={{}}
					// priorityForHeaderImage={false}
					/>
					<div>
						<SectionWrapper className={classes.sectionWrapper}>
							<ProfileBioSection bio={profilePageUserData.bio} />
						</SectionWrapper>
						{userData?.id && (
							<SectionWrapper className={classes.sectionWrapper}>
								<NewsItemActionButton
									userToken={userToken}
									actionType={'create'}
									// newsItemData={undefined}
									// newsItemDataType={'blog'}
									userData={userData}
								/>
							</SectionWrapper>
						)}
					</div>
				</div>
			</main>
		</>
	);
};

export default UserProfileScreen;
