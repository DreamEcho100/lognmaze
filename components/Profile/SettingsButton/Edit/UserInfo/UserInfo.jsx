import { Fragment } from 'react';

import classes from './UserInfo.module.css';

import Accordion from '../../../../UI/V1/Accordion/Accordion';
import BasicInfo from './BasicInfo/BasicInfo';

const EditUserInfo = () => {
	return (
		<div>
			<Accordion>
				<Fragment key='header'>
					<h2>Edit User Info</h2>
				</Fragment>
				<Fragment key='body'>
					{' '}
					<BasicInfo />
				</Fragment>
			</Accordion>
		</div>
	);
};

export default EditUserInfo;
