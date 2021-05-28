import classes from './Profile.module.css';

import SettingsButton from './SettingsButton/SettingsButton';

const Profile = ({ profileData, visitorIdentity }) => {
	if (!profileData) {
		return (
			<div className=''>
				<p>No User found!</p>
			</div>
		);
	}
	const OWNER = 'OWNER';

	console.log(profileData, visitorIdentity);

	return (
		<section className={`${classes.profile}`}>
			<h1>Profile</h1>
			<div className='profile'>
				<img src={profileData.cover_photo} alt='' />
				<img src={profileData.profile_picture} alt='' />
				<p className='full_name'>
					{profileData.first_name} {profileData.last_name}
				</p>
				<p className='user_name'>{profileData.user_name}</p>
				<p className='email'>{profileData.email}</p>
				<p className='gender'>{profileData.gender}</p>
				<p className='created_at'>{profileData.created_at}</p>
				<p className='cv'>{profileData.cv}</p>
			</div>
			{visitorIdentity === OWNER && <SettingsButton />}
		</section>
	);
};

export default Profile;
