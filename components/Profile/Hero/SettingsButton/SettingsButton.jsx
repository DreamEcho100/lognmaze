import { Fragment, useState } from 'react';

import Modal from '@components/UI/V1/Modal';
import EditUserInfo from './EditUserInfo/EditUserInfo';
import EditUserSecurity from './EditUserSecurity/EditUserSecurity';
import Button from '@components/UI/V1/Button';

const SettingsButton = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button
				title='Show User Settings Modal'
				onClick={() => setShowModal(true)}
			>
				Settings
			</Button>

			<Modal
				showModal={showModal}
				click={() => setShowModal(false)}
				CloseButtonElement={(props) => (
					<Button title='Close Modal' type='button' {...props}>
						Close
					</Button>
				)}
			>
				<Fragment key='header'>
					<h2>Settings</h2>
				</Fragment>
				<Fragment key='body'>
					<EditUserInfo />
					<EditUserSecurity />
				</Fragment>
			</Modal>
		</>
	);
};

export default SettingsButton;
