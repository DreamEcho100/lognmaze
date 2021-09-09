import { Fragment } from 'react';

import Modal from '@components/UI/V1/Modal';
import Button from '@components/UI/V1/Button';
import Container from '@components/UI/V1/News/Container';

const NewsModal = ({ setCloseModal, detailsType, data }) => {
	return (
		<Modal
			click={() => setCloseModal(true)}
			CloseButtonElement={(props) => (
				<Button title='Close Modal' {...props}>
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
