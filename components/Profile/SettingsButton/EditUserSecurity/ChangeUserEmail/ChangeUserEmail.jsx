import React from 'react';
import { useState } from 'react';

import classes from './ChangeUserEmail.module.css';

import ChangeUserEmailModal from './ChangeUserEmailModal/ChangeUserEmailModal';
import Button from '../../../../UI/V1/Button/Button';

const ChangeUserEmail = () => {
	const [showChangeUserEmailModal, setShowChangeUserEmailModal] =
		useState(false);

	return (
		<>
			<Button onClick={() => setShowChangeUserEmailModal(true)}>
				Change Your Email
			</Button>
			{showChangeUserEmailModal && (
				<ChangeUserEmailModal
					closeModal={() => setShowChangeUserEmailModal(false)}
				/>
			)}
		</>
	);
};

export default ChangeUserEmail;
