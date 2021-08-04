import { useRouter } from 'next/router';

import classes from './Profile.module.css';

import CreateNewsButton from './CreateNewsButton/CreateNewsButton';
import SettingsButton from './SettingsButton/SettingsButton';

import Feed from '@components/UI/V1/News/Feed/Feed';

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const Profile = ({ userData = {}, visitorIdentity = GUEST, news = [] }) => {
	const router = useRouter();

	if (!userData.id) {
		return (
			<div className=''>
				<p>No User found!</p>
			</div>
		);
	}

	return (
		<>
			<section className={`${classes.profile}`}>
				<h1>Profile</h1>
				<div className='profile'>
					<p>{userData.id}</p>
					<p>{userData.state_of_resident}</p>
					<p>{userData.country_of_resident}</p>
					<p>{userData.city_of_resident}</p>
					{visitorIdentity === OWNER ? (
						<p>{userData.address_of_resident}</p>
					) : null}
					<p>{userData.bio}</p>
					{visitorIdentity === OWNER ? (
						<>
							<p>{userData.state_of_birth}</p>
							<p>{userData.country_of_birth}</p>
							<p>{userData.city_of_birth}</p>
						</>
					) : null}
					{visitorIdentity === OWNER ? <p>{userData.date_of_birth}</p> : null}
					{visitorIdentity === OWNER ? (
						<>
							<p>{userData.email}</p>
							<p>{userData.email_verified}</p>
						</>
					) : null}
					{visitorIdentity === OWNER ? (
						<>
							<p>+{userData.phone_number}</p>
							<p>{userData.phone_verified}</p>
						</>
					) : null}
					<p>{userData.cover_photo}</p>
					<p>{userData.created_at}</p>
					<p>{userData.first_name}</p>
					<p>{userData.gender}</p>
					<p>{userData.last_name}</p>
					<p>{userData.last_sign_in}</p>
					<p>{userData.profile_picture}</p>
					<p>{userData.role}</p>
					<p>{userData.token}</p>
					<p>{userData.user_name_id}</p>
				</div>
				{visitorIdentity === OWNER && <SettingsButton />}
				{visitorIdentity === OWNER && <CreateNewsButton />}
			</section>

			<Feed news={news} />
		</>
	);
};

export default Profile;
