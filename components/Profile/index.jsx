import dynamic from 'next/dynamic';
import Head from 'next/head';

import classes from './index.module.css';

import { XMLCharactersEncoding } from '@lib/v1/regex';
import { dateToHumanReadableDate } from '@lib/v1/time';
import { handleAddingLoadingSkeletonClass } from '@/lib/v1/className';
import { NewsContextProvider } from '@store/NewsContext';
import { useUserSharedState } from '@store/UserContext';

const DynamicCreateNewsButton = dynamic(() =>
	import('./CreateNewsButton/CreateNewsButton')
);

import Wrapper from '@components/UI/V1/Wrapper';
import Hero from './Hero';
// import Feed from '@components/UI/V1/News/Feed/Feed';
import Feed from '@components/UI/V1/NewsV2/Feed/index';

import BioSection from './BioSection';

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const Profile = ({
	userData,
	isLoadingSkeleton,
	visitorIdentity = GUEST,
	news = [],
	newsFetchRouteQuery,
}) => {
	const [userState, userDispatch] = useUserSharedState();

	if (!userData?.id) {
		return (
			<div className=''>
				<p>No User found!</p>
			</div>
		);
	}

	const schemaOrg = (() => {
		const schemaBasic = {
			'@context': 'http://schema.org',
			'@type': 'ProfilePage',
			mainEntity: {
				'@type': 'Person',
				name: userData?.user_name_id,
				givenName: userData?.first_name,
				familyName: userData?.last_name,
				email: userData?.email,
				url: `https://lognmaze.com/profile/${userData?.user_name_id}`,
				gender: userData?.gender,
			},
		};

		if (userData?.profile_picture)
			schemaBasic.mainEntity.image = userData?.profile_picture;
		if (userData?.bio) schemaBasic.mainEntity.about = userData?.bio;

		return schemaBasic;
	})();

	const descriptionWithXMLCharactersEncoding =
		userData?.bio?.length > 25
			? XMLCharactersEncoding(userData?.bio)
			: undefined;

	return (
		<NewsContextProvider>
			<main className={`${classes.profile} main`}>
				<Head>
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(schemaOrg),
						}}
					/>

					<meta property='og:locale' content='en_US' />
					<meta property='og:type' content='profile' />
					<meta property='profile:first_name' content={userData?.first_name} />
					<meta property='profile:last_name' content={userData?.last_name} />
					<meta property='profile:username' content={userData?.user_name_id} />
					<meta property='profile:gender' content={userData?.gender} />
					<meta
						property='og:title'
						content={`${userData?.user_name_id} | LogNMaze`}
					/>
					<meta
						property='og:url'
						content={`https://lognmaze.com/profile/${userData?.user_name_id}`}
					/>
					<meta
						name='twitter:url'
						content={`https://lognmaze.com/profile/${userData?.user_name_id}`}
					/>

					{userData?.profile_picture?.length !== 0 ? (
						<>
							<meta property='og:image' content={userData?.profile_picture} />
							<meta property='og:image:width' content='250' />
							<meta property='og:image:height' content='250' />
							<meta
								property='og:image:alt'
								content={`${userData?.user_name_id} profile picture`}
							/>
							<meta name='twitter:image' content={userData?.profile_picture} />
						</>
					) : (
						''
					)}

					{descriptionWithXMLCharactersEncoding ? (
						<>
							<meta
								property='og:description'
								content={descriptionWithXMLCharactersEncoding.slice(1, 150)}
							/>
							<meta
								name='description'
								content={descriptionWithXMLCharactersEncoding.slice(1, 150)}
							/>
							<meta
								name='twitter:description'
								content={descriptionWithXMLCharactersEncoding.slice(1, 150)}
							/>
						</>
					) : (
						''
					)}
					<meta
						property='og:url'
						content={`https://lognmaze.com/profile/${userData?.user_name_id}`}
					/>
					<meta
						name='twitter:url'
						content={`https://lognmaze.com/profile/${userData?.user_name_id}`}
					/>
					<meta
						name='twitter:title'
						content={`${userData?.user_name_id} | LogNMaze`}
					/>

					<meta
						property='og:title'
						content={`${userData?.user_name_id} | LogNMaze`}
					/>
					<title>{userData?.user_name_id} | LogNMaze</title>
				</Head>
				<Hero
					isLoadingSkeleton={isLoadingSkeleton}
					userData={userData}
					visitorIdentity={visitorIdentity}
				/>
				<section className={classes['main-section']}>
					<section className={classes['section-1']}>
						{news.length !== 0 && (
							<Feed
								isLoadingSkeleton={isLoadingSkeleton}
								news={news}
								newsFetchRouteQuery={newsFetchRouteQuery}
							/>
						)}
						<Wrapper
							className={handleAddingLoadingSkeletonClass(
								isLoadingSkeleton,
								classes,
								classes.wrapper
							)}
						>
							<div>
								{userData?.created_at && (
									<time dateTime={userData.created_at}>
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
								)}
							</div>
						</Wrapper>
					</section>
					<section className={classes['section-2']}>
						<Wrapper
							className={handleAddingLoadingSkeletonClass(
								isLoadingSkeleton && userState.isVerifyingUserLoading,
								classes,
								classes.wrapper
							)}
						>
							{!isLoadingSkeleton && visitorIdentity === OWNER && (
								<DynamicCreateNewsButton />
							)}

							<BioSection
								bio={userData?.bio}
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

// telephone: '9195555555',
// jobTitle: 'Partner',

// worksFor: {
// 	'@type': 'Organization',
// 	name: 'Example Law Firm',
// 	url: 'https://www.examplelaw.com/',
// 	address: {
// 		'@type': 'PostalAddress',
// 		addressLocality: 'Raleigh',
// 		addressRegion: 'NC',
// 		postalCode: '27604',
// 		streetAddress: '100 Main Street, Suite 201',
// 		addressCountry: 'USA',
// 	},
// },

// alumniOf: [
// 	{
// 		'@type': 'CollegeOrUniversity',
// 		name: 'University of North Carolina at Chapel Hill',
// 	},
// 	{
// 		'@type': 'CollegeOrUniversity',
// 		name: 'University of North Carolina School of Law',
// 	},
// ],
// memberOf: [
// 	'North Carolina State Bar',
// 	'Wake County Bar',
// 	'North Carolina Board Certified Family Law Specialist',
// 	'Certified Parenting Coordinator',
// 	'NCDRC Certified Family Financial Mediator',
// ],
// award: [
// 	'North Carolina Super Lawyers, Rising Star 2018',
// 	'Business Leader Magazine, North Carolina Top Family Lawyer',
// ],
// sameAs: [
// 	'https://www.facebook.com/JaneDoeAttorney/',
// 	'https://www.linkedin.com/in/jane-doe-attorney',
// 	'https://twitter.com/janedoeattorney',
// ],
