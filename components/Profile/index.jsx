import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';

import classes from './index.module.css';

import { dateToHumanReadableDate } from '@lib/v1/time';
import { NewsContextProvider } from '@store/NewsContext';

import CreateNewsButton from './CreateNewsButton/CreateNewsButton';

import Wrapper from '@components/UI/V1/Wrapper';
import Hero from './Hero';
import Feed from '@components/UI/V1/News/Feed/Feed';
import Accordion from '@components/UI/V1/Accordion';

import BioSection from './BioSection';

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const Profile = ({
	dynamicComponentReady = true,
	setDynamicComponentReady,
	userData = {},
	visitorIdentity = GUEST,
	userExist,
	news = [],
	newsFetchRouteQuery,
}) => {
	useEffect(() => {
		if (!dynamicComponentReady && setDynamicComponentReady) {
			setDynamicComponentReady(true);
		}
	}, []);

	if (!dynamicComponentReady) {
		return <p>Loading...</p>;
	}

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
					<meta name='robots' content='index,follow' />
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

					{userData.bio && userData.bio.length > 20 ? (
						<>
							<meta property='og:description' content={userData.bio} />
							<meta name='description' content={userData.bio} />
							<meta name='twitter:description' content={userData.bio} />
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
				<Hero
					userData={userData}
					userExist={userExist}
					visitorIdentity={visitorIdentity}
				/>
				<section className={classes['main-section']}>
					<section className={classes['section-1']}>
						<Feed news={news} newsFetchRouteQuery={newsFetchRouteQuery} />
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
							{visitorIdentity === OWNER && <CreateNewsButton />}

							{visitorIdentity === OWNER && (
								<Accordion>
									<Fragment key='header'>
										<h2>Sensitive Data</h2>
									</Fragment>
									<Fragment key='body'>
										<div>
											<p>{userData.role}</p>

											<p>{userData.state_of_birth}</p>
											<p>{userData.country_of_birth}</p>
											<p>{userData.city_of_birth}</p>

											<p>{userData.address_of_resident}</p>

											<p>{userData.date_of_birth}</p>

											<p>{userData.email}</p>
											<p>{userData.email_verified}</p>

											<p>{userData.last_sign_in}</p>
										</div>
									</Fragment>
								</Accordion>
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
