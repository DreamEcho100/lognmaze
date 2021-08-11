import { useState } from 'react';

import classes from './ButtonModuleDisplayer.module.css';

import Button from '@components/UI/V1/Button';

const ButtonModuleDisplayer = ({ buttonText, ModalElement }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<Button onClick={() => setShowModal(true)}>{buttonText}</Button>
			<ModalElement showModal={showModal} setShowModal={setShowModal} />
		</>
	);
};

export default ButtonModuleDisplayer;
