import { Fragment, useState } from 'react';
import { useRouter } from 'next/router';

import BoxShadowClasses from '@components/UI/V1/BoxShadow.module.css';

import Modal from '@components/UI/V1/Modal';
import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import Label from '@components/UI/V1/Label';
import Input from '@components/UI/V1/Input';
import Button from '@components/UI/V1/Button';

const ChangeUserNameIdModal = ({
	user,
	token,
	userDispatch,
	handleUpdateUserData,
	showModal,
	setShowModal,
}) => {
	const router = useRouter();

	const [userNameId, setUserNameId] = useState(user.user_name_id);
	const [password, setPassword] = useState('');

	const [AfterFormSubmitMessage, setAfterFormSubmitMessage] = useState(() => (
		<></>
	));
	const [btnsDisabled, setBtnsDisabled] = useState(false);

	const submitHandler = async (event) => {
		event.preventDefault();

		setBtnsDisabled(true);
		setAfterFormSubmitMessage(() => <></>);

		const { status, message } = await handleUpdateUserData({
			dispatch: userDispatch,
			userData: user,
			values: { user_name_id: userNameId },
			password,
			token,
		}).catch((error) => {
			return { status: 'error', message: error.message };
		});

		if (status === 'error') {
			console.error(message);
			setAfterFormSubmitMessage(() => <>{message}</>);
			setBtnsDisabled(false);
			return { status, message };
		}

		setShowModal((prev) => {
			setPassword('');
			setBtnsDisabled(false);

			return false;
		});

		router.push(`/profile/${userNameId}`);
		return { status, message };
	};

	return (
		<Modal
			showModal={showModal}
			click={() => setShowModal(false)}
			CloseButtonElement={(props) => (
				<Button title='Close' {...props}>
					Close
				</Button>
			)}
		>
			<Fragment key='header'>
				<h1>Change Your User Name Id</h1>
			</Fragment>
			<Fragment key='body'>
				<Form
					extraClasses={`${BoxShadowClasses['box-shadow']}`}
					onSubmit={submitHandler}
				>
					<FormControl>
						<Label htmlFor='userNameId'>Your User Name Id</Label>
						<Input
							type='text'
							id='userNameId'
							required
							onChange={(event) => setUserNameId(event.target.value)}
							value={userNameId}
						/>
					</FormControl>
					<FormControl>
						<Label htmlFor='password-to-change-basic-info-in-settings'>
							Enter Your Password
						</Label>
						<Input
							type='password'
							id='password-to-change-basic-info-in-settings'
							required
							onChange={(event) => setPassword(event.target.value)}
							value={password}
						/>
					</FormControl>

					<div
					>
						{AfterFormSubmitMessage}
					</div>

					<Button
						title='Submit'
						disabled={btnsDisabled}
						type='submit'
					>
						Submit
					</Button>
				</Form>
			</Fragment>
		</Modal>
	);
};

export default ChangeUserNameIdModal;
