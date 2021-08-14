// import classes from './EditUserInfo.module.css';

import AccordionSettingsDisplayer from '../UI/AccordionSettingsDisplayer/AccordionSettingsDisplayer';
import ButtonModuleDisplayer from '../UI/ButtonModuleDisplayer/ButtonModuleDisplayer';

import ChangeUserNameModal from './ChangeUserNameModal/ChangeUserNameModal';
import ChangeUserGenderModal from './ChangeUserGenderModal/ChangeUserGenderModal';
import ChangeProfilePictureModal from './ChangeProfilePictureModal/ChangeProfilePictureModal';
import ChangeCoverPhotoModal from './ChangeCoverPhotoModal/ChangeCoverPhotoModal';

const EditUserInfo = () => {
	return (
		<AccordionSettingsDisplayer
			headerText='Edit Your Basic Data'
			bodyItems={[
				<ButtonModuleDisplayer
					buttonText='Change Your First/Last Name'
					ModalElement={ChangeUserNameModal}
				/>,
				<ButtonModuleDisplayer
					buttonText='Change Your Gender'
					ModalElement={ChangeUserGenderModal}
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
