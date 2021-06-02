import { Fragment, useState } from 'react';

import classes from './ChangeCoverPhoto.module.css';

import ChangeCoverPhotoModal from './ChangeCoverPhotoModal/ChangeCoverPhotoModal';
import Button from '../../../../UI/V1/Button/Button';

const ChangeCoverPhoto = () => {
	const [showChangeCoverPhotoModal, setShowChangeCoverPhotoModal] =
		useState(false);

	return (
		<>
			<Button onClick={() => setShowChangeCoverPhotoModal(true)}>
				Change Your Cover Photo
			</Button>
			{showChangeCoverPhotoModal && (
				<ChangeCoverPhotoModal
					closeModal={() => setShowChangeCoverPhotoModal(false)}
				/>
			)}
		</>
	);
};

export default ChangeCoverPhoto;
