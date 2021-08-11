import { Fragment, useEffect, useState } from 'react';

import classes from './ModalContainer.module.css';

import Header from './Header/Header';
import Modal from '@components/UI/V1/Modal';
import Button from '@components/UI/V1/Button';

const ModalContainer = ({ showModal, setShowModal, HeaderProps, children }) => {
	return (
		<Modal
			showModal={showModal}
			setShowModal={setShowModal}
			click={() => setShowModal(false)}
			CloseButtonElement={(props) => (
				<Button type='button' {...props}>
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
