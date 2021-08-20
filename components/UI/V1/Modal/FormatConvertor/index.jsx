import { Fragment } from 'react';

import classes from './index.module.css';

import Modal from '@components/UI/V1/Modal';
import FormatConvertor from '@components/UI/V1/FormatConvertor';
import Button from '@components/UI/V1//Button';

const FormatConvertorModal = ({
	showModal,
	setShowModal,
	formatConvertorProps = {},
}) => {
	const modelClasses = {
		'modal-wrapper': {
			width: '100%',
			height: '100vh',
			minHeight: '100%',
			maxWidth: 'unset',
		},
		'modal-container': {
			background: 'rgba(255, 255, 255)',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'stretch',
			justifyContent: 'stretch',
		},
		'modal-body': { height: '50%', width: '100%' },
	};

	return (
		<Modal
			// DynamicModal
			hideScrollOnView={false}
			showModal={showModal}
			setShowModal={setShowModal}
			click={() => setShowModal(false)}
			CloseButtonElement={(props) => (
				<Button title='Close' {...props}>
					Close
				</Button>
			)}
			modelClasses={modelClasses}
		>
			<Fragment key='header'>
				<h2>Convertor</h2>
			</Fragment>
			<Fragment key='body'>
				<FormatConvertor {...formatConvertorProps} />
			</Fragment>
		</Modal>
	);
};

export default FormatConvertorModal;