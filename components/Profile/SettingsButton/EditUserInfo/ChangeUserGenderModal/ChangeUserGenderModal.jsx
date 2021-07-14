import { Fragment, useContext, useState } from 'react';
import { useRouter } from 'next/router';

import classes from './ChangeUserGenderModal.module.css';

import BoxShadowClasses from '@/components/UI/V1/BoxShadow.module.css';

import UserContext from '@/store/UserContext';

import Modal from '@/components/UI/V1/Modal/Modal';
import Form from '@/components/UI/V1/Form/Form';
import FormControl from '@/components/UI/V1/FormControl/FormControl';
import FormLabel from '@/components/UI/V1/FormLabel/FormLabel';
import FormInput from '@/components/UI/V1/FormInput/FormInput';
import Button from '@/components/UI/V1/Button/Button';

const ChangeUserGenderModal = ({ closeModal }) => {
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

				closeModal();
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
				<h1>Change Your Gender</h1>
			</Fragment>
			<Fragment key='body'>
				<Form
					extraClasses={`${BoxShadowClasses['box-shadow']}`}
					onSubmit={submitHandler}
				>
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
					</FormControl>
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

export default ChangeUserGenderModal;
