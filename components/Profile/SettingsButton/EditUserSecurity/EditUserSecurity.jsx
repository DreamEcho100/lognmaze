import classes from './EditUserSecurity.module.css';

import AccordionSettingsDisplayer from '../UI/AccordionSettingsDisplayer/AccordionSettingsDisplayer';
import ButtonModuleDisplayer from '../UI/ButtonModuleDisplayer/ButtonModuleDisplayer';
import ChangeUserEmailModal from './ChangeUserEmailModal/ChangeUserEmailModal';
import ChangeUserPasswordModal from './ChangeUserPasswordModal/ChangeUserPasswordModal';

const EditUserSecurity = () => {
	return (
		<AccordionSettingsDisplayer
			headerText='Edit Your Security'
			bodyItems={[
				<ButtonModuleDisplayer
					buttonText='Change Your Email'
					ModalElement={ChangeUserEmailModal}
				/>,
				<ButtonModuleDisplayer
					buttonText='Change Your Password'
					ModalElement={ChangeUserPasswordModal}
				/>,
			]}
		/>
	);
};

export default EditUserSecurity;
