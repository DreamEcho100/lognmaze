import { Fragment, useContext, useState } from 'react';

import classes from './UserInfo.module.css';

import UserContext from '../../../../../store/UserContext';
import BoxShadowClasses from '../../../../UI/V1/BoxShadow.module.css';

import Accordion from '../../../../UI/V1/Accordion/Accordion';
import Form from '../../../../UI/V1/Form/Form';
import FormControl from '../../../../UI/V1/FormControl/FormControl';
import FormControls from '../../../../UI/V1/FormControls/FormControls';
import FormLabel from '../../../../UI/V1/FormLabel/FormLabel';
import FormInput from '../../../../UI/V1/FormInput/FormInput';
import Button from '../../../../UI/V1/Button/Button';

const EditUserInfo = () => {
	const { user } = useContext(UserContext);

	// console.log(user);

	// const [profilePicture, setProfilePicture] = useState(user.profile_picture);
	// const [coverPhoto, setCoverPhoto] = useState(user.profile_picture);
	const [firstName, setFirstName] = useState(user.first_name);
	const [lastName, setLastName] = useState(user.last_name);
	const [email, setEmail] = useState(user.email);
	const [gender, setChoosedGender] = useState(user.gender);

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const handleUserName = () => {
		return `${firstName}-${lastName}`.replace(/[^\w-\_]/gi, '').toLowerCase();
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		const userName = handleUserName();
	};

	return (
		<div>
			<Accordion>
				<Fragment key='header'>
					<h2>Edit User Info</h2>
				</Fragment>
				<Fragment key='body'>
					<Form
						extraClasses={`${BoxShadowClasses['box-shadow']}`}
						onSubmit={submitHandler}
					>
						{/* <FormControl>
							<FormLabel htmlFor='profile_picture'>
								Your Profile Picture
							</FormLabel>
							<FormInput
								type='file'
								id='profile_picture'
								onChange={(event) => {
									setProfilePicture(event.target.value);
								}}
								/*
onLoad onLoadedData onLoadedDataCapture onLoadCapture onLoadStartCapture onLoadStart onLoadedMetadata onLoadedMetadataCapture
								*/
						/*
								value={profilePicture}
							/>
							<img src={profilePicture} alt='' />
						</FormControl>
						<FormControl>
							<FormLabel htmlFor='cover_photo'>Your Cover Photo</FormLabel>
							<FormInput
								type='file'
								id='cover_photo'
								onChange={(event) => {
									setCoverPhoto(event.target.value);
									console.dir(event.target);
								}}
								value={coverPhoto}
							/>
							<img src={coverPhoto} alt='' />
						</FormControl>
						 */}
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
							<FormInput
								defaultClasses='form-input-radio'
								type='radio'
								name='gender'
								defaultChecked={gender === 'male' ? true : false}
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
								defaultChecked={gender === 'female' ? true : false}
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
						<Button
							disabled={btnsDisabled}
							type='submit'
							className={classes.submitBtn}
						>
							Update Account
						</Button>
					</Form>
				</Fragment>
			</Accordion>
		</div>
	);
};

export default EditUserInfo;
