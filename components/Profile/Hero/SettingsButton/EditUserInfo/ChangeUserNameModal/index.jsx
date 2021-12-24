import { Fragment, useState } from 'react';

import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';

import Modal from '@components/UI/V1/Modal';
import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import FormControls from '@components/UI/V1/FormControls/FormControls';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';
import Button from '@components/UI/V1/Button';

const ChangeUserNameModal = ({
	user,
	token,
	userDispatch,
	handleUpdateUserData,
	showModal,
	setShowModal,
}) => {
	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);
	const [password, setPassword] = useState('');

	const [AfterFormSubmitMessage, setAfterFormSubmitMessage] = useState(() => (
		<></>
	));
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const submitHandler = async (event) => {
		event.preventDefault();
		setBtnsDisabled(true);
		setAfterFormSubmitMessage(() => <></>);

		if (firstName === user.first_name && lastName === user.last_name) {
			setAfterFormSubmitMessage(() => <p>There is no Change.</p>);
			setBtnsDisabled(false);
			return;
		}

		const fieldsCheck = [];

		if (firstName.trim().replace(/\s{2,}/g, '').length < 3)
			fieldsCheck.push('First name is less than 3 characters.');
		else if (firstName.trim().replace(/\s{2,}/g, '').length > 60)
			fieldsCheck.push('First name is more than 60 characters.');

		if (lastName.trim().replace(/\s{2,}/g, '').length < 3)
			fieldsCheck.push('Last name is less than 3 characters.');
		else if (lastName.trim().replace(/\s{2,}/g, '').length > 60)
			fieldsCheck.push('Last name is more than 60 characters.');

		if (password.length < 8)
			fieldsCheck.push('Password is less than 8 characters.');

		if (fieldsCheck.length > 0) {
			setAfterFormSubmitMessage(() => (
				<ul>
					{fieldsCheck.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			));
			setBtnsDisabled(false);
			return;
		}

		const { status, message } = await handleUpdateUserData({
			dispatch: userDispatch,
			userData: user,
			values: { first_name: firstName, last_name: lastName },
			password,
			token,
		}).catch((error) => {
			return { status: 'error', message: error.message };
		});

		if (status === 'error') {
			setBtnsDisabled(false);
			console.error(message);
			setAfterFormSubmitMessage(() => <>{message}</>);
			return { status, message };
		}

		setPassword('');
		setBtnsDisabled(false);

		setShowModal(false);
		return { status, message };
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
				<h2>Change Your First {'&/Or'} Last Name</h2>
			</Fragment>
			<Fragment key='body'>
				<Form
					extraClasses={`${BoxShadowClasses['box-shadow']}`}
					onSubmit={submitHandler}
				>
					<FormControls>
						<FormControl>
							<Label htmlFor='firstName'>Your First Name</Label>
							<Input
								type='text'
								id='firstName'
								required
								onChange={(event) => setFirstName(event.target.value)}
								value={firstName}
							/>
						</FormControl>
						<FormControl>
							<Label htmlFor='lastName'>Your last Name</Label>
							<Input
								type='text'
								id='lastName'
								required
								onChange={(event) => setLastName(event.target.value)}
								value={lastName}
							/>
						</FormControl>
					</FormControls>
					<FormControl>
						<Label htmlFor='password-to-change-basic-info-in-settings'>
							Enter Your Password
						</Label>
						<Input
							type='password'
							id='password-to-change-basic-info-in-settings'
							required
							onChange={(event) => setPassword(event.target.value)}
							value={password}
						/>
					</FormControl>

					<div>{AfterFormSubmitMessage}</div>

					<Button title='Submit Form' disabled={btnsDisabled} type='submit'>
						Submit
					</Button>
				</Form>
			</Fragment>
		</Modal>
	);
};

export default ChangeUserNameModal;
