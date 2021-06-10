import React from 'react';
import { useState } from 'react';

import classes from './ChangeUserPassword.module.css';

import ChangeUserPasswordModal from './ChangeUserPasswordModal/ChangeUserPasswordModal';
import Button from '../../../../UI/V1/Button/Button';

const ChangeUserPassword = () => {
	const [showChangeUserPasswordModal, setShowChangeUserPasswordModal] =
		useState(false);

	return (
		<>
			<Button onClick={() => setShowChangeUserPasswordModal(true)}>
				Change Your Password
			</Button>
			{showChangeUserPasswordModal && (
				<ChangeUserPasswordModal
					closeModal={() => setShowChangeUserPasswordModal(false)}
				/>
			)}
		</>
	);
};

export default ChangeUserPassword;
