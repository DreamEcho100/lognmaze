import { Fragment, useContext, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

import classes from './ChangeProfilePictureModal.module.css';

import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';

import UserContext from '@store/UserContext';

const DynamicModal = dynamic(() => import('@components/UI/V1/Modal'));

// import Modal from '@components/UI/V1/Modal';
import Form from '@components/UI/V1/Form';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';
import FormControl from '@components/UI/V1/FormControl';
import Button from '@components/UI/V1/Button';

import InputFileReactDropzone from '@components/UI/V1/InputFileReactDropzone/InputFileReactDropzone';
import LinearProgressBar from '@components/UI/V1/LinearProgressBar/LinearProgressBar';
import { uploadFileToCloudinary } from '@lib/v1/fetch';

const ChangeProfilePictureModal = ({ showModal, setShowModal }) => {
	const { user, handleChangeProfilePictureURL } = useContext(UserContext);

	const [profilePictureURL, setProfilePictureURL] = useState(
		user.profile_picture
	);
	const [progress, setProgress] = useState(0);
	const [file, setFile] = useState({});

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

		setErrorMessage('');

		if (
			dropErrorMessage.length !== 0 ||
			(Object.keys(file).length === 0 && urlInput.length === 0)
		) {
			setErrorMessage('Empty field/s!');
			return;
		}

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
				const { status, message, data } = await handleChangeProfilePictureURL({
					url,
				});

				if (status === 'error') {
					setBtnsDisabled(false);
					console.error(message);
					setErrorMessage(message);
					return { status, message };
				}

				setBtnsDisabled(false);

				setShowModal(false);
				return { status, message };
			})
			.catch((error) => {
				setErrorMessage(error.message);
				setBtnsDisabled(false);
				return { status: 'error', message: error.message };
			});
	};

	return (
		<DynamicModal
			showModal={showModal}
			click={() => setShowModal(false)}
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
						<Label htmlFor='url-input'>Or Enter A URL:</Label>
						<Input
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
						Submit
					</Button>
				</Form>
			</Fragment>
		</DynamicModal>
	);
};

export default ChangeProfilePictureModal;
