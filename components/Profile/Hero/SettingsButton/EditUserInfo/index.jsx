import { useContext } from 'react';

import AccordionSettingsShower from '../UI/AccordionSettingsShower';
import ButtonModalShower from '../UI/ButtonModalShower';

import UserContext from '@store/UserContext';

import ChangeUserNameModal from './ChangeUserNameModal';
import ChangeUserGenderModal from './ChangeUserGenderModal';
import ChangeUserNameIdModal from './ChangeUserNameIdModal';

import { handleUpdateUserData } from '@store/UserContext/actions';

const EditUserInfo = () => {
	const { dispatch: userDispatch, state: userState } = useContext(UserContext);

	return (
		<AccordionSettingsShower
			headerText='Edit Your Basic Data'
			bodyItems={[
				<ButtonModalShower
					key='1'
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
					key='2'
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
					key='3'
					buttonText='Change Your User Name Id'
					ModalElement={ChangeUserNameIdModal}
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
