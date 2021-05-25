import { useContext, useRef, useState } from 'react';

import classes from './SignIn.module.css';

import UserContext from '../../../store/UserContext';

const SignIn = () => {
	const UserCxt = useContext(UserContext);

	const { handleSignIn } = UserCxt;

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const submitHandler = async (event) => {
		event.preventDefault();

		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		// optional: Add validation

		setAfterFormSubmitMessage('');
		setBtnsDisabled(true);
		const { status, message } = await handleSignIn({
			email: enteredEmail,
			password: enteredPassword,
		});

		if (status === 'error') {
			console.error(message);
			setAfterFormSubmitMessage(message);
		}
		setBtnsDisabled(false);
		// clearInputsForm();
	};

	return (
		<form onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor='email'>Your Email</label>
				<input type='email' id='email' required ref={emailInputRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='password'>Your Password</label>
				<input type='password' id='password' required ref={passwordInputRef} />
			</div>
			{afterFormSubmitMessage.length !== 0 && (
				<div className={classes.warning}>
					<p>{afterFormSubmitMessage}</p>
				</div>
			)}
			<div className={classes.actions}>
				<button
					disabled={btnsDisabled}
					type='submit'
					className={classes.submitBtn}
				>
					Sign In
				</button>
			</div>
		</form>
	);
};

export default SignIn;
