import { Fragment } from 'react';

import classes from './EditUserSecurity.module.css';

import Accordion from '../../../UI/V1/Accordion/Accordion';
import ChangeUserEmail from './ChangeUserEmail/ChangeUserEmail';
import ChangeUserPassword from './ChangeUserPassword/ChangeUserPassword';

const EditUserSecurity = () => {
	return (
		<Accordion>
			<Fragment key='header'>
				<h2>Edit Your Security</h2>
			</Fragment>
			<Fragment key='body'>
				<ul>
					<li className={classes['item-list']}>
						<ChangeUserEmail />
					</li>
					<li className={classes['item-list']}>
						<ChangeUserPassword />
					</li>
				</ul>
			</Fragment>
		</Accordion>
	);
};

export default EditUserSecurity;
