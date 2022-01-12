import { Fragment } from 'react';

import BorderClasses from '@components/UI/V1/Border.module.css';

import Modal from '@components/UI/V1/Modal';
import Button from '@components/UI/V1/Button';
import ContainerItems from '@components/UI/V1/News/Container/ContainerItems';

const DeleteNewsModal = ({
	showModal,
	setShowModal,
	blogProps,
	newsItem,
	hideFooterSettings,
}) => {
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
			modelClasses={{
				'modal-wrapper': { width: '90%', maxWidth: 'none' },
				'modal-container': { background: 'var(--main-bg-color-2)' },
				'modal-body': {
					background: 'var(--main-bg-color-1)',
				},
			}}
		>
			<Fragment key='header'>{/* <Header /> */}</Fragment>
			<Fragment key='body'>
				<ContainerItems
					className={`${BorderClasses['border-2']}`}
					blogProps={blogProps}
					newsItem={newsItem}
					setShowModal={setShowModal}
					detailsType='content'
					hideFooterSettings={hideFooterSettings}
				/>
			</Fragment>
		</Modal>
	);
};

export default DeleteNewsModal;
