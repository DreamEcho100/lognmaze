import { useContext, useRef, useState } from 'react';

import classes from './SignUp.module.css';

import UserContext from '../../../store/UserContext';

const SignUp = () => {
	const { handleSignUp } = useContext(UserContext);

	const firstNameInputRef = useRef();
	const lastNameInputRef = useRef();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const submitHandler = async (event) => {
		event.preventDefault();

		const enteredFirstName = firstNameInputRef.current.value;
		const enteredLastName = lastNameInputRef.current.value;
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		// optional: Add validation

		setAfterFormSubmitMessage('');
		setBtnsDisabled(true);
		const { status, message } = await handleSignUp({
			firstName: enteredFirstName,
			lastName: enteredLastName,
			email: enteredEmail,
			password: enteredPassword,
		});

		if (status === 'error') {
			console.error(message);
			setAfterFormSubmitMessage(message);
		}

		setBtnsDisabled(false);
	};

	return (
		<form onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor='firstName'>Your First Name</label>
				<input type='text' id='firstName' required ref={firstNameInputRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='lastName'>Your last Name</label>
				<input type='text' id='lastName' required ref={lastNameInputRef} />
			</div>
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
					Create Account
				</button>
				{/* <button
					disabled={btnsDisabled}
					type='button'
					className={classes.toggleBtn}
					onClick={switchAuthModeHandler}
				>
					Or login with an existing account
				</button> */}
			</div>
		</form>
	);
};

export default SignUp;
