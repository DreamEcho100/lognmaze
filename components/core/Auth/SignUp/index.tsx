import {
	FormEvent,
	MouseEventHandler,
	useCallback,
	useEffect,
	useState,
} from 'react';

import classes from './index.module.css';
import borderClasses from '@styles/border.module.css';
import boxShadowClasses from '@styles/boxShadow.module.css';

import {
	IUserBasicDataCoverPhoto,
	IUserAuthenticatedData,
	TUserAuthenticatedDataEmail,
	IUserBasicDataCityOfResident,
} from '@coreLib/ts/global';
import { useUserSharedState } from '@store/UserContext';
import { signupUserRequestAction } from '@store/UserContext/actions';
import {
	validateEmail,
	validatePasswordStrength,
} from '@commonLibIndependent/validate';

import FormControlComponent from '@commonComponentsIndependent/FormControl';
import FormControlsComponent from '@commonComponentsIndependent/FormControls';
import FormComponent from '@commonComponentsIndependent/Form';
import LabelComponent from '@commonComponentsIndependent/Label';
import InputComponent from '@commonComponentsIndependent/Input';
import ButtonComponent from '@commonComponentsIndependent/Button';
import SelectComponent from '@commonComponentsIndependent/Select';
import MessagesListComponent from '@commonComponentsIndependent/MessagesList';

type Props = {
	UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN: string;
};

const SignUpComponent = ({
	UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
}: Props) => {
	const [
		{
			actions: {
				requests: { signup: signupRequest },
			},
		},
		userDispatch,
	] = useUserSharedState();

	const [values, setValues] = useState<{
		first_name: IUserAuthenticatedData['first_name'];
		last_name: IUserAuthenticatedData['last_name'];
		user_name_id: IUserAuthenticatedData['user_name_id'];
		email: TUserAuthenticatedDataEmail; // IUserAuthenticatedData['email'];
		password: string;
		date_of_birth: string | number | Date;
		country: IUserBasicDataCoverPhoto;
		state: IUserAuthenticatedData['state_of_resident'];
		city: IUserBasicDataCityOfResident;
		gender: IUserAuthenticatedData['gender'];
	}>({
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

	const [countries, setCountries] = useState<
		{
			country_name: string;
			country_phone_code: number;
			country_short_name: string;
		}[]
	>([]);
	const [states, setStates] = useState<{ state_name: string }[]>([]);
	const [cities, setCities] = useState<{ city_name: string }[]>([]);

	const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);
	const [errorsList, setErrorsList] = useState<string[]>([]);
	const [passwordRequirement, setPasswordRequirement] = useState<string[]>([]);
	const [fetchErrorsList, setFetchErrorsList] = useState<string[]>([]);

	const handleGetCities = useCallback(async () => {
		// const state = values.state;

		setValues((prev) => ({
			...prev,
			city: '',
		}));
		try {
			await fetch(
				`https://www.universal-tutorial.com/api/cities/${values.state}`,
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
			if (error instanceof Error) {
				const errorMessage = error.message;
				console.error(errorMessage);
				setFetchErrorsList((prevState) => ({
					...prevState,
					errorMessage,
				}));
			}
		}
	}, [UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN, values.state]);

	const handleGetStates = useCallback(async () => {
		// const country = values.country;

		setValues((prev) => ({
			...prev,
			state: '',
			city: '',
		}));

		try {
			await fetch(
				`https://www.universal-tutorial.com/api/states/${values.country}`,
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
			if (error instanceof Error) {
				const errorMessage = error.message;
				console.error(errorMessage);
				setFetchErrorsList((prevState) => ({
					...prevState,
					errorMessage,
				}));
			}
		}
	}, [
		UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
		values.country,
	]);

	const handleGetCountries = useCallback(async () => {
		setValues((prev) => ({
			...prev,
			country: '',
			state: '',
			city: '',
		}));
		try {
			await fetch('https://www.universal-tutorial.com/api/countries/', {
				method: 'GET',
				headers: {
					authorization: `Bearer ${UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN}`,
				},
			})
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
			setIsButtonsDisabled(false);
		} catch (error) {
			if (error instanceof Error) {
				const errorMessage = error.message;
				console.error(errorMessage);
				setFetchErrorsList((prevState) => ({
					...prevState,
					errorMessage,
				}));
			}
			setIsButtonsDisabled(false);
		}
	}, [UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN]);

	const handleSetValuesOnClick: MouseEventHandler<HTMLInputElement> = (
		event
	) => {
		setValues((prevValues) => ({
			...prevValues,
			[(event.target as HTMLInputElement).name]: (
				event.target as HTMLInputElement
			).value,
		}));
	};

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault();

		setIsButtonsDisabled(true);
		setErrorsList([]);
		setPasswordRequirement([]);

		const errorsList: string[] = [];

		const emailValidated = validateEmail(values.email);
		const passwordStrengthValidated = validatePasswordStrength(values.password);
		if (passwordStrengthValidated.strength !== 'strong')
			setPasswordRequirement(
				passwordStrengthValidated.strongPasswordRequirements
			);

		if (values.first_name.trim().replace(/\s{2,}/g, '').length < 3)
			errorsList.push('First name is less than 3 characters.');
		else if (values.first_name.trim().replace(/\s{2,}/g, '').length > 60)
			errorsList.push('First name is more than 60 characters.');

		if (values.last_name.trim().replace(/\s{2,}/g, '').length < 3)
			errorsList.push('Last name is less than 3 characters.');
		else if (values.last_name.trim().replace(/\s{2,}/g, '').length > 60)
			errorsList.push('Last name is more than 60 characters.');

		if (values.user_name_id.trim().replace(/\s{2,}/g, '').length < 3)
			errorsList.push('User name id is less than 3 characters.');
		else if (values.user_name_id.trim().replace(/\s{2,}/g, '').length > 60)
			errorsList.push('User name id is more than 60 characters.');

		if (!emailValidated) errorsList.push('Email is not valid.');

		if (isNaN(new Date(values.date_of_birth).getTime()))
			errorsList.push('Date of birth is not valid.');

		if (
			!values.country &&
			!countries.some((country) => country.country_name === values.country)
		)
			errorsList.push('Country is not chosen.');

		if (
			!values.state &&
			!states.some((state) => state.state_name === values.state)
		)
			errorsList.push('State is not chosen.');

		if (
			values.city &&
			!values.city &&
			!cities.some((city) => city.city_name === values.city)
		)
			errorsList.push('City is not chosen.');

		if (
			!['male', 'female'].includes(values.gender)
			// values.gender !== 'male' && values.gender !== 'female'
		)
			errorsList.push('Gender is not specified.');

		if (errorsList.length === 0 && passwordRequirement.length === 0) {
			await signupUserRequestAction(userDispatch, {
				bodyContent: {
					auth_type: 'signup',
					...values,
					date_of_birth: new Date(values.date_of_birth).toISOString(),
				},
			});
		} else setErrorsList(errorsList);

		setIsButtonsDisabled(false);
	};

	useEffect(() => {
		setFetchErrorsList([]);
		setIsButtonsDisabled(true);
		if (!UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN) {
			setFetchErrorsList((prevState) => [
				...prevState,
				'UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN is not found!',
			]);
			return;
		}
		(async () => await handleGetCountries())();
	}, [
		UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN,
		handleGetCountries,
	]);

	useEffect(() => {
		setFetchErrorsList([]);
		setIsButtonsDisabled(true);
		if (!values.country) return;

		setStates([]);
		setCities([]);
		(async () => await handleGetStates())();
	}, [values.country, handleGetStates]);

	useEffect(() => {
		setFetchErrorsList([]);
		if (!values.state) {
			setIsButtonsDisabled(false);
			return;
		}

		setIsButtonsDisabled(true);
		setCities([]);
		(async () => await handleGetCities())();
		setIsButtonsDisabled(false);
	}, [values.state, handleGetCities]);

	if (!UNIVERSAL_TUTORIAL_REST_API_FOR_COUNTRY_STATE_CITY_TOKEN) {
		return (
			<section>
				<p className='heading-2'>
					We&apos;re facing some technical problems, please try again later :
					{'('}
				</p>
			</section>
		);
	}

	return (
		<FormComponent
			className={`${classes.signUpForm} ${borderClasses.default} ${boxShadowClasses.default}`}
			onSubmit={submitHandler}
		>
			<FormControlsComponent>
				<FormControlComponent className={classes.formControl}>
					<LabelComponent htmlFor='first_name'>Your First Name</LabelComponent>
					<InputComponent
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
				</FormControlComponent>
				<FormControlComponent className={classes.formControl}>
					<LabelComponent htmlFor='last_name'>Your last Name</LabelComponent>
					<InputComponent
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
				</FormControlComponent>
			</FormControlsComponent>
			<FormControlComponent className={classes.formControl}>
				<LabelComponent htmlFor='user_name_id'>
					Your User Name Id
				</LabelComponent>
				<InputComponent
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
			</FormControlComponent>
			<FormControlComponent className={classes.formControl}>
				<LabelComponent htmlFor='email'>Your Email</LabelComponent>
				<InputComponent
					type='email'
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
					name='password'
					id='password'
					required
					value={values.password}
					setValues={setValues}
				/>
			</FormControlComponent>
			<FormControlComponent className={classes.formControl}>
				<LabelComponent htmlFor='date_of_birth'>
					Your Date Of Birth
				</LabelComponent>
				<InputComponent
					type='date'
					name='date_of_birth'
					id='date_of_birth'
					required
					value={dateOfBirth}
					onChange={(event) => {
						setDateOfBirth(event.target.value);
						setValues((prev) => ({
							...prev,
							[event.target.name]: new Date(event.target.value),
						}));
					}}
				/>
			</FormControlComponent>

			<FormControlComponent
				className={`${classes.residentFormControl} ${classes.formControl}`}
			>
				<LabelComponent htmlFor='country'>Choose Your Country</LabelComponent>
				<SelectComponent
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
				</SelectComponent>
			</FormControlComponent>

			{Boolean(states && states.length) && (
				<FormControlComponent
					className={`${classes.residentFormControl} ${classes.formControl}`}
				>
					<LabelComponent htmlFor='state'>Choose Your State</LabelComponent>
					<SelectComponent
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
						<option value='' disabled>
							Choose Your City
						</option>
						{states.map(({ state_name }, index) => (
							<option key={index} value={state_name}>
								{state_name}
							</option>
						))}
					</SelectComponent>
				</FormControlComponent>
			)}

			{Boolean(cities && cities.length) && (
				<FormControlComponent
					className={`${classes.residentFormControl} ${classes.formControl}`}
				>
					<LabelComponent htmlFor='city'>Choose Your City</LabelComponent>
					<SelectComponent
						name='city'
						id='city'
						required
						onChange={(event) => {
							setValues((prev) => ({
								...prev,
								[event.target.name]: event.target.value,
							}));
						}}
						value={values.city}
					>
						<option value='' disabled>
							Choose Your State
						</option>
						{cities.map(({ city_name }, index) => (
							<option key={index} value={city_name}>
								{city_name}
							</option>
						))}
					</SelectComponent>
				</FormControlComponent>
			)}

			<fieldset className={classes.genderSelectFieldset}>
				<legend className='text-align-center'>Choose your gender:</legend>
				<FormControlComponent
					className={`${classes.genderFormControl} ${classes.formControl}`}
				>
					<LabelComponent htmlFor='gender-male'>Male</LabelComponent>
					<input
						type='radio'
						name='gender'
						id='gender-male'
						value='male'
						required
						onClick={handleSetValuesOnClick}
						// onClick={(event: Event) => setValues(prevState => (
						// 	{
						// 		...prevState,
						// 		[(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value)
						// 	}
						// ))}
					/>
				</FormControlComponent>

				<FormControlComponent
					className={`${classes.genderFormControl} ${classes.formControl}`}
				>
					<LabelComponent htmlFor='gender-female'>Female</LabelComponent>
					<input
						type='radio'
						name='gender'
						id='gender-female'
						value='female'
						required
						onClick={handleSetValuesOnClick}
					/>
				</FormControlComponent>
			</fieldset>

			<FormControlComponent
				className={`${classes.submitButtonFormControl} ${classes.formControl}`}
			>
				<ButtonComponent
					title='Sign Up'
					disabled={isButtonsDisabled}
					type='submit'
					// className={classes.submitButton}
				>
					Sign Up
				</ButtonComponent>

				{(errorsList.length !== 0 ||
					passwordRequirement.length !== 0 ||
					fetchErrorsList.length !== 0 ||
					signupRequest.errorMessage) && (
					<MessagesListComponent variant='danger'>
						{signupRequest.errorMessage && (
							<li>{signupRequest.errorMessage}</li>
						)}
						{[...passwordRequirement, ...fetchErrorsList, ...errorsList].map(
							(item, index) => (
								<li key={`${index}-${item}`}>{item}</li>
							)
						)}
					</MessagesListComponent>
				)}
			</FormControlComponent>
		</FormComponent>
	);
};

export default SignUpComponent;
