import { Fragment, useContext, useState, useCallback } from 'react';
import { useRouter } from 'next/router';

import classes from './ChangeProfilePictureModal.module.css';

import BoxShadowClasses from '../../../../../UI/V1/BoxShadow.module.css';

import UserContext from '../../../../../../store/UserContext';

import Modal from '../../../../../UI/V1/Modal/Modal';
import Form from '../../../../../UI/V1/Form/Form';
import FormControl from '../../../../../UI/V1/FormControl/FormControl';
import FormControls from '../../../../../UI/V1/FormControls/FormControls';
import FormLabel from '../../../../../UI/V1/FormLabel/FormLabel';
import FormInput from '../../../../../UI/V1/FormInput/FormInput';
import Button from '../../../../../UI/V1/Button/Button';

import InputFileReactDropzone from '../../../../../UI/V1/InputFileReactDropzone/InputFileReactDropzone';
import LinearProgressBar from '../../../../../UI/V1/LinearProgressBar/LinearProgressBar';
import { uploadFileToCloudinary } from '../../../../../../lib/fetch';

const ChangeProfilePictureModal = ({ closeModal }) => {
	const router = useRouter();
	const { user, handUpdateProfilePictureURL } = useContext(UserContext);

	const [profilePictureURL, setProfilePictureURL] = useState(
		user.profile_picture
	);
	const [progress, setProgress] = useState(0);
	const [file, setFile] = useState({});
	// const [coverPhoto, setCoverPhoto] = useState(user.profile_picture);
	// const [password, setPassword] = useState('');

	const [errorMessage, setErrorMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		// Do something with the files
		let file = [];

		try {
			setErrorMessage('');
			if (acceptedFiles.length !== 0) {
				file = acceptedFiles[0];
			} else if (rejectedFiles.length !== 0) {
				file = rejectedFiles[0];
				setErrorMessage(file.errors[0].message);
			}
		} catch (error) {
			setErrorMessage(error.message);
		}

		setFile(file);
	}, []);

	const submitHandler = async (event) => {
		event.preventDefault();

		setBtnsDisabled(true);
		setProgress(0);

		new Promise(async (resolve, reject) => {
			const secureUrl = await uploadFileToCloudinary(
				`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
				process.env.CLOUDINARY_UPLOAD_PRESET_KEY,
				file,
				setProgress
			);
			resolve(secureUrl);
		})
			.then((url) => {
				handUpdateProfilePictureURL(user.id, url);
			})
			.then(() => closeModal())
			.catch((error) => setErrorMessage(error.message))
			.finally(() => {
				setBtnsDisabled(false);
			});
	};

	return (
		<Modal
			click={closeModal}
			CloseButtonElement={(props) => (
				<Button type='button' {...props}>
					Close
				</Button>
			)}
		>
			<Fragment key='header'>
				<h1>Change Your Profile Picture</h1>
			</Fragment>
			<Fragment key='body'>
				<Form
					extraClasses={`${BoxShadowClasses['box-shadow']}`}
					onSubmit={submitHandler}
				>
					<FormControl>
						<InputFileReactDropzone
							acceptedFormats={['image/*' /*, 'video/*', '.pdf'*/]}
							maxSize={300 * 1024}
							setFiles={setFile}
							onDrop={onDrop}
						/>
						<p>Name: {file.name}</p>
						<p>Size: {file.size}</p>
						<p>Type: {file.type}</p>
					</FormControl>

					{errorMessage.length !== 0 && (
						<div className={classes.warning}>
							<p>{errorMessage}</p>
						</div>
					)}
					<LinearProgressBar length={progress} />
					<Button
						disabled={btnsDisabled}
						type='submit'
						className={classes.submitBtn}
					>
						Update Profile Picture
					</Button>
				</Form>
			</Fragment>
		</Modal>
	);
};

export default ChangeProfilePictureModal;
