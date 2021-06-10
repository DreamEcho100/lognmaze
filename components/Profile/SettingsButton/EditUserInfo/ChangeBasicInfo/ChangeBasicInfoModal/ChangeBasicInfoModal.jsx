import React from 'react';
import { Fragment, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import classes from './ChangeBasicInfoModal.module.css';

import BoxShadowClasses from '../../../../../UI/V1/BoxShadow.module.css';

import UserContext from '../../../../../../store/UserContext';

import Modal from '../../../../../UI/V1/Modal/Modal';
import Form from '../../../../../UI/V1/Form/Form';
import FormControl from '../../../../../UI/V1/FormControl/FormControl';
import FormControls from '../../../../../UI/V1/FormControls/FormControls';
import FormLabel from '../../../../../UI/V1/FormLabel/FormLabel';
import FormInput from '../../../../../UI/V1/FormInput/FormInput';
import Button from '../../../../../UI/V1/Button/Button';

const ChangeBasicInfoModal = ({ closeModal }) => {
	const router = useRouter();

	const { user, handleUpdateBasicInfo } = useContext(UserContext);

	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);
	const [gender, setChoosedGender] = useState(user.gender);
	const [password, setPassword] = useState('');

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const handleUserName = () => {
		return `${firstName}-${lastName}`
			.replace(/[^\w-\_]/gi, '-')
			.replace(/(-{2,})/gi, '-')
			.replace(/^-/, '')
			.toLowerCase();
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		const userName = handleUserName();

		setBtnsDisabled(true);
		/*const { status, message } =*/ await handleUpdateBasicInfo({
			firstName,
			lastName,
			userName,
			gender,
			password,
		})
			.then(({ status, message }) => {
				if (status === 'error') {
					setBtnsDisabled(false);
					// throw new Error(message);
					setAfterFormSubmitMessage(message);
					return { status, message };
				}

				closeModal();
				return { status, message };
			})
			.then(({ status, message }) => {
				if (status === 'success') {
					router.replace('/');
				}
				return { status, message };
			})
			.catch((error) => {
				setBtnsDisabled(false);
				console.error(error);
				setAfterFormSubmitMessage(error.message);
				return { status: 'error', message: error.message };
			});
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
						<FormInput
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
						<FormLabel htmlFor='male'>Male</FormLabel>
					</FormControl>
					<FormControl>
						<FormInput
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
						<FormLabel htmlFor='female'>Female</FormLabel>
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
						Update Your Basic Info
					</Button>
				</Form>
			</Fragment>
		</Modal>
	);
};

export default ChangeBasicInfoModal;
