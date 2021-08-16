import { Fragment, useContext, useState } from 'react';
// import dynamic from 'next/dynamic';

import classes from './index.module.css';

import UserContext from '@store/UserContext';

// const DynamicModal = dynamic(() => import('@components/UI/V1/Modal'));

import Modal from '@components/UI/V1/Modal';
import Button from '@components/UI/V1/Button';
import Form from '@components/UI/V1/Form';
import FormControl from '@components/UI/V1/FormControl';
import Label from '@components/UI/V1/Label';
import Textarea from '@components/UI/V1/Textarea';

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const BioSection = ({ bio = '', visitorIdentity }) => {
	const { handleChangeBio, ...UserCxt } = useContext(UserContext);

	const [showBioEditModal, setShowBioEditModal] = useState(false);
	const [values, setValues] = useState({
		bio,
	});
	const [DisableBtns, setDisableBtns] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (values.bio === bio) return console.error('Nothing Changed!');

		setDisableBtns(true);

		const { status, message, data } = await handleChangeBio(values.bio);

		if (status === 'success') {
			setShowBioEditModal(false);
		}

		if (status === 'error') {
			console.error(message);
		}

		setDisableBtns(false);
	};

	return (
		<section className={classes.bio}>
			<header className={classes.header}>
				<h2>Bio:</h2>
				{visitorIdentity === OWNER && (
					<Button title='Edit' onClick={() => setShowBioEditModal(true)}>
						Edit
					</Button>
				)}
				<Modal
					// DynamicModal
					showModal={showBioEditModal}
					click={() => setShowBioEditModal(false)}
					CloseButtonElement={(props) => (
						<Button title='Close' type='button' {...props}>
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
								/>
							</FormControl>
							<Button title='Submit' disabled={DisableBtns} type='submit'>
								Submit
							</Button>
						</Form>
					</Fragment>
				</Modal>
			</header>
			<main>
				<p>{bio}</p>
			</main>
		</section>
	);
};

export default BioSection;
