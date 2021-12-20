import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import classes from './index.module.css';

import { handleAllClasses } from '@lib/v1/className';

const ModalHOC = ({
	hideScrollOnView = true,
	defaultClasses = `modal-mask modal-close`,
	extraClasses = '',
	className = '',
	modelClasses = {},
	children,
	click,
	CloseButtonElement,
	showModal,
	...props
}) => {
	const modalWrapperRef = useRef();

	const findByKey = (name) => {
		return children.filter((child) => child.key === name);
	};

	const closeModal = (event) => {
		event.stopPropagation();

		if (event.target.classList.contains('modal-close')) {
			click();
		}
	};

	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	useEffect(() => {
		if (!hideScrollOnView) return;

		if (showModal) {
			document.body.style.overflowY = 'hidden';
			modalWrapperRef.current.scrollIntoView();
			return;
		}

		document.body.style.overflowY = 'auto';
		click();

		// return () => {
		// 	if (showModal) return (document.body.style.overflowY = 'auto');

		// 	document.body.style.overflowY = 'hidden';
		// };
	}, [showModal, click, hideScrollOnView]);

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

	return createPortal(
		<div
			className={`${allClasses} modal-close`}
			style={modelClasses['modal-mask']}
			onClick={closeModal}
		>
			<div
				className={`${classes['modal-wrapper']}`}
				style={modelClasses['modal-wrapper']}
				ref={modalWrapperRef}
			>
				<div
					className={`${classes['modal-container']}`}
					style={modelClasses['modal-container']}
				>
					<div
						className={`${classes['modal-header']}`}
						style={modelClasses['modal-header']}
					>
						{findByKey('header')}
					</div>
					<div
						className={`${classes['modal-body']}`}
						style={modelClasses['modal-body']}
					>
						{findByKey('body')}
					</div>
					<div
						className={`${classes['modal-footer']}`}
						style={modelClasses['modal-footer']}
					>
						{CloseButtonElement && (
							<CloseButtonElement
								className='modal-close'
								onClick={closeModal}
							/>
						)}
						{findByKey('footer')}
					</div>
				</div>
			</div>
		</div>,
		document.getElementById('__next')
	);
};

export default ModalHOC;
