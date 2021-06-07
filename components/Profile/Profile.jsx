import { useRouter } from 'next/router';

import classes from './Profile.module.css';

import CreatePostButton from './CreatePostButton/CreatePostButton';

const Profile = ({ userData = {}, visitorIdentity }) => {
	const router = useRouter();

	if (!userData.id) {
		return (
			<div className=''>
				<p>No User found!</p>
			</div>
		);
	}
	const OWNER = 'OWNER';

	return (
		<section className={`${classes.profile}`}>
			<h1>Profile</h1>
			<div className='profile'>
				<img src={userData.cover_photo} alt='' />
				<img src={userData.profile_picture} alt='' />
				<p className='full_name'>
					{userData.first_name} {userData.last_name}
				</p>
				<p>{userData.about}</p>
				<p>{userData.city}</p>
				<p>{userData.country}</p>
				<p>{userData.cover_photo}</p>
				<p>{userData.created_at}</p>
				<p>{userData.cv}</p>
				<p>{userData.date_of_birth}</p>
				<p>{userData.email}</p>
				<p>{userData.email_verified}</p>
				<p>{userData.gender}</p>
				<p>{userData.last_sign_in}</p>
				<p>
					+<span>{userData.country_phone_code}</span>
					{userData.phone_number}
				</p>
				<p>{userData.profile_picture}</p>
				<p>{userData.role}</p>
				<p>{userData.state}</p>
				<p>{userData.user_name_id}</p>
				{/* <p className='user_name'>{userData.user_name}</p>
				<p className='email'>{userData.email}</p>
				<p className='gender'>{userData.gender}</p>
				<p className='created_at'>{userData.created_at}</p>
				<p className='cv'>{userData.cv}</p> */}
			</div>
			{visitorIdentity === OWNER && (
				<button onClick={() => router.replace(`${router.asPath}/settings`)}>
					Settings
				</button>
			)}
			{visitorIdentity === OWNER && <CreatePostButton />}
		</section>
	);
};

export default Profile;
