import { Fragment, useState } from 'react';

import classes from './ChangeUserPassword.module.css';

import Accordion from '../../../../../UI/V1/Accordion/Accordion';
import Form from '../../../../../UI/V1/Form/Form';
import FormControl from '../../../../../UI/V1/FormControl/FormControl';
import FormLabel from '../../../../../UI/V1/FormLabel/FormLabel';
import FormInput from '../../../../../UI/V1/FormInput/FormInput';
import Button from '../../../../../UI/V1/Button/Button';

const ChangeUserPassword = () => {
	const [oldPassword, setOldPassword] = useState('');
	const [oldPasswordAgain, setOldPasswordAgain] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	return (
		<Accordion toggltButtonSize={0.9} accordionContainerBorderBottomSize={0.9}>
			<Fragment key='header'>
				<h3>Change User Password</h3>
			</Fragment>
			<Fragment key='body'>
				<Form>
					<FormControl>
						<FormLabel htmlFor='old-password'>
							Enter Your Old Password
						</FormLabel>
						<FormInput
							type='password'
							id='old-password'
							required
							onChange={(event) => setOldPassword(event.target.value)}
							value={oldPassword}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor='old-password-again'>
							Enter Your Old Password Again
						</FormLabel>
						<FormInput
							type='password'
							id='old-password-again'
							required
							onChange={(event) => setOldPasswordAgain(event.target.value)}
							value={oldPasswordAgain}
						/>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor='new-password'>
							Enter Your New Password
						</FormLabel>
						<FormInput
							type='password'
							id='new-password'
							required
							onChange={(event) => setNewPassword(event.target.value)}
							value={newPassword}
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
						Update Account
					</Button>
				</Form>
			</Fragment>
		</Accordion>
	);
};

export default ChangeUserPassword;
