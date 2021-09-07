import { Fragment, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import UserContext from '@store/UserContext';
import { handleUpdateUserData } from '@store/UserContext/actions';

import Modal from '@components/UI/V1/Modal';
import Button from '@components/UI/V1/Button';
import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import Label from '@components/UI/V1/Label';
import Textarea from '@components/UI/V1/Textarea';

const EditBioButton = ({ setValues, values }) => {
	const { dispatch: userDispatch, state: userState } = useContext(UserContext);

	const [showBioEditModal, setShowBioEditModal] = useState(false);

	const [DisableBtns, setDisableBtns] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (values.bio === bio) return console.error('Nothing Changed!');

		setDisableBtns(true);

		const { status, message, data } = await handleUpdateUserData({
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
		}
	};

	return (
		<>
			<Button title='Edit Bio' onClick={() => setShowBioEditModal(true)}>
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
					<h2>Edit Bio</h2>
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
							/>
						</FormControl>
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
