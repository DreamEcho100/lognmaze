import { useRef } from 'react';
import classes from './Form.module.css';

const Form = ({
	onChangePassword,
	isPasswordChanging,
	setIsPasswordChanging,
	message,
	setMessage,
}) => {
	const oldPasswordRef = useRef();
	const newPasswordRef = useRef();
	const newPasswordAgainRef = useRef();

	const submitHandler = () => {
		/*

		event.preventDefault();

		const enteredOldPassword = oldPasswordRef.current.value;
		const enteredNewPassword = newPasswordRef.current.value;
		const enteredNewPasswordAgain = newPasswordAgainRef.current.value;

		if (enteredNewPassword !== enteredNewPasswordAgain) {
			setMessage({
				status: 'error',
				message: 'passwords are not identical, please enter again.',
			});
			return;
		}

		// optional: Add validation

		setIsPasswordChanging(false);

		await onChangePassword({
			oldPassword: enteredOldPassword,
			newPassword: enteredNewPassword,
		});

		setIsPasswordChanging(true);
    */
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor='old-password'>Old Password</label>
				<input type='password' id='old-password' ref={oldPasswordRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='new-password'>New Password</label>
				<input type='password' id='new-password' ref={newPasswordRef} />
			</div>
			<div className={classes.control}>
				<label htmlFor='new-password'>Enter New Password Again</label>
				<input
					type='password'
					id='new-password-again'
					ref={newPasswordAgainRef}
				/>
			</div>
			{message.message.length !== 0 && (
				<div className={`${classes.message} ${classes[message.status]}`}>
					<p>{message.message}</p>
				</div>
			)}
			<div className={classes.action}>
				<button
					className={classes.submitBtn}
					disabled={!isPasswordChanging}
					type='submit'
				>
					Change Password
				</button>
			</div>
		</form>
	);
};

export default Form;
