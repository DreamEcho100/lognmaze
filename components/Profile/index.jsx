import { Fragment, useEffect, useState } from 'react';
import Head from 'next/head';

import classes from './index.module.css';

import { dateToHumanReadableDate } from '@lib/v1/time';

// import CreateNewsButton from '@components/UI/V1/Button/CreateNews';
import CreateNewsButton from './CreateNewsButton/CreateNewsButton';
import SettingsButton from './SettingsButton/SettingsButton';

import Wrapper from '@components/UI/V1/Wrapper';
import Image from '@components/UI/V1/Image';
import Feed from '@components/UI/V1/News/Feed/Feed';
import Accordion from '@components/UI/V1/Accordion';

import BioSection from './BioSection';

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const Profile = ({ userData = {}, visitorIdentity = GUEST, news = [] }) => {
	if (!userData.id) {
		return (
			<div className=''>
				<p>No User found!</p>
			</div>
		);
	}

	return (
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
			<Wrapper>
				<div className={classes['cover_photo-outer-container']}>
					<div className={classes['cover_photo-inner-container']}>
						<Image
							src={userData.cover_photo}
							alt=''
							className={classes['cover_photo']}
						/>
					</div>{' '}
				</div>
				<div className={classes['profile_picture-outer-container']}>
					<div className={classes['profile_picture-inner-container']}>
						<Image
							src={userData.profile_picture}
							alt=''
							className={classes['profile_picture']}
						/>
					</div>{' '}
				</div>
				<div className={classes['basic-data']}>
					<h3>{userData.user_name_id}</h3>
					<h4>
						{userData.first_name} {userData.last_name}
					</h4>
					<p>{userData.gender}</p>
				</div>
				{visitorIdentity === OWNER && <SettingsButton />}
			</Wrapper>

			<section className={classes['main-section']}>
				<section className={classes['section-1']}>
					<Feed news={news} />
					<Wrapper>
						<p>
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
						</p>
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

										<p>{userData.state_of_resident}</p>
										<p>{userData.country_of_resident}</p>
										<p>{userData.city_of_resident}</p>
										<p>{userData.address_of_resident}</p>

										<p>{userData.date_of_birth}</p>

										<p>{userData.email}</p>
										<p>{userData.email_verified}</p>

										<p>+{userData.phone_number}</p>

										<p>{userData.last_sign_in}</p>
									</div>
								</Fragment>
							</Accordion>
						)}
						<BioSection bio={userData.bio} visitorIdentity={visitorIdentity} />
					</Wrapper>
				</section>
			</section>
		</main>
	);
};

export default Profile;
