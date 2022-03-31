import { FormEvent, useState } from 'react';

import classes from './index.module.css';
import borderClasses from '@styles/border.module.css';
import boxShadowClasses from '@styles/boxShadow.module.css';

import {
	// IUserAuthenticatedData,
	TUserAuthenticatedDataEmail,
} from '@coreLib/ts/global';
import { useUserSharedState } from '@store/UserContext';
import { loginUserRequestAction } from '@store/UserContext/actions';
import { validateEmail } from '@commonLibIndependent/validate';

import FormControlComponent from '@commonComponentsIndependent/FormControl';
import FormComponent from '@commonComponentsIndependent/Form';
import LabelComponent from '@commonComponentsIndependent/Label';
import InputComponent from '@commonComponentsIndependent/Input';
import ButtonComponent from '@commonComponentsIndependent/Button';
import MessagesListComponent from '@commonComponentsIndependent/MessagesList';

const LoginComponent = () => {
	const [
		{
			actions: {
				requests: { login: loginRequest },
			},
		},
		userDispatch,
	] = useUserSharedState();

	const [values, setValues] = useState<{
		email: TUserAuthenticatedDataEmail;
		password: string;
	}>({
		email: '',
		password: '',
	});
	const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault();

		setIsButtonsDisabled(true);
		// setAfterFormSubmitMessage(() => <></>);

		const emailValidated = validateEmail(values.email);

		const fieldsCheck = [];

		if (!emailValidated) fieldsCheck.push('Email is not valid.');

		if (values.password.length < 8)
			fieldsCheck.push('Password is less than 8 characters.');

		if (fieldsCheck.length > 0) {
			// setAfterFormSubmitMessage(() => (
			// 	<ul>
			// 		{fieldsCheck.map((item, index) => (
			// 			<li key={index}>{item}</li>
			// 		))}
			// 	</ul>
			// ));
			setIsButtonsDisabled(false);
			return;
		}

		await loginUserRequestAction(userDispatch, {
			bodyContent: {
				auth_type: 'login',
				...values,
			},
		});
		setIsButtonsDisabled(false);
	};

	return (
		<FormComponent
			className={`${classes.loginForm} ${borderClasses.default} ${boxShadowClasses.default}`}
			onSubmit={submitHandler}
		>
			<FormControlComponent className={classes.formControl}>
				<LabelComponent htmlFor='email'>Your Email</LabelComponent>
				<InputComponent
					type='email'
					inputMode='email'
					name='email'
					id='email'
					required
					value={values.email}
					setValues={setValues}
				/>
			</FormControlComponent>
			<FormControlComponent className={classes.formControl}>
				<LabelComponent htmlFor='password'>Your Password</LabelComponent>
				<InputComponent
					type='password'
					// inputMode='password'
					name='password'
					id='password'
					required
					value={values.password}
					setValues={setValues}
				/>
			</FormControlComponent>

			{/* <div className={classes.warning}>{AfterFormSubmitMessage}</div> */}
			{loginRequest.errorMessage && (
				<MessagesListComponent variant='danger'>
					<li>{loginRequest.errorMessage}</li>
				</MessagesListComponent>
			)}

			<FormControlComponent className={classes.formControl}>
				<ButtonComponent
					title='Log In'
					disabled={isButtonsDisabled}
					type='submit'
					className={classes.submitButton}
				>
					Login
				</ButtonComponent>
			</FormControlComponent>
		</FormComponent>
	);
};

export default LoginComponent;
