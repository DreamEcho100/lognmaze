import { Fragment } from 'react';
// import dynamic from 'next/dynamic';

// import classes from './Modal.module.css';

// const DynamicModal = dynamic(() => import('@components/UI/V1/Modal'));

import Modal from '@components/UI/V1/Modal';
import Button from '@components/UI/V1/Button';
import Container from '@components/UI/V1/News/Container';

const NewsModal = ({ setCloseModal, detailsType, data }) => {
	return (
		<Modal
			// DynamicModal
			click={() => setCloseModal(true)}
			CloseButtonElement={(props) => (
				<Button title='Close' {...props}>
					Close
				</Button>
			)}
		>
			<Fragment key='header'>{/* <Header data={data} /> */}</Fragment>
			<Fragment key='body'>
				<Container data={data} detailsType={detailsType} />
			</Fragment>
		</Modal>
	);
};

export default NewsModal;
