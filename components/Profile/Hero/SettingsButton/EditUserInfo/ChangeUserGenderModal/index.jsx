import { Fragment, useState } from 'react';

import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';

import Modal from '@components/UI/V1/Modal';
import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';
import Button from '@components/UI/V1/Button';

const ChangeUserGenderModal = ({
	user,
	token,
	userDispatch,
	handleUpdateUserData,
	showModal,
	setShowModal,
}) => {
	const [gender, setChoosedGender] = useState(user.gender);
	const [password, setPassword] = useState('');

	const [AfterFormSubmitMessage, setAfterFormSubmitMessage] = useState(() => (
		<></>
	));
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const submitHandler = async (event) => {
		event.preventDefault();
		setBtnsDisabled(true);
		setAfterFormSubmitMessage(() => <></>);

		if (gender === user.gender) {
			setAfterFormSubmitMessage(() => <p>There is no Change.</p>);
			setBtnsDisabled(false);
			return;
		}

		const fieldsCheck = [];

		if (
			!['male', 'female'].includes(gender)
			// values.gender !== 'male' && values.gender !== 'female'
		)
			fieldsCheck.push('Gender is not specified.');

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
			values: {
				gender,
			},
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
				<h1>Change Your Gender</h1>
			</Fragment>
			<Fragment key='body'>
				<Form
					extraClasses={`${BoxShadowClasses['box-shadow']}`}
					onSubmit={submitHandler}
				>
					<FormControl>
						<Input
							defaultClasses='form-input-radio'
							type='radio'
							name='gender'
							defaultChecked={gender === 'male' ? true : false}
							value='male'
							id='male'
							onChange={(event) => {
								setChoosedGender(event.target.value);
							}}
						/>
						<Label htmlFor='male'>Male</Label>
					</FormControl>
					<FormControl>
						<Input
							defaultClasses='form-input-radio'
							type='radio'
							name='gender'
							defaultChecked={gender === 'female' ? true : false}
							value='female'
							id='female'
							onChange={(event) => {
								setChoosedGender(event.target.value);
							}}
						/>
						<Label htmlFor='female'>Female</Label>
					</FormControl>
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

export default ChangeUserGenderModal;
