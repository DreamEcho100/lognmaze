import { Fragment, useContext, useState } from 'react';

import classes from './ChangeUserEmail.module.css';

import UserContext from '../../../../../../store/UserContext';

import Accordion from '../../../../../UI/V1/Accordion/Accordion';
import Form from '../../../../../UI/V1/Form/Form';
import FormControl from '../../../../../UI/V1/FormControl/FormControl';
import FormLabel from '../../../../../UI/V1/FormLabel/FormLabel';
import FormInput from '../../../../../UI/V1/FormInput/FormInput';
import Button from '../../../../../UI/V1/Button/Button';

const ChangeUserEmail = () => {
	const { user } = useContext(UserContext);

	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState('');

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	return (
		<Accordion toggltButtonSize={0.9} accordionContainerBorderBottomSize={0.9}>
			<Fragment key='header'>
				<h3>Change Your Email</h3>
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
		</Accordion>
	);
};

export default ChangeUserEmail;
