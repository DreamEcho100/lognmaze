import { useRouter } from 'next/router';

import { useUserSharedState } from '@store/UserContext';

import classes from './index.module.css';
import helpersClasses from '@styles/helpers.module.css';

import SectionWrapper from '@commonComponentsIndependent/SectionWrapper';
import NewsFeed from '@coreComponents/News/Feed';
import ButtonComponent from '@commonComponentsIndependent/Button';

const HomeScreen = () => {
	const router = useRouter();

	const [
		{
			data: {
				user: userData,
				// token: userToken
			},
		},
		// userDispatch,
	] = useUserSharedState();

	return (
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
				</div>
			</div>
		</main>
	);
};

export default HomeScreen;
