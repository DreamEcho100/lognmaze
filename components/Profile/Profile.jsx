import { useRouter } from 'next/router';

import classes from './Profile.module.css';

import CreateNewsButton from './CreateNewsButton/CreateNewsButton';
import SettingsButton from './SettingsButton/SettingsButton';

import NewsContainer from '@/components/UI/V1/News/Container/Container';

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const Profile = ({
	userData = {},
	visitorIdentity = GUEST,
	news = { data: [] },
}) => {
	const router = useRouter();

	if (!userData.id) {
		return (
			<div className=''>
				<p>No User found!</p>
			</div>
		);
	}

	const formattedData =
		news.data.length !== 0
			? news.data.map(
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
						const news = {
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

						return { author, news };
					}
			  )
			: [];

	return (
		<>
			<section className={`${classes.profile}`}>
				<h1>Profile</h1>
				<div className='profile'>
					<p>{userData.id}</p>
					<p>{userData.state_of_resident}</p>
					<p>{userData.country_of_resident}</p>
					<p>{userData.city_of_resident}</p>
					{userData.show_address_of_resident ? (
						<p>{userData.address_of_resident}</p>
					) : null}
					{userData.show_bio ? (
						<>
							<p>{userData.bio}</p>
							<p>{userData.bio_format_type}</p>
						</>
					) : null}
					{userData.show_address_of_birth ? (
						<>
							<p>{userData.state_of_birth}</p>
							<p>{userData.country_of_birth}</p>
							<p>{userData.city_of_birth}</p>
						</>
					) : null}
					{userData.show_date_of_birth ? <p>{userData.date_of_birth}</p> : null}
					{userData.show_email ? (
						<>
							<p>{userData.email}</p>
							<p>{userData.email_verified}</p>
						</>
					) : null}
					{userData.show_phone_number ? (
						<>
							<p>{userData.country_phone_code}</p>
							<p>{userData.phone_number}</p>
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
			<>
				{formattedData.length !== 0 &&
					formattedData.map((item, index) => (
						<NewsContainer data={item} key={index} />
					))}
			</>
		</>
	);
};

export default Profile;
