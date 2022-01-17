import { Fragment, useState } from 'react';

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

	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setBtnsDisabled(true);
		setAfterFormSubmitMessage(() => <></>);

		if (email === user.email) {
			setAfterFormSubmitMessage(() => <p>There is no Change.</p>);
			setBtnsDisabled(false);
			return;
		}

		const emailValidated = validateEmail(email);

		if (!emailValidated) {
			setAfterFormSubmitMessage(() => <p>Email is not valid.</p>);
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
				return;
			}

			setPassword('');
			setBtnsDisabled(false);

			setShowModal(false);
		} catch (error) {
			setBtnsDisabled(false);
			console.error(error);
			setAfterFormSubmitMessage(() => <>{error.message}</>);
			return { status: 'error', message: error.message };
		}
	};

	return (
		<Modal
			showModal={showModal}
			click={() => setShowModal(false)}
			CloseButtonElement={(props) => (
				<Button title='Close Modal' {...props}>
					Close
				</Button>
			)}
		>
			<Fragment key='header'>
				<h2>Change Your Email</h2>
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

					<div>{AfterFormSubmitMessage}</div>

					<FormControl>
						<Button title='Submit Form' disabled={btnsDisabled} type='submit'>
							Submit
						</Button>
					</FormControl>
				</Form>
			</Fragment>
		</Modal>
	);
};

export default ChangeUserEmailModal;
