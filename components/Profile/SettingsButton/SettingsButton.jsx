import { Fragment, useState } from 'react';

import classes from './SettingsButton.module.css';

import Modal from '../../UI/V1/Modal/Modal';
import Button from '../../UI/V1/Button/Button';
// import ChangePasswordButton from './ChangePasswordButton/ChangePasswordButton';
import EditUserInfo from './Edit/UserInfo/UserInfo';
import EditUserSecurity from './Edit/UserSecurity/UserSecurity';

const SettingsButton = () => {
	const [showSettingsModal, setShowSettingsModal] = useState(false);

	return (
		<div>
			<button
				className={classes.settingsButtonBtn}
				onClick={() => setShowSettingsModal(true)}
			>
				Settings
			</button>
			{showSettingsModal && (
				<Modal
					click={() => setShowSettingsModal(false)}
					CloseButtonElement={(props) => (
						<Button type='button' {...props}>
							Close
						</Button>
					)}
				>
					<Fragment key='header'>
						<h1>User Settings</h1>
					</Fragment>
					<Fragment key='body'>
						<EditUserInfo />
						<EditUserSecurity />
						{/* <ChangePasswordButton />
						<button>Change Profile Picture</button>
						<button>Change Cover Photo</button> */}
					</Fragment>
				</Modal>
			)}
			<div></div>
			<div className={classes.mainContent}></div>
		</div>
	);
};

export default SettingsButton;
