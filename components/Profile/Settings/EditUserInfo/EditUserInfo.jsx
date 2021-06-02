import { Fragment } from 'react';

import classes from './EditUserInfo.module.css';

import Accordion from '../../../UI/V1/Accordion/Accordion';
import ChangeBasicInfo from './ChangeBasicInfo/ChangeBasicInfo';
import ChangeProfilePicture from './ChangeProfilePicture/ChangeProfilePicture';
import ChangeCoverPhoto from './ChangeCoverPhoto/ChangeCoverPhoto';

const EditUserInfo = () => {
	return (
		<div>
			<Accordion>
				<Fragment key='header'>
					<h2>Edit Your Info</h2>
				</Fragment>
				<Fragment key='body'>
					<ul>
						<li className={classes['item-list']}>
							<ChangeBasicInfo />
						</li>
						<li className={classes['item-list']}>
							<ChangeProfilePicture />
						</li>
						<li className={classes['item-list']}>
							<ChangeCoverPhoto />
						</li>
					</ul>
				</Fragment>
			</Accordion>
		</div>
	);
};

export default EditUserInfo;
