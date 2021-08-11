import { Fragment, useContext, useState } from 'react';

import classes from './ChangeUserPasswordModal.module.css';

import UserContext from '@store/UserContext';

import Modal from '@components/UI/V1/Modal';
import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';
import Button from '@components/UI/V1/Button';

const ChangeUserPasswordModal = ({ showModal, setShowModal }) => {
	const { handleChangePassword } = useContext(UserContext);

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
			const { status, message } = await handleChangePassword(
				oldPassword,
				newPassword
			);

			if (status === 'error') {
				setBtnsDisabled(false);
				setAfterFormSubmitMessage(message);
				return;
			}

			setShowModal(false);
		} catch (error) {
			setBtnsDisabled(false);
			console.error(error);
			setAfterFormSubmitMessage(error.message);
			return { status: 'error', message: error.message };
		}
	};

	return (
		<Modal
			showModal={showModal}
			click={() => setShowModal(false)}
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
						<Label htmlFor='old-password'>Enter Your Old Password</Label>
						<Input
							type='password'
							id='old-password'
							required
							onChange={(event) => setOldPassword(event.target.value)}
							value={oldPassword}
						/>
					</FormControl>
					<FormControl>
						<Label htmlFor='new-password'>Enter Your New Password</Label>
						<Input
							type='password'
							id='new-password'
							required
							onChange={(event) => setNewPassword(event.target.value)}
							value={newPassword}
						/>
					</FormControl>
					<FormControl>
						<Label htmlFor='new-password-again'>
							Enter Your New Password Again
						</Label>
						<Input
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
						Submit
					</Button>
				</Form>
			</Fragment>
		</Modal>
	);
};

export default ChangeUserPasswordModal;
