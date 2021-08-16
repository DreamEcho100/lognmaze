// import classes from './EditUserSecurity.module.css';

import AccordionSettingsShower from '../UI/AccordionSettingsShower';
import ButtonModalShower from '../UI/ButtonModalShower';
import ChangeUserEmailModal from './ChangeUserEmailModal/ChangeUserEmailModal';
import ChangeUserPasswordModal from './ChangeUserPasswordModal/ChangeUserPasswordModal';

const EditUserSecurity = () => {
	return (
		<AccordionSettingsShower
			headerText='Edit Your Security'
			bodyItems={[
				<ButtonModalShower
					buttonText='Change Your Email'
					ModalElement={ChangeUserEmailModal}
				/>,
				<ButtonModalShower
					buttonText='Change Your Password'
					ModalElement={ChangeUserPasswordModal}
				/>,
			]}
		/>
	);
};

export default EditUserSecurity;
