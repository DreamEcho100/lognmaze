import { useContext } from 'react';

// import classes from './EditUserInfo.module.css';

import AccordionSettingsShower from '../UI/AccordionSettingsShower';
import ButtonModalShower from '../UI/ButtonModalShower';

import UserContext from '@store/UserContext';

import ChangeUserNameModal from './ChangeUserNameModal/ChangeUserNameModal';
import ChangeUserGenderModal from './ChangeUserGenderModal/ChangeUserGenderModal';
import ChangeProfilePictureModal from './ChangeProfilePictureModal/ChangeProfilePictureModal';
import ChangeCoverPhotoModal from './ChangeCoverPhotoModal/ChangeCoverPhotoModal';
import { handleUpdateUserData } from '@store/UserContext/actions';

const EditUserInfo = () => {
	const { dispatch: userDispatch, state: userState } = useContext(UserContext);

	return (
		<AccordionSettingsShower
			headerText='Edit Your Basic Data'
			bodyItems={[
				<ButtonModalShower
					buttonText='Change Your First/Last Name'
					ModalElement={ChangeUserNameModal}
					ModelProps={{
						user: userState.user,
						token: userState.token,
						userDispatch: userDispatch,
						handleUpdateUserData,
					}}
				/>,
				<ButtonModalShower
					buttonText='Change Your Gender'
					ModalElement={ChangeUserGenderModal}
					ModelProps={{
						user: userState.user,
						token: userState.token,
						userDispatch: userDispatch,
						handleUpdateUserData,
					}}
				/>,
				<ButtonModalShower
					buttonText='Change Your Profile Picture'
					ModalElement={ChangeProfilePictureModal}
					ModelProps={{
						user: userState.user,
						token: userState.token,
						userDispatch: userDispatch,
						handleUpdateUserData,
					}}
				/>,
				<ButtonModalShower
					buttonText='Change Your Cover Photo'
					ModalElement={ChangeCoverPhotoModal}
					ModelProps={{
						user: userState.user,
						token: userState.token,
						userDispatch: userDispatch,
						handleUpdateUserData,
					}}
				/>,
			]}
		/>
	);
};

export default EditUserInfo;
