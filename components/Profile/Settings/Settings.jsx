import classes from './Settings.module.css';

import EditUserInfo from './EditUserInfo/EditUserInfo';
import EditUserSecurity from './EditUserSecurity/EditUserSecurity';

const Settings = () => {
	return (
		<section>
			<EditUserInfo />
			<EditUserSecurity />
		</section>
	);
};

export default Settings;
