import { useContext, useState } from 'react';

import classes from './SignIn.module.css';
import BoxShadowClasses from '../../UI/V1/BoxShadow.module.css';

import UserContext from '../../../store/UserContext';

import Form from '../../UI/V1/Form/Form';
import FormControl from '../../UI/V1/FormControl/FormControl';
// import FormControls from '../../UI/V1/FormControls/FormControls';
import FormLabel from '../../UI/V1/FormLabel/FormLabel';
import FormInput from '../../UI/V1/FormInput/FormInput';
import Button from '../../UI/V1/Button/Button';

const SignIn = () => {
	const UserCxt = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { handleSignIn } = UserCxt;

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const submitHandler = async (event) => {
		event.preventDefault();

		// optional: Add validation

		setAfterFormSubmitMessage('');
		setBtnsDisabled(true);
		const { status, message } = await handleSignIn({
			email,
			password,
		}).then((response) => {
			btnsDisabled && setBtnsDisabled(false);
			return response;
		});

		if (status === 'error') {
			console.error(message);
			btnsDisabled && setBtnsDisabled(false);
			setAfterFormSubmitMessage(message);
		}
		// clearInputsForm();
	};

	return (
		<Form
			extraClasses={`${BoxShadowClasses['box-shadow']}`}
			onSubmit={submitHandler}
		>
			<FormControl className={classes.control}>
				<FormLabel htmlFor='email'>Your Email</FormLabel>
				<FormInput
					type='email'
					id='email'
					required
					onChange={(event) => setEmail(event.target.value)}
				/>
			</FormControl>
			<FormControl className={classes.control}>
				<FormLabel htmlFor='password'>Your Password</FormLabel>
				<FormInput
					type='password'
					id='password'
					required
					onChange={(event) => setPassword(event.target.value)}
				/>
			</FormControl>
			{afterFormSubmitMessage.length !== 0 && (
				<div className={classes.warning}>
					<p>{afterFormSubmitMessage}</p>
				</div>
			)}
			<FormControl className={classes.actions}>
				<Button
					disabled={btnsDisabled}
					type='submit'
					className={classes.submitBtn}
				>
					Sign In
				</Button>
			</FormControl>
		</Form>
	);
};

export default SignIn;
