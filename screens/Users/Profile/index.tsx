import { useEffect } from 'react';

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
	// const [newsDataState, newsDataDispatch] = useNewsSharedState();

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
		<main className={helpersClasses.main}>
			<SectionWrapper className={classes.userProfileHeroSectionWrapper}>
				<UserProfileHero />
			</SectionWrapper>
			<div className={classes.mainContent}>
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
	);
};

export default UserProfileScreen;
