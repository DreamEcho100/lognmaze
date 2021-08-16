import { Fragment, useContext, useState } from 'react';
// import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import classes from './ChangeUserNameModal.module.css';

import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';

import UserContext from '@store/UserContext';

// const DynamicModal = dynamic(() => import('@components/UI/V1/Modal'));

import Modal from '@components/UI/V1/Modal';
import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import FormControls from '@components/UI/V1/FormControls/FormControls';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';
import Button from '@components/UI/V1/Button';

const ChangeUserNameModal = ({ showModal, setShowModal }) => {
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
					console.error(message);
					setAfterFormSubmitMessage(message);
					return { status, message };
				}

				setPassword('');
				setBtnsDisabled(false);

				setShowModal(false);
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
			// DynamicModal
			showModal={showModal}
			click={() => setShowModal(false)}
			CloseButtonElement={(props) => (
				<Button title='Close' {...props}>
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
					{afterFormSubmitMessage.length !== 0 && (
						<div className={classes.warning}>
							<p>{afterFormSubmitMessage}</p>
						</div>
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

export default ChangeUserNameModal;
