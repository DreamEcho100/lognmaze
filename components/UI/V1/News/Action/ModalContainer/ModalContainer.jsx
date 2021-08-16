import { Fragment, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// import classes from './ModalContainer.module.css';

const DynamicModal = dynamic(() => import('@components/UI/V1/Modal'));

// import Modal from '@components/UI/V1/Modal';
import Header from './Header/Header';
import Button from '@components/UI/V1/Button';

const ModalContainer = ({ showModal, setShowModal, HeaderProps, children }) => {
	return (
		<DynamicModal
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
		</DynamicModal>
	);
};

export default ModalContainer;
