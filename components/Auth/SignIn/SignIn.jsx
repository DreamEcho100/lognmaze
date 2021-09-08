import { useContext, useState } from 'react';
import Head from 'next/head';

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

		if (!emailValidated) {
			setAfterFormSubmitMessage(() => <p>There is something with the email</p>);
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
			setBtnsDisabled(false);
			setAfterFormSubmitMessage(() => <>{message}</>);
		}
	};

	return (
		<Form
			extraClasses={`${BoxShadowClasses['box-shadow']}`}
			className={classes['sign-in-form']}
			onSubmit={submitHandler}
		>
			<Head>
				<meta property='og:url' content={`https://lognmaze.com/auth/`} />
				<meta name='twitter:url' content={`https://lognmaze.com/auth/`} />

				<meta
					property='og:description'
					content='Sign in to LogNMaze | Create blogs, articles using Markdown and share them in
					your social media'
				/>
				<meta
					name='description'
					content='Sign in to LogNMaze | Create blogs, articles using Markdown and share them in
					your social media'
				/>
				<meta
					property='og:title'
					content='Sign in | LogNMaze | Create blogs, articles using Markdown and share them in
					your social media'
				/>
				<title>
					Sign in | LogNMaze | Create blogs, articles using Markdown and share
					them in your social media
				</title>
			</Head>
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
