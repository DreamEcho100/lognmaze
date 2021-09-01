import { Fragment, useState } from 'react';

import classes from './ChangeUserPasswordModal.module.css';

import { validatePasswordStrength } from '@lib/v1/validate';

import Modal from '@components/UI/V1/Modal';
import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';
import Button from '@components/UI/V1/Button';

const ChangeUserPasswordModal = ({
	token,
	handleUpdateUserPassword,
	showModal,
	setShowModal,
}) => {
	const [oldPassword, setOldPassword] = useState('');
	const [newPasswordAgain, setNewPasswordAgain] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const emptyInputs = () => {
		setOldPassword('');
		setNewPasswordAgain('');
		setNewPassword('');
	};

	const [AfterFormSubmitMessage, setAfterFormSubmitMessage] = useState(() => (
		<></>
	));
	const [afterFormSubmitMessageExist, setAfterFormSubmitMessageExist] =
		useState(false);
	const [buttonsDisabled, setBtnsDisabled] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setBtnsDisabled(true);

		if (oldPassword === newPassword) {
			setAfterFormSubmitMessage(() => (
				<p>Old password and new password match?</p>
			));
			setButtonsDisabled(false);
			return;
		}

		if (newPasswordAgain !== newPassword) {
			setAfterFormSubmitMessage(() => <p>New password doesn't match!</p>);
			setBtnsDisabled(false);
			return;
		}

		if (
			oldPassword.length === 0 ||
			newPasswordAgain.length === 0 ||
			newPassword.length === 0
		) {
			setAfterFormSubmitMessage(() => <p>Empty field/s!</p>);
			setBtnsDisabled(false);
			return;
		}

		const passwordValidated = validatePasswordStrength(newPassword);
		if (passwordValidated.strength !== 'strong') {
			setAfterFormSubmitMessage(() => {
				return (
					<>
						<p>New password strength is {passwordValidated.strength}</p>
						<p>Strong password requirements:</p>
						<ul>
							{passwordValidated.strongPasswordRequirements.map(
								(item, index) => (
									<li key={index}>{item}</li>
								)
							)}
						</ul>
					</>
				);
			});
			setAfterFormSubmitMessageExist(true);
			setBtnsDisabled(false);
			return;
		}

		try {
			const { status, message } = await handleUpdateUserPassword({
				bodyObj: {
					oldPassword,
					newPassword,
				},
				token,
			});

			if (status === 'error') {
				setBtnsDisabled(false);
				console.error(message);
				setAfterFormSubmitMessage(() => <>{message}</>);
				setAfterFormSubmitMessageExist(true);
				return;
			}

			emptyInputs();
			setBtnsDisabled(false);

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
				<Button title='Close' {...props}>
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
					{afterFormSubmitMessageExist && (
						<div className={classes.warning}>{AfterFormSubmitMessage}</div>
					)}
					<Button
						title='Submit'
						disabled={buttonsDisabled}
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
