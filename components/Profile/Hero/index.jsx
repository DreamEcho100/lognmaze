import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { handleAddingLoadingSkeletonClass } from '@lib/v1/className';

import classes from './index.module.css';

import Wrapper from 'components/UI/V1/Wrapper';
import CustomImage from '@components/UI/V1/Image';
import Button from '@components/UI/V1/Button';
import UpdateUserPictureModal from '@components/UI/V1/Modal/UpdateUserPicture';
const SettingsButtonDynamic = dynamic(
	() => import('./SettingsButton/SettingsButton'),
	{
		ssr: false,
	}
);
const LoadYourLatestDataButtonDynamic = dynamic(
	() => import('./LoadYourLatestDataButton'),
	{
		ssr: false,
	}
);
const SensitiveDataAccordionDynamic = dynamic(
	() => import('./SensitiveDataAccordion'),
	{
		ssr: false,
	}
);

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const Hero = ({ isLoadingSkeleton, userData = {}, visitorIdentity }) => {
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
		<Wrapper className={`${classes.wrapper}`}>
			<div className={classes['cover_photo-outer-container']}>
				<div className={classes['cover_photo-container']}>
					<div
						className={handleAddingLoadingSkeletonClass(
							isLoadingSkeleton,
							classes,
							classes['cover_photo-inner-container']
						)}
					>
						<CustomImage
							src={userData.cover_photo}
							alt=''
							className={classes['cover_photo']}
							// effect='blur'
						/>
						{visitorIdentity === OWNER && (
							<Button
								className={`${classes['edit-button']} d-flex flex-xy-center`}
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
					</div>{' '}
				</div>
			</div>
			<div className={classes['profile_picture-outer-container']}>
				<div className={classes['profile_picture-container']}>
					<div
						className={handleAddingLoadingSkeletonClass(
							isLoadingSkeleton,
							classes,
							classes['profile_picture-inner-container']
						)}
					>
						<CustomImage
							src={userData.profile_picture}
							alt=''
							className={classes['profile_picture']}
							effect='blur'
						/>
					</div>{' '}
					{visitorIdentity === OWNER && (
						<Button
							className={`${classes['edit-button']} d-flex flex-xy-center`}
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
				<h3
					className={handleAddingLoadingSkeletonClass(
						isLoadingSkeleton,
						classes
					)}
				>
					{userData.user_name_id}
				</h3>
				<h4
					className={handleAddingLoadingSkeletonClass(
						isLoadingSkeleton,
						classes
					)}
				>
					{userData.first_name} {userData.last_name}
				</h4>
				<p
					className={handleAddingLoadingSkeletonClass(
						isLoadingSkeleton,
						classes
					)}
				>
					{userData.gender[0].toUpperCase() + userData.gender.slice(1)}
				</p>
				<address>
					<p
						className={handleAddingLoadingSkeletonClass(
							isLoadingSkeleton,
							classes
						)}
					>
						{userData.state_of_resident}
					</p>
					<p
						className={handleAddingLoadingSkeletonClass(
							isLoadingSkeleton,
							classes
						)}
					>
						{userData.country_of_resident}
					</p>
					<p
						className={handleAddingLoadingSkeletonClass(
							isLoadingSkeleton,
							classes
						)}
					>
						{userData.city_of_resident}
					</p>
				</address>
			</div>
			{visitorIdentity === OWNER && (
				<>
					<SensitiveDataAccordionDynamic userData={userData} />
					<div className='buttons-holder'>
						<SettingsButtonDynamic />
						<LoadYourLatestDataButtonDynamic user_id={userData.id} />
					</div>
				</>
			)}
		</Wrapper>
	);
};

export default Hero;
