import { Fragment, useState } from 'react';
import dynamic from 'next/dynamic';

// import classes from './SettingsButton.module.css';

const DynamicModal = dynamic(() => import('@components/UI/V1/Modal'));

// import Modal from '../../UI/V1/Modal';
import EditUserInfo from './EditUserInfo/EditUserInfo';
import EditUserSecurity from './EditUserSecurity/EditUserSecurity';
import Button from '../../UI/V1/Button';

const SettingsButton = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button onClick={() => setShowModal(true)}>Settings</Button>

			<DynamicModal
				showModal={showModal}
				click={() => setShowModal(false)}
				CloseButtonElement={(props) => (
					<Button type='button' {...props}>
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
			</DynamicModal>
		</>
	);
};

export default SettingsButton;
