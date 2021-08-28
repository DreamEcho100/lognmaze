import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';

import classes from './SignUp.module.css';
import BoxShadowClasses from '../../UI/V1/BoxShadow.module.css';

import { validateEmail, validatePasswordStrength } from '@lib/v1/validate';
import { handleSignUp } from '@store/UserContext/actions';
import UserContext from '@store/UserContext';

import Form from '../../UI/V1/Form';
import FormControl from '../../UI/V1/FormControl';
import FormControls from '../../UI/V1/FormControls/FormControls';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';
import Select from '@components/UI/V1/Select/Select';
import Button from '../../UI/V1/Button';

const SignUp = ({
	UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
}) => {
	if (!UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN) {
		return (
			<section>
				<h2>We're facing some technical problems, please try again later :(</h2>
			</section>
		);
	}
	const { dispatch: userDispatch } = useContext(UserContext);

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
		phone_number: '',
		gender: '',
	});

	const [countryShortName, setCountryShortName] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [countryPhoneCode, setCountryPhoneCode] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');

	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);

	const [AfterFormSubmitMessage, setAfterFormSubmitMessage] = useState(() => (
		<></>
	));
	const [afterFormSubmitMessageExist, setAfterFormSubmitMessageExist] =
		useState(false);

	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const handleGetCities = async (state) => {
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
	};

	const handleGetStates = async (country) => {
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
						await handleGetCities(data[0].state_name);
					}
				});
		} catch (error) {
			console.error(error);
		}
	};

	const handleGetCountries = async () => {
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
					await handleGetStates(data[0].country_name);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		setBtnsDisabled(true);
		setAfterFormSubmitMessage(() => <></>);
		setAfterFormSubmitMessageExist(false);

		const emailValidated = validateEmail(values.email);
		const passwordValidated = validatePasswordStrength(values.password);

		if (!emailValidated) {
			setAfterFormSubmitMessage(() => <p>There is something with the email</p>);
			setAfterFormSubmitMessageExist(true);
			setBtnsDisabled(false);
			return;
		}

		if (passwordValidated.strength !== 'strong') {
			setAfterFormSubmitMessage(() => {
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
			setAfterFormSubmitMessageExist(true);
			setBtnsDisabled(false);
			return;
		}

		console.log('values', values);

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
			setAfterFormSubmitMessageExist(true);
		}
	};

	useEffect(() => {
		handleGetCountries();
	}, []);

	useEffect(() => {
		if (!values.country) return;
		const targetedCountry = countries.find(
			(countryObj) => countryObj.country_name === values.country
		);
		if (!countryPhoneCode) {
			setCountryPhoneCode(targetedCountry.country_phone_code);

			setValues((prev) => ({
				...prev,
				phone_number: targetedCountry.country_phone_code + phoneNumber,
			}));
		}
		setCountryShortName(targetedCountry.country_short_name);
	}, [values.country]);

	return (
		<Form
			extraClasses={`${BoxShadowClasses['box-shadow']}`}
			className={classes['sign-up-form']}
			onSubmit={submitHandler}
		>
			<Head>
				<meta
					property='og:url'
					content={`https://lognmaze.com/auth/?sign-type=up`}
				/>
				<meta
					name='twitter:url'
					content={`https://lognmaze.com/auth/?sign-type=up`}
				/>

				<meta property='og:description' content='Sign up to LogNMaze' />
				<meta name='description' content='Sign up to LogNMaze' />
				<meta property='og:title' content='Sign up | LogNMaze' />
				<title>Sign up | LogNMaze</title>
			</Head>
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
							[event.target.name]: new Date(event.target.value).toUTCString(),
						}));
					}}
				/>
			</FormControl>

			<FormControl extraClasses='align-center'>
				<Label htmlFor='country'>Choose Your Country</Label>
				<Select
					name='country'
					id='country'
					required
					onChange={(event) => {
						new Promise((resolve, reject) => {
							setValues((prev) => ({
								...prev,
								[event.target.name]: event.target.value,
							}));
							setStates([]);
							setCities([]);
							resolve();
							handleGetStates(event.target.value);
						});
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
				<FormControl extraClasses='align-center'>
					<Label htmlFor='state'>Choose Your State</Label>
					<Select
						name='state'
						id='state'
						required
						onChange={(event) => {
							new Promise((resolve, reject) => {
								setValues((prev) => ({
									...prev,
									[event.target.name]: event.target.value,
								}));
								setCities([]);
								handleGetCities(event.target.value);
								resolve();
							});
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
				<FormControl extraClasses='align-center'>
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

			<FormControl extraClasses='align-center'>
				<Label htmlFor='phone_number'>Enter Your Phone Number</Label>
				<div>
					<span>+</span>
					<Input
						type='tel'
						name='country_phone_code'
						id='country_phone_code'
						required
						value={countryPhoneCode}
						onChange={(event) => {
							setCountryPhoneCode(event.target.value);
							setValues((prev) => ({
								...prev,
								phone_number: event.target.value + phoneNumber,
							}));
						}}
						style={{
							maxWidth: 'max-content',
							minWidth: '10rem',
							width: '10rem',
						}}
					/>
					<span>|</span>
					<Input
						type='tel'
						name='phone_number'
						id='phone_number'
						required
						value={phoneNumber}
						onChange={(event) => {
							setPhoneNumber(event.target.value);
							setValues((prev) => ({
								...prev,
								phone_number: countryPhoneCode + event.target.value,
							}));
						}}
					/>
				</div>
			</FormControl>

			<FormControl extraClasses='align-center'>
				<Input
					type='radio'
					name='gender'
					id='gender-male'
					value='male'
					required
					setValues={setValues}
				/>
				<Label htmlFor='gender-male'>Male</Label>
			</FormControl>
			<FormControl extraClasses='align-center'>
				<Input
					type='radio'
					name='gender'
					id='gender-female'
					value='female'
					required
					setValues={setValues}
				/>
				<Label htmlFor='female'>Female</Label>
			</FormControl>
			{afterFormSubmitMessageExist && (
				<div className={classes.warning}>{AfterFormSubmitMessage}</div>
			)}
			<FormControl extraClasses='align-center' className={classes.actions}>
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
