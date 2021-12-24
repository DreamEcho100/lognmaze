import { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useUserSharedState } from '@store/UserContext';
import { handleUpdateUserData } from '@store/UserContext/actions';

import Modal from '@components/UI/V1/Modal';
import Button from '@components/UI/V1/Button';
import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import Label from '@components/UI/V1/Label';
import Textarea from '@components/UI/V1/Textarea';

const EditBioButton = ({ setValues, values }) => {
	const [userState, userDispatch] = useUserSharedState();

	const [showBioEditModal, setShowBioEditModal] = useState(false);

	const [DisableBtns, setDisableBtns] = useState(false);

	const [AfterFormSubmitMessage, setAfterFormSubmitMessage] = useState(() => (
		<></>
	));

	const fieldsCheck = [];

	const handleSubmit = async (event) => {
		event.preventDefault();
		setAfterFormSubmitMessage(() => <></>);

		setDisableBtns(true);

		if (values.bio === bio) {
			setAfterFormSubmitMessage(() => <>Nothing Changed!</>);
			return console.error('Nothing Changed!');
		}
		if (values.bio === bio) fieldsCheck.push('Nothing Changed!');
		if (values.bio.trim().replace(/\s{2,}/g, '').length < 25)
			fieldsCheck.push('Bio is less than 25 characters.');

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

		const { status, message } = await handleUpdateUserData({
			dispatch: userDispatch,
			userData: userState.user,
			values: {
				bio: values.bio,
			},
			token: userState.token,
		});

		setDisableBtns(false);

		if (status === 'success') {
			setShowBioEditModal(false);
		}

		if (status === 'error') {
			console.error(message);
			setAfterFormSubmitMessage(() => <>{message}</>);
		}
	};

	return (
		<>
			<Button
				title='Edit Bio'
				onClick={() => setShowBioEditModal(true)}
				className='d-flex flex-xy-center'
			>
				<FontAwesomeIcon icon={['fas', 'edit']} />
			</Button>

			<Modal
				showModal={showBioEditModal}
				click={() => setShowBioEditModal(false)}
				CloseButtonElement={(props) => (
					<Button title='Close Modal' type='button' {...props}>
						Close
					</Button>
				)}
			>
				<Fragment key='header'>
					<p className='heading-2'>Edit Bio</p>
				</Fragment>
				<Fragment key='body'>
					<Form onSubmit={handleSubmit}>
						<Label htmlFor='bio'>Bio</Label>
						<FormControl>
							<Textarea
								name='bio'
								id='bio'
								setValues={setValues}
								value={values.bio}
								minLength={25}
								maxLength={150}
								pattern='.{25, 150}'
							/>
						</FormControl>

						<div
						// className={classes.warning}
						>
							{AfterFormSubmitMessage}
						</div>

						<Button title='Submit Form' disabled={DisableBtns} type='submit'>
							Submit
						</Button>
					</Form>
				</Fragment>
			</Modal>
		</>
	);
};

export default EditBioButton;
