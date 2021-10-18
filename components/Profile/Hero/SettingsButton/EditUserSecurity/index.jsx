import { useUserSharedState } from '@store/UserContext';
import {
	handleUpdateUserData,
	handleUpdateUserPassword,
} from '@store/UserContext/actions';

import AccordionSettingsShower from '../UI/AccordionSettingsShower';
import ButtonModalShower from '../UI/ButtonModalShower';
import ChangeUserEmailModal from './ChangeUserEmailModal';
import ChangeUserPasswordModal from './ChangeUserPasswordModal';

const EditUserSecurity = () => {
	const [userState, userDispatch] = useUserSharedState();

	return (
		<AccordionSettingsShower
			headerText='Edit Your Security'
			bodyItems={[
				<ButtonModalShower
					key='1'
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
					key='2'
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
