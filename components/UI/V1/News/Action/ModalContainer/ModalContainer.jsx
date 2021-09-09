import { Fragment, useEffect, useState } from 'react';

import Modal from '@components/UI/V1/Modal';
import Header from './Header/Header';
import Button from '@components/UI/V1/Button';

const ModalContainer = ({ showModal, setShowModal, HeaderProps, children }) => {
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
			<Fragment key='header'>
				<Header {...HeaderProps} />
			</Fragment>
			<Fragment key='body'>{children}</Fragment>
		</Modal>
	);
};

export default ModalContainer;
