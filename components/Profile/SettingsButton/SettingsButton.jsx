import { Fragment, useState } from 'react';

import classes from './SettingsButton.module.css';

import Modal from '../../UI/V1/Modal/Modal';
import EditUserInfo from './EditUserInfo/EditUserInfo';
import EditUserSecurity from './EditUserSecurity/EditUserSecurity';
import Button from '../../UI/V1/Button';

const SettingsButton = () => {
	const [closeModal, setCloseModal] = useState(true);

	return (
		<>
			<Button onClick={() => setCloseModal(false)}>Settings</Button>

			{!closeModal && (
				<Modal
					click={() => setCloseModal(true)}
					CloseButtonElement={(props) => (
						<Button type='button' {...props}>
							Close
						</Button>
					)}
				>
					<Fragment key='header'>
						<h2>Create A Post</h2>
					</Fragment>
					<Fragment key='body'>
						<EditUserInfo />
						<EditUserSecurity />
					</Fragment>
				</Modal>
			)}
		</>
	);
};

export default SettingsButton;
