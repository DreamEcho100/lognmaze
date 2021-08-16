import { useState } from 'react';

// import classes from './index.module.css';

import Button from '@components/UI/V1/Button';

const ButtonModalShower = ({ buttonText, ModalElement }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button title={buttonText} onClick={() => setShowModal(true)}>
				{buttonText}
			</Button>
			<ModalElement showModal={showModal} setShowModal={setShowModal} />
		</>
	);
};

export default ButtonModalShower;
