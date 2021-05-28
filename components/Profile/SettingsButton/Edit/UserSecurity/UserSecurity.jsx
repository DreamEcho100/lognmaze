import { Fragment } from 'react';

import classes from './UserSecurity.module.css';

import Accordion from '../../../../UI/V1/Accordion/Accordion';
import ChangeUserEmail from './ChangeUserEmail/ChangeUserEmail';
import ChangeUserPassword from './ChangeUserPassword/ChangeUserPassword';

const EditUserSecurity = () => {
	return (
		<Accordion>
			<Fragment key='header'>
				<h2>Edit User Security</h2>
			</Fragment>
			<Fragment key='body'>
				<ChangeUserEmail />
				<ChangeUserPassword />
			</Fragment>
		</Accordion>
	);
};

export default EditUserSecurity;
