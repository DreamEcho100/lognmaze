import React from 'react';
import { Fragment, useContext, useState } from 'react';

import classes from './ChangeUserPasswordModal.module.css';

import UserContext from '../../../../../../store/UserContext';

import Modal from '../../../../../UI/V1/Modal/Modal';
import Form from '../../../../../UI/V1/Form/Form';
import FormControl from '../../../../../UI/V1/FormControl/FormControl';
import FormLabel from '../../../../../UI/V1/FormLabel/FormLabel';
import FormInput from '../../../../../UI/V1/FormInput/FormInput';
import Button from '../../../../../UI/V1/Button/Button';

const ChangeUserPasswordModal = ({ closeModal }) => {
	const { handleUpdatePassword } = useContext(UserContext);

	const [oldPassword, setOldPassword] = useState('');
	const [newPasswordAgain, setNewPasswordAgain] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (oldPassword === newPassword) {
			return setAfterFormSubmitMessage('Old password and new password match?');
		}

		if (newPasswordAgain !== newPassword) {
			return setAfterFormSubmitMessage("New password doesn't match!");
		}

		if (
			oldPassword.length === 0 ||
			newPasswordAgain.length === 0 ||
			newPassword.length === 0
		) {
			return setAfterFormSubmitMessage('Empty field/s!');
		}

		try {
			setBtnsDisabled(true);
			const { status, message } = await handleUpdatePassword(
				oldPassword,
				newPassword
			);

			if (status === 'error') {
				setBtnsDisabled(false);
				// throw new Error(message);
				setAfterFormSubmitMessage(message);
				return;
			}

			closeModal();
		} catch (error) {
			setBtnsDisabled(false);
			console.error(error);
			setAfterFormSubmitMessage(error.message);
			return { status: 'error', message: error.message };
		}
	};

	return (
		<Modal
			click={closeModal}
			CloseButtonElement={(props) => (
				<Button type='button' {...props}>
					Close
				</Button>
			)}
		>
			<Fragment key='header'>
				<h1>Change Your Password</h1>
			</Fragment>
			<Fragment key='body'>
				<Form onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel htmlFor='old-password'>
							Enter Your Old Password
						</FormLabel>
						<FormInput
							type='password'
							id='old-password'
							required
							onChange={(event) => setOldPassword(event.target.value)}
							value={oldPassword}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor='new-password'>
							Enter Your New Password
						</FormLabel>
						<FormInput
							type='password'
							id='new-password'
							required
							onChange={(event) => setNewPassword(event.target.value)}
							value={newPassword}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor='new-password-again'>
							Enter Your New Password Again
						</FormLabel>
						<FormInput
							type='password'
							id='new-password-again'
							required
							onChange={(event) => setNewPasswordAgain(event.target.value)}
							value={newPasswordAgain}
						/>
					</FormControl>
					{afterFormSubmitMessage.length !== 0 && (
						<div className={classes.warning}>
							<p>{afterFormSubmitMessage}</p>
						</div>
					)}
					<Button
						disabled={btnsDisabled}
						type='submit'
						className={classes.submitBtn}
					>
						Update Your Password
					</Button>
				</Form>
			</Fragment>
		</Modal>
	);
};

export default ChangeUserPasswordModal;
