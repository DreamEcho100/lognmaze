import React from 'react';
import { useRouter } from 'next/router';

import classes from './Profile.module.css';

import CreatePostButton from './CreatePostButton/CreatePostButton';
import SettingsButton from './SettingsButton/SettingsButton';

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const Profile = ({ userData = {}, visitorIdentity = GUEST, posts }) => {
	const router = useRouter();

	if (!userData.id) {
		return (
			<div className=''>
				<p>No User found!</p>
			</div>
		);
	}

	const formattedData = posts.data.map(
		({
			id,
			author_id,
			author_user_name_id,
			format_type,
			title,
			meta_title,
			slug,
			image,
			tags,
			meta_description,
			excerpt,
			content,
			like_user_id,
			likes,
			created_at,
			updated_on,
			user_name_id,
			first_name,
			last_name,
			profile_picture,
		}) => {
			const author = {
				user_name_id,
				first_name,
				last_name,
				profile_picture,
			};
			const post = {
				id,
				author_id,
				author_user_name_id,
				format_type,
				title,
				meta_title,
				slug,
				image,
				tags,
				meta_description,
				excerpt,
				content,
				like_user_id,
				likes,
				created_at,
				updated_on,
			};

			return { author, post };
		}
	);

	console.log('formattedData', formattedData);

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
			</div>
			{/* <button onClick={() => router.replace(`${router.asPath}/settings`)}>
					Settings
				</button> */}
			{visitorIdentity === OWNER && <SettingsButton />}
			{visitorIdentity === OWNER && <CreatePostButton />}
		</section>
	);
};

export default Profile;
