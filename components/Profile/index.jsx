import dynamic from 'next/dynamic';
import Head from 'next/head';

import classes from './index.module.css';

import { dateToHumanReadableDate } from '@lib/v1/time';
import { NewsContextProvider } from '@store/NewsContext';

const DynamicCreateNewsButton = dynamic(() =>
	import('./CreateNewsButton/CreateNewsButton')
);

import Wrapper from '@components/UI/V1/Wrapper';
import Hero from './Hero';
import Feed from '@components/UI/V1/News/Feed/Feed';
const DynamicSensitiveDataAccordion = dynamic(() =>
	import('./SensitiveDataAccordion')
);

import BioSection from './BioSection';

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const Profile = ({
	userData = {},
	visitorIdentity = GUEST,
	news = [],
	newsFetchRouteQuery,
}) => {
	if (!userData.id) {
		return (
			<div className=''>
				<p>No User found!</p>
			</div>
		);
	}

	return (
		<NewsContextProvider>
			<main className={`${classes.profile} main`}>
				<Head>
					<meta property='og:locale' content='en_US' />
					<meta property='og:type' content='profile' />
					<meta property='profile:first_name' content={userData.first_name} />
					<meta property='profile:last_name' content={userData.last_name} />
					<meta property='profile:username' content={userData.user_name_id} />
					<meta property='profile:gender' content={userData.gender} />
					<meta
						property='og:title'
						content={`${userData.user_name_id} | LogNMaze`}
					/>
					<meta
						property='og:url'
						content={`https://lognmaze.com/profile/${userData.user_name_id}`}
					/>
					<meta
						name='twitter:url'
						content={`https://lognmaze.com/profile/${userData.user_name_id}`}
					/>

					{userData?.profile_picture?.length !== 0 ? (
						<>
							<meta property='og:image' content={userData.profile_picture} />
							<meta property='og:image:width' content='250' />
							<meta property='og:image:height' content='250' />
							<meta
								property='og:image:alt'
								content={`${userData.user_name_id} profile picture`}
							/>
							<meta name='twitter:image' content={userData.profile_picture} />
						</>
					) : (
						''
					)}

					{userData.bio && userData.bio.length > 25 ? (
						<>
							<meta
								property='og:description'
								content={userData.bio.slice(1, 150)}
							/>
							<meta name='description' content={userData.bio.slice(1, 150)} />
							<meta
								name='twitter:description'
								content={userData.bio.slice(1, 150)}
							/>
						</>
					) : (
						''
					)}
					<meta
						property='og:url'
						content={`https://lognmaze.com/profile/${userData.user_name_id}`}
					/>
					<meta
						name='twitter:url'
						content={`https://lognmaze.com/profile/${userData.user_name_id}`}
					/>
					<meta
						name='twitter:title'
						content={`${userData.user_name_id} | LogNMaze`}
					/>

					<meta
						property='og:title'
						content={`${userData.user_name_id} | LogNMaze`}
					/>
					<title>{userData.user_name_id} | LogNMaze</title>
				</Head>
				<Hero userData={userData} visitorIdentity={visitorIdentity} />
				<section className={classes['main-section']}>
					<section className={classes['section-1']}>
						{news.length !== 0 && (
							<Feed news={news} newsFetchRouteQuery={newsFetchRouteQuery} />
						)}
						<Wrapper>
							<time>
								<span>
									<small>
										<strong>Account Created At:</strong>{' '}
										<em>
											{
												dateToHumanReadableDate(userData.created_at, {
													withTime: true,
												}).dateAndTimeString
											}
										</em>
									</small>
								</span>
							</time>
						</Wrapper>
					</section>
					<section className={classes['section-2']}>
						<Wrapper>
							{visitorIdentity === OWNER && <DynamicCreateNewsButton />}

							{visitorIdentity === OWNER && (
								<DynamicSensitiveDataAccordion userData={userData} />
							)}
							<BioSection
								bio={userData.bio}
								visitorIdentity={visitorIdentity}
							/>
						</Wrapper>
					</section>
				</section>
			</main>
		</NewsContextProvider>
	);
};

export default Profile;
