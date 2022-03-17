import classes from './index.module.css';
import helpersClasses from '@styles/helpers.module.css';

// import {
// 	VISITOR_PROFILE_GUEST,
// 	VISITOR_PROFILE_OWNER,
// } from '@coreLib/constants';
import { VISITOR_PROFILE_OWNER } from '@coreLib/constants';
import { useUserSharedState } from '@store/UserContext';
import { useNewsSharedState } from '@store/newsContext';
import { useUserProfilePageSharedState } from '@store/ProfilePageContext';

import UserProfileHero from '@coreComponents/Users/Profile/Hero';
import SectionWrapper from '@commonComponentsIndependent/SectionWrapper';
import NewsFeed from '@coreComponents/News/Feed';

interface Props {}

const UserProfileScreen = (Props: Props) => {
	const [
		{
			data: { user: userData },
		},
		// userDispatch,
	] = useUserSharedState();
	const [{ data: profilePageData }, profilePageDispatch] =
		useUserProfilePageSharedState();
	const [newsDataState, newsDataDispatch] = useNewsSharedState();

	const profilePageVisitorStatus = profilePageData?.visitorStatus;

	const profilePageUserData =
		profilePageVisitorStatus === VISITOR_PROFILE_OWNER && userData
			? userData
			: profilePageData?.user;

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
				<NewsFeed />
				{/* {newsDataState.data?.news && (
						<NewsItem
							newsItemData={newsDataState.data.news[0]}
							newsItemDetailsType='description'
						/>
					)} */}
				{/* <SectionWrapper className={classes.sectionWrapper}>
				</SectionWrapper> */}
				<SectionWrapper className={classes.sectionWrapper}></SectionWrapper>
			</div>
		</main>
	);
};

export default UserProfileScreen;
