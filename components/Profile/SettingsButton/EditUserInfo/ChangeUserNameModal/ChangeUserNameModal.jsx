import { Fragment, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import classes from './ChangeUserNameModal.module.css';

import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';

import UserContext from '@store/UserContext';

import Modal from '@components/UI/V1/Modal/Modal';
import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl/FormControl';
import FormControls from '@components/UI/V1/FormControls/FormControls';
import FormLabel from '@components/UI/V1/FormLabel/FormLabel';
import FormInput from '@components/UI/V1/FormInput/FormInput';
import Button from '@components/UI/V1/Button';

const ChangeUserNameModal = ({ closeModal }) => {
	const router = useRouter();

	const { user, handleChangeUserName } = useContext(UserContext);

	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);
	const [password, setPassword] = useState('');

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const submitHandler = async (event) => {
		event.preventDefault();

		setBtnsDisabled(true);
		/*const { status, message } =*/ await handleChangeUserName({
			firstName,
			lastName,
			password,
		})
			.then(({ status, message }) => {
				if (status === 'error') {
					setBtnsDisabled(false);
					setAfterFormSubmitMessage(message);
					return { status, message };
				}

				closeModal();
				return { status, message };
			})
			.then(({ status, message }) => {
				if (status === 'success') {
				}
				return { status, message };
			})
			.catch((error) => {
				setBtnsDisabled(false);
				console.error(error);
				setAfterFormSubmitMessage(error.message);
				return { status: 'error', message: error.message };
			});

		if (btnsDisabled) setBtnsDisabled(false);
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
				<h1>Change Your Basic Info</h1>
			</Fragment>
			<Fragment key='body'>
				<Form
					extraClasses={`${BoxShadowClasses['box-shadow']}`}
					onSubmit={submitHandler}
				>
					<FormControls>
						<FormControl>
							<FormLabel htmlFor='firstName'>Your First Name</FormLabel>
							<FormInput
								type='text'
								id='firstName'
								required
								onChange={(event) => setFirstName(event.target.value)}
								value={firstName}
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor='lastName'>Your last Name</FormLabel>
							<FormInput
								type='text'
								id='lastName'
								required
								onChange={(event) => setLastName(event.target.value)}
								value={lastName}
							/>
						</FormControl>
					</FormControls>
					<FormControl>
						<FormLabel htmlFor='password-to-change-basic-info-in-settings'>
							Enter Your Password
						</FormLabel>
						<FormInput
							type='password'
							id='password-to-change-basic-info-in-settings'
							required
							onChange={(event) => setPassword(event.target.value)}
							value={password}
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

export default ChangeUserNameModal;
