// import classes from './EditUserInfo.module.css';

import AccordionSettingsShower from '../UI/AccordionSettingsShower';
import ButtonModalShower from '../UI/ButtonModalShower';

import ChangeUserNameModal from './ChangeUserNameModal/ChangeUserNameModal';
import ChangeUserGenderModal from './ChangeUserGenderModal/ChangeUserGenderModal';
import ChangeProfilePictureModal from './ChangeProfilePictureModal/ChangeProfilePictureModal';
import ChangeCoverPhotoModal from './ChangeCoverPhotoModal/ChangeCoverPhotoModal';

const EditUserInfo = () => {
	return (
		<AccordionSettingsShower
			headerText='Edit Your Basic Data'
			bodyItems={[
				<ButtonModalShower
					buttonText='Change Your First/Last Name'
					ModalElement={ChangeUserNameModal}
				/>,
				<ButtonModalShower
					buttonText='Change Your Gender'
					ModalElement={ChangeUserGenderModal}
				/>,
				<ButtonModalShower
					buttonText='Change Your Profile Picture'
					ModalElement={ChangeProfilePictureModal}
				/>,
				<ButtonModalShower
					buttonText='Change Your Cover Photo'
					ModalElement={ChangeCoverPhotoModal}
				/>,
			]}
		/>
	);
};

export default EditUserInfo;
