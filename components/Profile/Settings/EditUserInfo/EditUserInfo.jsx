import { Fragment } from 'react';

import classes from './EditUserInfo.module.css';

import Accordion from '../../../UI/V1/Accordion/Accordion';
import ChangeBasicInfo from './ChangeBasicInfo/ChangeBasicInfo';
import ChangeProfilePicture from './ChangeProfilePicture/ChangeProfilePicture';

const EditUserInfo = () => {
	return (
		<div>
			<Accordion>
				<Fragment key='header'>
					<h2>Edit You Info</h2>
				</Fragment>
				<Fragment key='body'>
					<ul>
						<li>
							<ChangeBasicInfo />
						</li>
						<li>
							<ChangeProfilePicture />
						</li>
					</ul>
				</Fragment>
			</Accordion>
		</div>
	);
};

export default EditUserInfo;
