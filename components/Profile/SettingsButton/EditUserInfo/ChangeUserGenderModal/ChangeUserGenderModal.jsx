import { Fragment, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import classes from './ChangeUserGenderModal.module.css';

import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';

import UserContext from '@store/UserContext';

import Modal from '@components/UI/V1/Modal';
import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';
import Button from '@components/UI/V1/Button';

const ChangeUserGenderModal = ({ showModal, setShowModal }) => {
	const router = useRouter();

	const { user, handleChangeUserGender } = useContext(UserContext);

	const [gender, setChoosedGender] = useState(user.gender);
	const [password, setPassword] = useState('');

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const submitHandler = async (event) => {
		event.preventDefault();

		setBtnsDisabled(true);
		/*const { status, message } =*/ await handleChangeUserGender({
			gender,
			password,
		})
			.then(({ status, message }) => {
				if (status === 'error') {
					setBtnsDisabled(false);
					setAfterFormSubmitMessage(message);
					return { status, message };
				}

				setShowModal(false);
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
			showModal={showModal}
			click={() => setShowModal(false)}
			CloseButtonElement={(props) => (
				<Button type='button' {...props}>
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

export default ChangeUserGenderModal;
