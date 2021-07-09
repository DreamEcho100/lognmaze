import React from 'react';
import { useContext, useEffect, useState } from 'react';

import classes from './SignUp.module.css';
import BoxShadowClasses from '../../UI/V1/BoxShadow.module.css';

import UserContext from '../../../store/UserContext';

import Form from '../../UI/V1/Form/Form';
import FormControl from '../../UI/V1/FormControl/FormControl';
import FormControls from '../../UI/V1/FormControls/FormControls';
import FormLabel from '../../UI/V1/FormLabel/FormLabel';
import FormInput from '../../UI/V1/FormInput/FormInput';
import Button from '../../UI/V1/Button/Button';

const SignUp = ({
	UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
}) => {
	const { handleSignUp } = useContext(UserContext);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [country, setCountry] = useState('');
	const [state, setState] = useState('');
	const [city, setCity] = useState('');
	const [countryShortName, setCountryShortName] = useState('');
	const [countryPhoneCode, setCountryPhoneCode] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [gender, setChoosedGender] = useState('');

	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const handleUserName = () => {
		return `${firstName}-${lastName}`.replace(/[^\w-\_]/gi, '').toLowerCase();
	};

	const handleGetCities = async (state) => {
		setCity('');
		try {
			const response = await fetch(
				`https://www.universal-tutorial.com/api/cities/${state}`,
				{
					method: 'GET',
					headers: {
						Authorization `Bearer ${UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN}`,
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
					setCity(data[0].city_name);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const handleGetStates = async (country) => {
		setState('');
		setCity('');
		try {
			const response = await fetch(
				`https://www.universal-tutorial.com/api/states/${country}`,
				{
					method: 'GET',
					headers: {
						Authorization `Bearer ${UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN}`,
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
					setState(data[0].state_name);
					await handleGetCities(data[0].state_name);
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

		setCountry('');
		setState('');
		setCity('');
		try {
			const response = await fetch(
				'https://www.universal-tutorial.com/api/countries/',
				{
					method: 'GET',
					headers: {
						Authorization `Bearer ${UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN}`,
					},
				}
			)
				.then((response) => response.json())
				.then((data) => {
					setCountries(data);
					return data;
				})
				.then(async (data) => {
					setCountry(data[0].country_name);
					await handleGetStates(data[0].country_name);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		const userNameId = handleUserName();

		// optional: Add validation

		setAfterFormSubmitMessage('');
		setBtnsDisabled(true);
		const { status, message } = await handleSignUp({
			firstName,
			lastName,
			userNameId,
			email,
			password,
			dateOfBirth: new Date(dateOfBirth).toUTCString(),
			country,
			state,
			countryPhoneCode: countryPhoneCode,
			phoneNumber,
			city,
			gender,
		}).then((response) => {
			setBtnsDisabled(false);
			return response;
		});

		if (status === 'error') {
			console.error(message);
			setBtnsDisabled(false);
			setAfterFormSubmitMessage(message);
		}
		// clearInputsForm();
	};

	useEffect(() => {
		handleGetCountries();
		// countries.length && setCountry(countries[0].country_name);
	}, []);

	useEffect(() => {
		if (!country) return;
		const targetedCountry = countries.find(
			(countryObj) => countryObj.country_name === country
		);
		setCountryPhoneCode(targetedCountry.country_phone_code);
		setCountryShortName(targetedCountry.country_short_name);
	}, [country]);

	return (
		<Form
			extraClasses={`${BoxShadowClasses['box-shadow']}`}
			onSubmit={submitHandler}
		>
			<FormControls>
				<FormControl extraClasses='align-center'>
					<FormLabel htmlFor='firstName'>Your First Name</FormLabel>
					<FormInput
						type='text'
						id='firstName'
						required
						onChange={(event) => setFirstName(event.target.value)}
						value={firstName}
					/>
				</FormControl>
				<FormControl extraClasses='align-center'>
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
			<FormControl extraClasses='align-center'>
				<FormLabel htmlFor='email'>Your Email</FormLabel>
				<FormInput
					type='email'
					id='email'
					required
					onChange={(event) => setEmail(event.target.value)}
					value={email}
				/>
			</FormControl>
			<FormControl extraClasses='align-center'>
				<FormLabel htmlFor='password'>Your Password</FormLabel>
				<FormInput
					type='password'
					id='password'
					required
					onChange={(event) => setPassword(event.target.value)}
					value={password}
				/>
			</FormControl>
			<FormControl extraClasses='align-center'>
				<input
					onChange={(event) => setDateOfBirth(event.target.value)}
					value={dateOfBirth}
					required
					type='date'
					name='date-of-birth'
					id='date-of-birth'
				/>
			</FormControl>

			<FormControl extraClasses='align-center'>
				<FormLabel htmlFor='countries'>Choose Your Country</FormLabel>
				<select
					name='countries'
					id='countries'
					required
					onChange={(event) => {
						new Promise((resolve, reject) => {
							console.dir(event.target);
							setCountry(event.target.value);
							setState([]);
							setCities([]);
							resolve();
							handleGetStates(event.target.value);
						});
					}}
					value={country}
				>
					<option valu='' disabled>
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
				</select>
			</FormControl>

			{Boolean(states && states.length) && (
				<FormControl extraClasses='align-center'>
					<FormLabel htmlFor='states'>Choose Your State</FormLabel>
					<select
						name='states'
						id='states'
						required
						onChange={(event) => {
							new Promise((resolve, reject) => {
								setState(event.target.value);
								setCities([]);
								handleGetCities(event.target.value);
								resolve();
							});
						}}
						value={state}
					>
						<option valu='' disabled>
							Choose Your City
						</option>
						{states.map(({ state_name }, index) => (
							<option key={index} value={state_name}>
								{state_name}
							</option>
						))}
					</select>
				</FormControl>
			)}

			{Boolean(cities && cities.length) && (
				<FormControl extraClasses='align-center'>
					<FormLabel htmlFor='cities'>Choose Your City</FormLabel>
					<select
						name='cities'
						id='cities'
						required
						onChange={(event) => {
							new Promise((resolve, reject) => {
								setCity(event.target.value);
								resolve();
							});
						}}
						value={city}
					>
						<option valu='' disabled>
							Choose Your State
						</option>
						{cities.map(({ city_name }, index) => (
							<option key={index} value={city_name}>
								{city_name}
							</option>
						))}
					</select>
				</FormControl>
			)}

			<FormControl extraClasses='align-center'>
				<FormLabel htmlFor='phone-number'>Enter Your Phone Number</FormLabel>
				<div>
					<span>+{countryPhoneCode}</span>
					<FormInput
						required
						type='tel'
						name='phone-number'
						id='phone-number'
						onChange={(event) => setPhoneNumber(event.target.value)}
						value={phoneNumber}
					/>
				</div>
			</FormControl>

			<FormControl extraClasses='align-center'>
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
			<FormControl extraClasses='align-center'>
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
			<FormControl extraClasses='align-center' className={classes.actions}>
				<Button
					disabled={btnsDisabled}
					type='submit'
					className={classes.submitBtn}
				>
					Create Account
				</Button>
			</FormControl>
		</Form>
	);
};

export default SignUp;
