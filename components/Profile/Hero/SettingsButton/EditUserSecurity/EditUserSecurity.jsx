import { useContext } from 'react';

// import classes from './EditUserSecurity.module.css';

import UserContext from '@store/UserContext';
import {
	handleUpdateUserData,
	handleUpdateUserPassword,
} from '@store/UserContext/actions';

import AccordionSettingsShower from '../UI/AccordionSettingsShower';
import ButtonModalShower from '../UI/ButtonModalShower';
import ChangeUserEmailModal from './ChangeUserEmailModal/ChangeUserEmailModal';
import ChangeUserPasswordModal from './ChangeUserPasswordModal/ChangeUserPasswordModal';

const EditUserSecurity = () => {
	const { dispatch: userDispatch, state: userState } = useContext(UserContext);

	return (
		<AccordionSettingsShower
			headerText='Edit Your Security'
			bodyItems={[
				<ButtonModalShower
					buttonText='Change Your Email'
					ModalElement={ChangeUserEmailModal}
					ModelProps={{
						user: userState.user,
						token: userState.token,
						userDispatch: userDispatch,
						handleUpdateUserData,
					}}
				/>,
				<ButtonModalShower
					buttonText='Change Your Password'
					ModalElement={ChangeUserPasswordModal}
					ModelProps={{
						token: userState.token,
						handleUpdateUserPassword,
					}}
				/>,
			]}
		/>
	);
};

export default EditUserSecurity;
