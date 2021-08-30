import { Fragment, useContext, useState } from 'react';

import UserContext from '@/store/UserContext';
import { handleUpdateUserData } from '@/store/UserContext/actions';

import Modal from '@components/UI/V1/Modal';
import Form from '@components/UI/V1/Form';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';
import FormControl from '@components/UI/V1/FormControl';
import Button from '@components/UI/V1/Button';

const UpdateUserPicture = ({
	showModal,
	setShowModal,
	values = {},
	setValues,
	name,
	ModalHeader = () => {
		return <></>;
	},
	// ...props
}) => {
	const { dispatch: userDispatch, state: userState } = useContext(UserContext);

	const [AfterFormSubmitMessage, setAfterFormSubmitMessage] = useState(() => (
		<></>
	));
	const [buttonsDisabled, setButtonsDisabled] = useState(false);

	const submitHandler = async (event) => {
		event.preventDefault();

		setAfterFormSubmitMessage(() => <></>);

		if (values[name]?.length === 0) {
			setAfterFormSubmitMessage(() => <p>{'Empty field/s!'}</p>);
			return;
		}

		setButtonsDisabled(true);

		const { status, message, data } = await handleUpdateUserData({
			dispatch: userDispatch,
			userData: userState.user,
			token: userState.token,
			values: {
				[name]: values[name],
			},
		}).catch((error) => {
			setAfterFormSubmitMessage(() => <p>{error.message}</p>);
			setButtonsDisabled(false);
			return { status: 'error', message: error.message };
		});

		if (status === 'error') {
			setButtonsDisabled(false);
			console.error(message);
			setAfterFormSubmitMessage(() => <p>{message}</p>);
			return { status, message };
		}

		setShowModal(() => {
			setButtonsDisabled(false);

			return false;
		});
		return { status, message };
	};

	return (
		<Modal
			// DynamicModal
			showModal={showModal}
			click={() => setShowModal(false)}
			CloseButtonElement={(props) => (
				<Button title='Close' {...props}>
					Close
				</Button>
			)}
		>
			<Fragment key='header'>
				<ModalHeader />
			</Fragment>
			<Fragment key='body'>
				<Form
					// extraClasses={`${BoxShadowClasses['box-shadow']}`}
					onSubmit={submitHandler}
				>
					<FormControl>
						<Label htmlFor='url-input'>Or Enter A URL:</Label>
						<Input
							type='text'
							id='url-input'
							name={name}
							value={values[name]}
							setValues={setValues}
						/>
					</FormControl>

					<div // className={classes.warning}
					>
						{AfterFormSubmitMessage}
					</div>

					<Button
						title='Submit'
						disabled={buttonsDisabled}
						type='submit'
						// className={classes.submitBtn}
					>
						Submit
					</Button>
				</Form>
			</Fragment>
		</Modal>
	);
};

export default UpdateUserPicture;
