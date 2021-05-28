import { useContext, useState } from 'react';

import classes from './SignUp.module.css';
import BoxShadowClasses from '../../UI/V1/BoxShadow.module.css';

import UserContext from '../../../store/UserContext';

import Form from '../../UI/V1/Form/Form';
import FormControl from '../../UI/V1/FormControl/FormControl';
import FormControls from '../../UI/V1/FormControls/FormControls';
import FormLabel from '../../UI/V1/FormLabel/FormLabel';
import FormInput from '../../UI/V1/FormInput/FormInput';
import Button from '../../UI/V1/Button/Button';

const SignUp = () => {
	const { handleSignUp } = useContext(UserContext);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [gender, setChoosedGender] = useState('');

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const handleUserName = () => {
		return `${firstName}-${lastName}`.replace(/[^\w-\_]/gi, '').toLowerCase();
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		const userName = handleUserName();

		// optional: Add validation

		setAfterFormSubmitMessage('');
		setBtnsDisabled(true);
		const { status, message } = await handleSignUp({
			firstName,
			lastName,
			userName,
			email,
			password,
			gender,
		});

		if (status === 'error') {
			console.error(message);
			setAfterFormSubmitMessage(message);
		}

		setBtnsDisabled(false);
	};

	return (
		<Form
			extraClasses={`${BoxShadowClasses['box-shadow']}`}
			onSubmit={submitHandler}
		>
			<FormControls>
				<FormControl>
					<FormLabel htmlFor='firstName'>Your First Name</FormLabel>
					<FormInput
						type='text'
						id='firstName'
						required
						onChange={(event) => setFirstName(event.target.value)}
						value={firstName}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor='lastName'>Your last Name</FormLabel>
					<FormInput
						type='text'
						id='lastName'
						required
						onChange={(event) => setLastName(event.target.value)}
						value={lastName}
					/>
				</FormControl>
			</FormControls>
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
				<FormLabel htmlFor='password'>Your Password</FormLabel>
				<FormInput
					type='password'
					id='password'
					required
					onChange={(event) => setPassword(event.target.value)}
					value={password}
				/>
			</FormControl>
			<FormControl>
				<FormInput
					defaultClasses='form-input-radio'
					type='radio'
					name='gender'
					value='male'
					id='male'
					onChange={(event) => {
						setChoosedGender(event.target.value);
					}}
				/>
				<FormLabel htmlFor='male'>Male</FormLabel>
			</FormControl>
			<FormControl>
				<FormInput
					defaultClasses='form-input-radio'
					type='radio'
					name='gender'
					value='female'
					id='female'
					onChange={(event) => {
						setChoosedGender(event.target.value);
					}}
				/>
				<FormLabel htmlFor='female'>Female</FormLabel>
			</FormControl>
			{afterFormSubmitMessage.length !== 0 && (
				<div className={classes.warning}>
					<p>{afterFormSubmitMessage}</p>
				</div>
			)}
			<div className={classes.actions}>
				<Button
					disabled={btnsDisabled}
					type='submit'
					className={classes.submitBtn}
				>
					Create Account
				</Button>
			</div>
		</Form>
	);
};

export default SignUp;
