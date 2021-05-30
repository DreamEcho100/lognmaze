import { Fragment, useState } from 'react';

import classes from './ChangeProfilePicture.module.css';

import ChangeProfilePictureModal from './ChangeProfilePictureModal/ChangeProfilePictureModal';
import Button from '../../../../UI/V1/Button/Button';

const ChangeProfilePicture = () => {
	const [showChangeProfilePictureModal, setShowChangeProfilePictureModal] =
		useState(false);

	return (
		<>
			<Button onClick={() => setShowChangeProfilePictureModal(true)}>
				Change Your Profile Picture
			</Button>
			{showChangeProfilePictureModal && (
				<ChangeProfilePictureModal
					closeModal={() => setShowChangeProfilePictureModal(false)}
				/>
			)}
		</>
	);
};

export default ChangeProfilePicture;
