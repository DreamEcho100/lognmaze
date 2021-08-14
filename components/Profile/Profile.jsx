import { Fragment, useState } from 'react';

import classes from './Profile.module.css';

import CreateNewsButton from './CreateNewsButton/CreateNewsButton';
import SettingsButton from './SettingsButton/SettingsButton';

import Wrapper from '@components/UI/V1/Wrapper';
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
		<main className={`${classes.profile}`}>
			<Wrapper>
				<div className={classes['cover_photo-container']}>
					<img
						src={userData.cover_photo}
						alt=''
						className={classes['cover_photo']}
					/>
				</div>
				<div className={classes['profile_picture-container']}>
					<img
						src={userData.profile_picture}
						alt=''
						className={classes['profile_picture']}
					/>
				</div>
				<div className={classes['basic-data']}>
					<h3>{userData.user_name_id}</h3>
					<p>{userData.gender}</p>
					<p>{userData.created_at}</p>
				</div>
				{visitorIdentity === OWNER && <SettingsButton />}
			</Wrapper>

			<section className={classes['main-section']}>
				{/* <Wrapper> */}
				<Feed className={classes['section-1']} news={news} />
				{/* </Wrapper> */}
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
										<p>
											{userData.first_name} {userData.last_name}
										</p>

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
