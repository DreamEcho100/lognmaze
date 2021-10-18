import { Fragment, useEffect, useState } from 'react';

import classes from './index.module.css';

import { useUserSharedState } from '@store/UserContext';
import { handleUpdateUserDataToTheLatest } from '@store/UserContext/actions';
import { checkCookie, setCookie } from '@lib/v1/cookie';

import Button from '@components/UI/V1/Button';
import Modal from '@components/UI/V1/Modal';
import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';

const LoadYourLatestDataButton = () => {
	const [userState, userDispatch] = useUserSharedState();

	const [showModal, setShowModal] = useState(false);
	const [disableButtons, setDisableButtons] = useState(true);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (disableButtons) return;
		setDisableButtons(true);

		const result = await handleUpdateUserDataToTheLatest({
			token: userState.token,
			dispatch: userDispatch,
		});

		if (result.status === 'success') {
			setCookie({
				cookieName: `latestDataForToken[${userState.token}]BeenLoaded`,
				cookieValue: 'true',
				expiresDate: new Date(new Date().getTime() + 5000 * 60).toUTCString(),
			});

			if (!disableButtons) setDisableButtons(true);
		} else {
			setDisableButtons(false);
		}
		setShowModal(false);
	};

	useEffect(() => {
		if (showModal) {
			if (
				checkCookie({
					cookieName: `latestDataForToken[${userState.token}]BeenLoaded`,
					cookieString: document.cookie,
				})
			) {
				if (!disableButtons) setDisableButtons(true);
			} else {
				if (disableButtons) setDisableButtons(false);
			}
		}
	}, [showModal]);

	return (
		<>
			<Button
				title='Show Load Your Latest Data Modal'
				onClick={() => setShowModal(true)}
			>
				Load Your Latest Data
			</Button>

			<Modal
				showModal={showModal}
				click={() => setShowModal(false)}
				CloseButtonElement={(props) => (
					<Button title='Close Modal' type='button' {...props}>
						Close
					</Button>
				)}
			>
				<Fragment key='header'>
					<h2>Load Your Latest Data</h2>
				</Fragment>
				<Fragment key='body'>
					<Form onSubmit={handleSubmit}>
						<fieldset className={classes.fieldset}>
							<legend>
								<h3>Load Your latest Data</h3>
							</legend>
							<FormControl>
								<p className={classes['notes-header']}>
									<strong>
										<em>Notes:</em>
									</strong>
								</p>
								<ul className={classes.notes}>
									<li>
										<p>
											<strong>
												It&apos;s advisable to do this if you have updated your
												user data in another place and it&apos;s not shown here.
											</strong>
										</p>
									</li>
									<li>
										<p>
											<strong>
												You can do this only every five minutes from your latest
												Load.
											</strong>
										</p>
									</li>
								</ul>
							</FormControl>
							<Button
								title='Load Your Latest Data Button'
								type='submit'
								disabled={disableButtons}
							>
								Load
							</Button>
						</fieldset>
					</Form>
				</Fragment>
			</Modal>
		</>
	);
};

export default LoadYourLatestDataButton;
