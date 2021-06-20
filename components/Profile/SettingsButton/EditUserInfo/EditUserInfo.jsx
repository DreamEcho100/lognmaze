import React from 'react';

import classes from './EditUserInfo.module.css';

import AccordionSettingsDisplayer from '../UI/AccordionSettingsDisplayer/AccordionSettingsDisplayer';
import ButtonModuleDisplayer from '../UI/ButtonModuleDisplayer/ButtonModuleDisplayer';

import ChangeBasicInfoModal from './ChangeBasicInfoModal/ChangeBasicInfoModal';
import ChangeProfilePictureModal from './ChangeProfilePictureModal/ChangeProfilePictureModal';
import ChangeCoverPhotoModal from './ChangeCoverPhotoModal/ChangeCoverPhotoModal';

const EditUserInfo = () => {
	return (
		<AccordionSettingsDisplayer
			headerText='Edit Your Security'
			bodyItems={[
				<ButtonModuleDisplayer
					buttonText='Change Your Basic Info'
					ModalElement={ChangeBasicInfoModal}
				/>,
				<ButtonModuleDisplayer
					buttonText='Change Your Profile Picture'
					ModalElement={ChangeProfilePictureModal}
				/>,
				<ButtonModuleDisplayer
					buttonText='Change Your Cover Photo'
					ModalElement={ChangeCoverPhotoModal}
				/>,
			]}
		/>
	);
};

export default EditUserInfo;
