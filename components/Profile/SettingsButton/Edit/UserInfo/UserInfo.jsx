import { Fragment } from 'react';

import classes from './UserInfo.module.css';

import Accordion from '../../../../UI/V1/Accordion/Accordion';
import BasicInfo from './BasicInfo/BasicInfo';
import ProfilePicture from './ProfilePicture/ProfilePicture';

const EditUserInfo = () => {
	return (
		<div>
			<Accordion>
				<Fragment key='header'>
					<h2>Edit User Info</h2>
				</Fragment>
				<Fragment key='body'>
					<BasicInfo />
					<ProfilePicture />
				</Fragment>
			</Accordion>
		</div>
	);
};

export default EditUserInfo;
