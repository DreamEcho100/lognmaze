import { useRouter } from 'next/router';

import classes from './Profile.module.css';

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
				<p className='user_name'>{userData.user_name}</p>
				<p className='email'>{userData.email}</p>
				<p className='gender'>{userData.gender}</p>
				<p className='created_at'>{userData.created_at}</p>
				<p className='cv'>{userData.cv}</p>
			</div>
			{visitorIdentity === OWNER && (
				<button onClick={() => router.replace(`${router.asPath}/settings`)}>
					Settings
				</button>
			)}
		</section>
	);
};

export default Profile;
