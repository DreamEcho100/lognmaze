import { Fragment, useContext, useState } from 'react';

import classes from './ChangeUserEmailModal.module.css';

import UserContext from '../../../../../../store/UserContext';

import Modal from '../../../../../UI/V1/Modal/Modal';
import Form from '../../../../../UI/V1/Form/Form';
import FormControl from '../../../../../UI/V1/FormControl/FormControl';
import FormLabel from '../../../../../UI/V1/FormLabel/FormLabel';
import FormInput from '../../../../../UI/V1/FormInput/FormInput';
import Button from '../../../../../UI/V1/Button/Button';

const ChangeUserEmailModal = ({ closeModal }) => {
	const { user } = useContext(UserContext);

	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

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
				<h1>Change Your Email</h1>
			</Fragment>
			<Fragment key='body'>
				<Form>
					<FormControl>
						<FormLabel htmlFor='email'>Your Email</FormLabel>
						<FormInput
							type='email'
							id='email'
							required
							onChange={(event) => setEmail(event.target.value)}
							value={email}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor='password-to-change-email-in-settings'>
							Enter Your Password
						</FormLabel>
						<FormInput
							type='password'
							id='password-to-change-email-in-settings'
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
						Update Your Email
					</Button>
				</Form>
			</Fragment>
		</Modal>
	);
};

export default ChangeUserEmailModal;
