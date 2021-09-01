import { Fragment, useState } from 'react';
import classes from './ChangeUserEmailModal.module.css';

import { validateEmail } from '@lib/v1/validate';

import Modal from '@components/UI/V1/Modal';
import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';
import Button from '@components/UI/V1/Button';

const ChangeUserEmailModal = ({
	user,
	token,
	userDispatch,
	handleUpdateUserData,
	showModal,
	setShowModal,
}) => {
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');

	const [AfterFormSubmitMessage, setAfterFormSubmitMessage] = useState(() => (
		<></>
	));
	const [afterFormSubmitMessageExist, setAfterFormSubmitMessageExist] =
		useState(false);

	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setBtnsDisabled(true);
		setAfterFormSubmitMessage(() => <></>);
		setAfterFormSubmitMessageExist(false);

		const emailValidated = validateEmail(email);

		if (!emailValidated) {
			setAfterFormSubmitMessage(() => <p>There is something with the email</p>);
			setAfterFormSubmitMessageExist(true);
			setBtnsDisabled(false);
			return;
		}

		try {
			const { status, message } = await handleUpdateUserData({
				dispatch: userDispatch,
				userData: user,
				values: { email },
				password,
				token,
			});

			if (status === 'error') {
				setBtnsDisabled(false);
				console.error(message);
				setAfterFormSubmitMessage(() => <>{message}</>);
				setAfterFormSubmitMessageExist(true);
				return;
			}

			setPassword('');
			setBtnsDisabled(false);

			setShowModal(false);
		} catch (error) {
			setBtnsDisabled(false);
			console.error(error);
			setAfterFormSubmitMessage(() => <>{error.message}</>);
			setAfterFormSubmitMessageExist(true);
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
				<h1>Change Your Email</h1>
			</Fragment>
			<Fragment key='body'>
				<Form onSubmit={handleSubmit}>
					<FormControl>
						<Label htmlFor='email'>Your Email</Label>
						<Input
							type='email'
							id='email'
							required
							onChange={(event) => setEmail(event.target.value)}
							value={email}
						/>
					</FormControl>
					<FormControl>
						<Label htmlFor='password-to-change-email-in-settings'>
							Enter Your Password
						</Label>
						<Input
							type='password'
							id='password-to-change-email-in-settings'
							required
							onChange={(event) => setPassword(event.target.value)}
							value={password}
						/>
					</FormControl>
					{afterFormSubmitMessageExist && (
						<div className={classes.warning}>{AfterFormSubmitMessage}</div>
					)}
					<Button
						title='Submit'
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

export default ChangeUserEmailModal;
