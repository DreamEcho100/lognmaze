import { useState } from 'react';

import Button from '@components/UI/V1/Button';

const ButtonModalShower = ({ buttonText, ModalElement, ModelProps }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button title={buttonText} onClick={() => setShowModal(true)}>
				{buttonText}
			</Button>
			<ModalElement
				{...ModelProps}
				showModal={showModal}
				setShowModal={setShowModal}
			/>
		</>
	);
};

export default ButtonModalShower;
