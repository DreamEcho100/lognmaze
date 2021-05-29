import { Fragment, useContext, useState } from 'react';

import classes from './ProfilePicture.module.css';

import BoxShadowClasses from '../../../../../UI/V1/BoxShadow.module.css';

import UserContext from '../../../../../../store/UserContext';

import Accordion from '../../../../../UI/V1/Accordion/Accordion';
import Form from '../../../../../UI/V1/Form/Form';
import FormControl from '../../../../../UI/V1/FormControl/FormControl';
import FormControls from '../../../../../UI/V1/FormControls/FormControls';
import FormLabel from '../../../../../UI/V1/FormLabel/FormLabel';
import FormInput from '../../../../../UI/V1/FormInput/FormInput';
import Button from '../../../../../UI/V1/Button/Button';

const ProfilePicture = () => {
	const { user } = useContext(UserContext);

	const [profilePicture, setProfilePicture] = useState(user.profile_picture);
	// const [coverPhoto, setCoverPhoto] = useState(user.profile_picture);
	const [password, setPassword] = useState('');

	const [afterFormSubmitMessage, setAfterFormSubmitMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const submitHandler = async (event) => {
		event.preventDefault();
	};

	return (
		<Accordion>
			<Fragment key='header'>
				<h2>Change Profile Picture</h2>
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
						Update Profile Picture
					</Button>
				</Form>
			</Fragment>
		</Accordion>
	);
};

export default ProfilePicture;
