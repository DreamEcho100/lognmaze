import { useRouter } from 'next/router';

import { useUserSharedState } from '@store/UserContext';

import classes from './index.module.css';
import helpersClasses from '@styles/helpers.module.css';

import SectionWrapper from '@commonComponentsIndependent/SectionWrapper';
import NewsFeed from '@coreComponents/News/Feed';
import ButtonComponent from '@commonComponentsIndependent/Button';
import NewsItemActionButton from '@coreComponents/News/Item/Action/UI/Button';
// import { WebPageJsonLd } from 'next-seo';
// import SEODefaults from 'next-seo.config';

const HomeScreen = () => {
	const router = useRouter();

	const [
		{
			data: { user: userData, token: userToken },
		},
	] = useUserSharedState();

	return (
		<>
			{/* <WebPageJsonLd
				description={SEODefaults.description}
				id="https://www.purpule-fox.io/#corporation"
				lastReviewed='2021-05-26T05:59:02.085Z'
				reviewedBy={{
					type: 'Person',
					name: 'Garmeeh',
				}}
			/> */}
			<main className={helpersClasses.main}>
				<div className={helpersClasses.mainContent}>
					<NewsFeed />
					<div>
						<SectionWrapper className={classes.sectionWrapper}>
							{userData?.id ? (
								<p>Logged in &#x1F60E;</p>
							) : (
								<>
									<p>Not Signed up?</p>
									<div>
										<ButtonComponent
											title='Sign In'
											onClick={() => router.replace('/auth')}
										>
											Sign In
										</ButtonComponent>{' '}
										/{' '}
										<ButtonComponent
											title='Sign Up'
											onClick={() => router.replace('/auth?objective=signup')}
										>
											Sign Up
										</ButtonComponent>
									</div>
								</>
							)}
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

export default HomeScreen;
