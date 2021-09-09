import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import classes from './SignIn.module.css';
import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';

import { validateEmail } from '@lib/v1/validate';
import { handleSignIn } from '@store/UserContext/actions';
import UserContext from '@store/UserContext';

import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';

import Button from '@components/UI/V1/Button';

const SignIn = () => {
	const router = useRouter();

	const { dispatch: userDispatch } = useContext(UserContext);

	const [values, setValues] = useState({
		email: '',
		password: '',
	});

	const [AfterFormSubmitMessage, setAfterFormSubmitMessage] = useState(() => (
		<></>
	));
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const submitHandler = async (event) => {
		event.preventDefault();

		setBtnsDisabled(true);
		setAfterFormSubmitMessage(() => <></>);

		const emailValidated = validateEmail(values.email);

		const fieldsCheck = [];

		if (!emailValidated) fieldsCheck.push('Email is not valid.');

		if (values.password.length < 8)
			fieldsCheck.push('Password is less than 8 characters.');

		if (fieldsCheck.length > 0) {
			setAfterFormSubmitMessage(() => (
				<ul>
					{fieldsCheck.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			));
			setBtnsDisabled(false);
			return;
		}

		const { status, message } = await handleSignIn({
			dispatch: userDispatch,
			data: values,
		}).then((response) => {
			setBtnsDisabled(false);
			return response;
		});

		if (status === 'error') {
			console.error(message);
			setAfterFormSubmitMessage(() => <>{message}</>);
			setBtnsDisabled(false);
			return;
		}

		router.replace('/');
	};

	return (
		<Form
			extraClasses={`${BoxShadowClasses['box-shadow']}`}
			className={classes['sign-in-form']}
			onSubmit={submitHandler}
		>
			<FormControl extraClasses='align-center' className={classes.control}>
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
			<FormControl extraClasses='align-center' className={classes.control}>
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

			<div className={classes.warning}>{AfterFormSubmitMessage}</div>

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
