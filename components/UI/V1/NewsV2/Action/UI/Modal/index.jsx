import { Fragment, useEffect, useState } from 'react';

import Modal from '@components/UI/V1/Modal';
import Button from '@components/UI/V1/Button';

const ActionModal = ({ showModal, setShowModal, Header, Body }) => {
	return (
		<Modal
			showModal={showModal}
			setShowModal={setShowModal}
			click={() => setShowModal(false)}
			CloseButtonElement={(props) => (
				<Button title='Close Modal' {...props}>
					Close
				</Button>
			)}
		>
			<Fragment key='header'>{Header && <Header />}</Fragment>
			<Fragment key='body'>{Body && <Body />}</Fragment>
		</Modal>
	);
};

export default ActionModal;
