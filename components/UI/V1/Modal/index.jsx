import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const DynamicModal = dynamic(() => import('./Modal'));

const ModalHOC = ({
	click,
	CloseButtonElement,
	showModal,
	hideScrollOnView = true,
	...props
}) => {
	useEffect(() => {
		if (!hideScrollOnView) return;
		if (showModal) {
			document.body.style.overflowY = 'hidden';
		} else {
			click();
			document.body.style.overflowY = 'auto';
		}
	}, [showModal]);

	const ModalProps = {
		...props,
		click,
		CloseButtonElement,
		showModal,
		hideScrollOnView,
	};

	if (!showModal) {
		return <></>;
	}

	return <DynamicModal {...ModalProps} />;
};

export default ModalHOC;
