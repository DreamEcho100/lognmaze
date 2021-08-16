import { useContext, useState } from 'react';

import classes from './SignIn.module.css';
import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';

import UserContext from '@store/UserContext';

import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';

import Button from '@components/UI/V1/Button';

const SignIn = () => {
	const UserCxt = useContext(UserContext);

	const [values, setValues] = useState({
		email: '',
		password: '',
	});

	const { handleSignIn } = UserCxt;

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const submitHandler = async (event) => {
		event.preventDefault();

		// Add validation

		setAfterFormSubmitMessage('');
		setBtnsDisabled(true);
		const { status, message } = await handleSignIn(values).then((response) => {
			setBtnsDisabled(false);
			return response;
		});

		if (status === 'error') {
			console.error(message);
			setBtnsDisabled(false);
			setAfterFormSubmitMessage(message);
		}
	};

	return (
		<Form
			extraClasses={`${BoxShadowClasses['box-shadow']}`}
			className={classes['sign-in-form']}
			onSubmit={submitHandler}
		>
			<FormControl className={classes.control}>
				<Label htmlFor='email'>Your Email</Label>
				<Input
					type='email'
					name='email'
					id='email'
					required
					value={values.email}
					setValues={setValues}
				/>
			</FormControl>
			<FormControl className={classes.control}>
				<Label htmlFor='password'>Your Password</Label>
				<Input
					type='password'
					name='password'
					id='password'
					required
					value={values.password}
					setValues={setValues}
				/>
			</FormControl>
			{afterFormSubmitMessage.length !== 0 && (
				<div className={classes.warning}>
					<p>{afterFormSubmitMessage}</p>
				</div>
			)}
			<FormControl extraClasses='align-center' className={classes.actions}>
				<Button
					title='Sign In'
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
