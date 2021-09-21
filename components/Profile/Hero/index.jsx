import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

import Wrapper from 'components/UI/V1/Wrapper';
import LazyLoadImage from '@components/UI/V1/Image/LazyLoad';
import Button from '@components/UI/V1/Button';
import UpdateUserPictureModal from '@components/UI/V1/Modal/UpdateUserPicture';
const SettingsButton = dynamic(() => import('./SettingsButton/SettingsButton'));
const LoadYourLatestDataButton = dynamic(() =>
	import('./LoadYourLatestDataButton')
);

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const Hero = ({ userData, visitorIdentity }) => {
	const [
		showUpdateUserProfilePictureModalModal,
		setShowUpdateUserProfilePictureModalModal,
	] = useState(false);
	const [
		showUpdateUserCoverPhotoModalModal,
		setShowUpdateUserCoverPhotoModalModal,
	] = useState(false);
	const [values, setValues] = useState({
		profile_picture: '',
		cover_photo: '',
	});

	return (
		<Wrapper>
			<div className={classes['cover_photo-outer-container']}>
				<div className={classes['cover_photo-container']}>
					<div className={classes['cover_photo-inner-container']}>
						<LazyLoadImage
							src={userData.cover_photo}
							alt=''
							className={classes['cover_photo']}
							effect='blur'
						/>
					</div>{' '}
					{visitorIdentity === OWNER && (
						<Button
							className={classes['edit-button']}
							title='Edit'
							onClick={() => setShowUpdateUserCoverPhotoModalModal(true)}
						>
							<FontAwesomeIcon icon={['fas', 'edit']} />
						</Button>
					)}
					<UpdateUserPictureModal
						showModal={showUpdateUserCoverPhotoModalModal}
						setShowModal={setShowUpdateUserCoverPhotoModalModal}
						values={values}
						setValues={setValues}
						name='cover_photo'
						ModalHeader={() => <h1>Change Your Cover Photo</h1>}
					/>
				</div>
			</div>
			<div className={classes['profile_picture-outer-container']}>
				<div className={classes['profile_picture-container']}>
					<div className={classes['profile_picture-inner-container']}>
						<LazyLoadImage
							src={userData.profile_picture}
							alt=''
							className={classes['profile_picture']}
							effect='blur'
						/>
					</div>{' '}
					{visitorIdentity === OWNER && (
						<Button
							className={classes['edit-button']}
							title='Edit'
							onClick={() => setShowUpdateUserProfilePictureModalModal(true)}
						>
							<FontAwesomeIcon icon={['fas', 'edit']} />
						</Button>
					)}
					<UpdateUserPictureModal
						showModal={showUpdateUserProfilePictureModalModal}
						setShowModal={setShowUpdateUserProfilePictureModalModal}
						values={values}
						setValues={setValues}
						name='profile_picture'
						ModalHeader={() => <h1>Change Your Profile Picture</h1>}
					/>
				</div>
			</div>
			<div className={classes['basic-data']}>
				<h3>{userData.user_name_id}</h3>
				<h4>
					{userData.first_name} {userData.last_name}
				</h4>
				<p>{userData.gender}</p>
				<p>{userData.state_of_resident}</p>
				<p>{userData.country_of_resident}</p>
				<p>{userData.city_of_resident}</p>
			</div>
			{visitorIdentity === OWNER && (
				<div className={classes.buttons}>
					<SettingsButton />
					<LoadYourLatestDataButton user_id={userData.id} />
				</div>
			)}
		</Wrapper>
	);
};

export default Hero;
