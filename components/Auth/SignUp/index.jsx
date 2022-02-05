import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import classes from './index.module.css';

import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';

import { validateEmail, validatePasswordStrength } from '@lib/v1/validate';
import { handleSignUp } from '@store/UserContext/actions';
import { useUserSharedState } from '@store/UserContext';

import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import FormControls from '@components/UI/V1/FormControls/FormControls';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';
import Select from '@components/UI/V1/Select/Select';
import Button from '@components/UI/V1/Button';

const SignUp = ({
	UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
}) => {
	const router = useRouter();

	const [userState, userDispatch] = useUserSharedState();

	const [values, setValues] = useState({
		first_name: '',
		last_name: '',
		user_name_id: '',
		email: '',
		password: '',
		date_of_birth: '',
		country: '',
		state: '',
		city: '',
		gender: '',
	});

	const [dateOfBirth, setDateOfBirth] = useState('');

	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);

	const [AfterFormSubmitMessage, setAfterFormSubmitMessage] = useState(() => (
		<></>
	));

	const [AfterFormSubmitPasswordMessage, setAfterFormSubmitPasswordMessage] =
		useState(() => <></>);

	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const handleGetCities = useCallback(
		async (state) => {
			// const state = values.state;

			setValues((prev) => ({
				...prev,
				city: '',
			}));
			try {
				const response = await fetch(
					`https://www.universal-tutorial.com/api/cities/${state}`,
					{
						method: 'GET',
						headers: {
							authorization: `Bearer ${UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN}`,
						},
					}
				)
					.then((response) => response.json())
					.then((data) => {
						return data;
					})
					.then((data) => {
						setCities(data);
						return data;
					})
					.then((data) => {
						setCities(data);
						if (data[0]) {
							setValues((prev) => ({
								...prev,
								city: data[0].city_name,
							}));
						}
					});
			} catch (error) {
				console.error(error);
			}
		},
		[UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN]
	);

	const handleGetStates = useCallback(
		async (country) => {
			// const country = values.country;

			setValues((prev) => ({
				...prev,
				state: '',
				city: '',
			}));

			try {
				const response = await fetch(
					`https://www.universal-tutorial.com/api/states/${country}`,
					{
						method: 'GET',
						headers: {
							authorization: `Bearer ${UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN}`,
						},
					}
				)
					.then((response) => response.json())
					.then((data) => {
						return data;
					})
					.then((data) => {
						setStates(data);
						return data;
					})
					.then(async (data) => {
						if (data[0]) {
							setValues((prev) => ({
								...prev,
								state: data[0].state_name,
							}));
						}
					});
			} catch (error) {
				console.error(error);
			}
		},
		[UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN]
	);

	const handleGetCountries = useCallback(async () => {
		if (
			!UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN ||
			UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN.length === 0
		) {
			setCountries([]);
			return;
		}

		setValues((prev) => ({
			...prev,
			country: '',
			state: '',
			city: '',
		}));
		try {
			const response = await fetch(
				'https://www.universal-tutorial.com/api/countries/',
				{
					method: 'GET',
					headers: {
						authorization: `Bearer ${UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN}`,
					},
				}
			)
				.then((response) => response.json())
				.then((data) => {
					setCountries(data);
					return data;
				})
				.then(async (data) => {
					setValues((prev) => ({
						...prev,
						country: data[0].country_name,
					}));
				});
		} catch (error) {
			console.error(error);
		}
	}, [UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN]);

	const submitHandler = async (event) => {
		event.preventDefault();

		setBtnsDisabled(true);
		setAfterFormSubmitMessage(() => <></>);
		setAfterFormSubmitPasswordMessage(() => <></>);

		const emailValidated = validateEmail(values.email);
		const passwordValidated = validatePasswordStrength(values.password);

		const fieldsCheck = [];

		if (values.first_name.trim().replace(/\s{2,}/g, '').length < 3)
			fieldsCheck.push('First name is less than 3 characters.');
		else if (values.first_name.trim().replace(/\s{2,}/g, '').length > 60)
			fieldsCheck.push('First name is more than 60 characters.');

		if (values.last_name.trim().replace(/\s{2,}/g, '').length < 3)
			fieldsCheck.push('Last name is less than 3 characters.');
		else if (values.last_name.trim().replace(/\s{2,}/g, '').length > 60)
			fieldsCheck.push('Last name is more than 60 characters.');

		if (values.user_name_id.trim().replace(/\s{2,}/g, '').length < 3)
			fieldsCheck.push('User name id is less than 3 characters.');
		else if (values.user_name_id.trim().replace(/\s{2,}/g, '').length > 60)
			fieldsCheck.push('User name id is more than 60 characters.');

		if (!emailValidated) fieldsCheck.push('Email is not valid.');

		if (isNaN(new Date(values.date_of_birth).getTime()))
			fieldsCheck.push('Date of birth is not valid.');

		if (!values.country && !countries.includes(values.country))
			fieldsCheck.push('Country is not chosen.');

		if (!values.state && !states.includes(values.state))
			fieldsCheck.push('State is not chosen.');

		if (!values.city && !cities.includes(values.city))
			fieldsCheck.push('City is not chosen.');

		if (
			!['male', 'female'].includes(values.gender)
			// values.gender !== 'male' && values.gender !== 'female'
		)
			fieldsCheck.push('Gender is not specified.');

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

		if (passwordValidated.strength !== 'strong') {
			setAfterFormSubmitPasswordMessage(() => {
				return (
					<>
						<p>Password strength is {passwordValidated.strength}</p>
						<p>Strong password requirements:</p>
						<ul>
							{passwordValidated.strongPasswordRequirements.map(
								(item, index) => (
									<li key={index}>{item}</li>
								)
							)}
						</ul>
					</>
				);
			});
			setBtnsDisabled(false);
			return;
		}

		const { status, message } = await handleSignUp({
			dispatch: userDispatch,
			data: values,
		}).then((response) => {
			setBtnsDisabled(false);
			return response;
		});

		if (status === 'error') {
			console.error(message);
			setAfterFormSubmitMessage(() => <>{message}</>);
			return;
		}

		router.replace('/');
	};

	useEffect(() => {
		if (!UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN) return;
		handleGetCountries();
	}, [
		UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
		,
		handleGetCountries,
	]);

	useEffect(() => {
		if (!values.country) return;

		setStates([]);
		setCities([]);
		handleGetStates(values.country);
	}, [values.country, , handleGetStates]);

	useEffect(() => {
		if (!values.state) return;

		setCities([]);
		handleGetCities(values.state);
	}, [values.state, , handleGetCities]);

	if (!UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN) {
		return (
			<section>
				<p className='heading-2'>
					We&apos;re facing some technical problems, please try again later :(
				</p>
			</section>
		);
	}

	return (
		<Form
			extraClasses={`${BoxShadowClasses['box-shadow']}`}
			className={classes['sign-up-form']}
			onSubmit={submitHandler}
		>
			<FormControls>
				<FormControl extraClasses='align-center'>
					<Label htmlFor='first_name'>Your First Name</Label>
					<Input
						name='first_name'
						id='first_name'
						required
						value={values.first_name}
						onChange={(event) => {
							if (true || !values.user_name_id) {
								return setValues((prev) => ({
									...prev,
									user_name_id: `${event.target.value}-${values.last_name}`
										.toLowerCase()
										.replace(/[^\w\s-\_]/gi, '')
										.split(/[\s-]+/)
										.join('-')
										.replace(/(\_{2,})/gi, '_')
										.replace(/^[^\w]/gi, '')
										.replace(/-$/, ''),
									[event.target.name]: event.target.value,
								}));
							}
						}}
					/>
				</FormControl>
				<FormControl extraClasses='align-center'>
					<Label htmlFor='last_name'>Your last Name</Label>
					<Input
						name='last_name'
						id='last_name'
						required
						value={values.last_name}
						onChange={(event) => {
							if (true || !values.user_name_id) {
								return setValues((prev) => ({
									...prev,
									user_name_id: `${values.first_name}-${event.target.value}`

										.toLowerCase()
										.replace(/[^\w\s-\_]/gi, '')
										.split(/[\s-]+/)
										.join('-')
										.replace(/(\_{2,})/gi, '_')
										.replace(/^[^\w]/gi, '')
										.replace(/-$/, ''),
									[event.target.name]: event.target.value,
								}));
							}
						}}
					/>
				</FormControl>
			</FormControls>
			<FormControl extraClasses='align-center'>
				<Label htmlFor='user_name_id'>Your User Name Id</Label>
				<Input
					type='user_name_id'
					name='user_name_id'
					id='user_name_id'
					required
					value={values.user_name_id
						.toLowerCase()
						.replace(/(\s)/gi, '')
						.replace(/(-{2,})/gi, '-')
						.replace(/(_{2,})/gi, '_')
						.replace(/^-/, '')
						.replace(/[^\w-\_]/gi, '')}
					setValues={setValues}
				/>
			</FormControl>
			<FormControl extraClasses='align-center'>
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
			<FormControl extraClasses='align-center'>
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
			<FormControl extraClasses='align-center'>
				<Label htmlFor='date_of_birth'>Your Date Of Birth</Label>
				<Input
					type='date'
					name='date_of_birth'
					id='date_of_birth'
					required
					value={dateOfBirth}
					onChange={(event) => {
						setDateOfBirth(event.target.value);
						setValues((prev) => ({
							...prev,
							[event.target.name]: new Date(event.target.value).toISOString(),
						}));
					}}
				/>
			</FormControl>

			<FormControl
				className={classes['resident-FormControl']}
				extraClasses='align-center'
			>
				<Label htmlFor='country'>Choose Your Country</Label>
				<Select
					name='country'
					id='country'
					required
					onChange={(event) => {
						if (values.country === event.target.value) return;

						setValues((prev) => ({
							...prev,
							[event.target.name]: event.target.value,
						}));
					}}
					value={values.country}
				>
					<option value='' disabled>
						Choose Your Country
					</option>
					{countries.map(
						(
							{ country_name, country_phone_code, country_short_name },
							index
						) => (
							<option key={index} value={country_name}>
								{country_name}
							</option>
						)
					)}
				</Select>
			</FormControl>

			{Boolean(states && states.length) && (
				<FormControl
					className={classes['resident-FormControl']}
					extraClasses='align-center'
				>
					<Label htmlFor='state'>Choose Your State</Label>
					<Select
						name='state'
						id='state'
						required
						onChange={(event) => {
							if (values.state === event.target.value) return;

							setValues((prev) => ({
								...prev,
								[event.target.name]: event.target.value,
							}));
						}}
						value={values.state}
					>
						<option valu='' disabled>
							Choose Your City
						</option>
						{states.map(({ state_name }, index) => (
							<option key={index} value={state_name}>
								{state_name}
							</option>
						))}
					</Select>
				</FormControl>
			)}

			{Boolean(cities && cities.length) && (
				<FormControl
					className={classes['resident-FormControl']}
					extraClasses='align-center'
				>
					<Label htmlFor='city'>Choose Your City</Label>
					<Select
						name='city'
						id='city'
						required
						onChange={(event) => {
							new Promise((resolve, reject) => {
								setValues((prev) => ({
									...prev,
									[event.target.name]: event.target.value,
								}));
								resolve();
							});
						}}
						value={values.city}
					>
						<option valu='' disabled>
							Choose Your State
						</option>
						{cities.map(({ city_name }, index) => (
							<option key={index} value={city_name}>
								{city_name}
							</option>
						))}
					</Select>
				</FormControl>
			)}

			<fieldset className={classes['gender-select-fieldset']}>
				<legend className='text-align-center'>Choose your gender:</legend>
				<FormControl
					className={classes['gender-FormControl']}
					extraClasses='align-center'
				>
					<Label htmlFor='gender-male'>Male</Label>
					<input
						type='radio'
						name='gender'
						id='gender-male'
						value='male'
						required
						setValues={setValues}
					/>
				</FormControl>

				<FormControl
					className={classes['gender-FormControl']}
					extraClasses='align-center'
				>
					<Label htmlFor='gender-female'>Female</Label>
					<input
						type='radio'
						name='gender'
						id='gender-female'
						value='female'
						required
						setValues={setValues}
					/>
				</FormControl>
			</fieldset>

			<div className={classes.warning}>{AfterFormSubmitMessage}</div>
			<div className={classes.warning}>{AfterFormSubmitPasswordMessage}</div>

			<FormControl
				extraClasses='align-center'
				className={classes['submit-button-FormControl']}
			>
				<Button
					title='Sign Up'
					disabled={btnsDisabled}
					type='submit'
					className={classes.submitBtn}
				>
					Sign Up
				</Button>
			</FormControl>
		</Form>
	);
};

export default SignUp;
