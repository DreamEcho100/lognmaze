import React from 'react';
import { Fragment, useContext, useState, useCallback } from 'react';

import classes from './ChangeCoverPhotoModal.module.css';

import BoxShadowClasses from '@/components/UI/V1/BoxShadow.module.css';

import UserContext from '@/store/UserContext';

import Modal from '@/components/UI/V1/Modal/Modal';
import Form from '@/components/UI/V1/Form/Form';
import FormLabel from '@/components/UI/V1/FormLabel/FormLabel';
import FormInput from '@/components/UI/V1/FormInput/FormInput';
import FormControl from '@/components/UI/V1/FormControl/FormControl';
import Button from '@/components/UI/V1/Button/Button';

import InputFileReactDropzone from '@/components/UI/V1/InputFileReactDropzone/InputFileReactDropzone';
import LinearProgressBar from '@/components/UI/V1/LinearProgressBar/LinearProgressBar';
import { uploadFileToCloudinary } from '@/components/../lib/fetch';

const ChangeCoverPhotoModal = ({ closeModal }) => {
	const { user, handUpdateCoverPhotoURL } = useContext(UserContext);

	const [CoverPhotoURL, setCoverPhotoURL] = useState(user.cover_photo);
	const [progress, setProgress] = useState(0);
	const [file, setFile] = useState({});
	// const [coverPhoto, setCoverPhoto] = useState(user.profile_picture);

	const [urlInput, setUrlInput] = useState('');

	const [errorMessage, setErrorMessage] = useState(true);
	const [dropErrorMessage, setDropErrorMessage] = useState(true);
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
		// Do something with the files
		setUrlInput('');
		let file = [];
		let response = {};

		try {
			setErrorMessage('');
			setDropErrorMessage('');
			setBtnsDisabled(true);
			if (acceptedFiles.length !== 0) {
				file = acceptedFiles[0];
				setBtnsDisabled(false);
				response = { status: 'succuss', message: 'Image ready!' };
			} else if (rejectedFiles.length !== 0) {
				file = rejectedFiles[0];
				setDropErrorMessage(file.errors[0].message);
				console.error(file.errors[0].message);
				setBtnsDisabled(false);
				response = { status: 'error', message: file.errors[0].message };
			}
		} catch (error) {
			console.error(error);
			setDropErrorMessage(error.message);
			setBtnsDisabled(false);
			response = { status: 'error', message: error.message };
		}

		setFile(file);
	}, []);

	const submitHandler = async (event) => {
		event.preventDefault();

		if (
			dropErrorMessage.length !== 0 ||
			(Object.keys(file).length === 0 && urlInput.length === 0)
		)
			return;

		new Promise(async (resolve, reject) => {
			setBtnsDisabled(true);
			setProgress(0);
			if (Object.keys(file).length !== 0) {
				const secureUrl = await uploadFileToCloudinary(
					`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
					process.env.CLOUDINARY_UPLOAD_PRESET_KEY,
					file,
					setProgress,
					setErrorMessage
				);
				resolve(secureUrl);
			} else if (urlInput.length !== 0) {
				resolve(urlInput);
			} else {
				reject({ status: 'error', message: 'Empty field/s!' });
			}
		})
			.then(async (url) => {
				const { status, message } = await handUpdateCoverPhotoURL({ url });

				if (status === 'error') {
					setBtnsDisabled(false);
					console.error(message);
					setErrorMessage(message);
					return { status, message };
				}

				closeModal();
				return { status, message };
			})
			.catch((error) => {
				setErrorMessage(error.message);
				setBtnsDisabled(false);
				setErrorMessage(message);
				return { status: 'error', message: error.message };
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
				<h1>Change Your Cover Photo</h1>
			</Fragment>
			<Fragment key='body'>
				<Form
					extraClasses={`${BoxShadowClasses['box-shadow']}`}
					onSubmit={submitHandler}
				>
					<FormControl>
						<InputFileReactDropzone
							acceptedFormats={['image/*' /*, 'video/*', '.pdf'*/]}
							maxSize={350 * 1024}
							setFiles={setFile}
							onDrop={onDrop}
						/>
						<LinearProgressBar length={progress} />
						<p className={classes['dragged-prop']}>Name: {file.name}</p>
						<p className={classes['dragged-prop']}>Size: {file.size}</p>
						<p className={classes['dragged-prop']}>Type: {file.type}</p>
					</FormControl>
					<FormControl>
						<FormLabel htmlFor='url-input'>Or Enter A URL:</FormLabel>
						<FormInput
							type='text'
							id='url-input'
							value={urlInput}
							onChange={(event) => {
								setErrorMessage('');
								setDropErrorMessage('');
								setUrlInput(event.target.value);
								if (Object.keys(file).length !== 0) {
									setFile({});
								}
							}}
						/>
					</FormControl>

					{errorMessage.length !== 0 && (
						<div className={classes.warning}>
							<p>{errorMessage}</p>
						</div>
					)}

					{dropErrorMessage.length !== 0 && (
						<div className={classes.warning}>
							<p>{dropErrorMessage}</p>
						</div>
					)}
					<Button
						disabled={btnsDisabled}
						type='submit'
						className={classes.submitBtn}
					>
						Update Your Cover Photo
					</Button>
				</Form>
			</Fragment>
		</Modal>
	);
};

export default ChangeCoverPhotoModal;
