import { Fragment } from 'react';

import classes from './EditUserSecurity.module.css';

import Accordion from '../../../UI/V1/Accordion/Accordion';
import ChangeUserEmail from './ChangeUserEmail/ChangeUserEmail';
import ChangeUserPassword from './ChangeUserPassword/ChangeUserPassword';

const EditUserSecurity = () => {
	return (
		<Accordion>
			<Fragment key='header'>
				<h2>Edit User Security</h2>
			</Fragment>
			<Fragment key='body'>
				<ul>
					<li>
						<ChangeUserEmail />
					</li>
					<li>
						<ChangeUserPassword />
					</li>
				</ul>
			</Fragment>
		</Accordion>
	);
};

export default EditUserSecurity;
