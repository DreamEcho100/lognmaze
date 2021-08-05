import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import classes from './index.module.css';

import { handleAllClasses } from '../utils/index';

const Modal = ({
	defaultClasses = `modal-mask modal-close`,
	extraClasses = '',
	className = '',
	modelClasses = {},
	children,
	click,
	CloseButtonElement,
}) => {
	const findByKey = (name) => {
		return children.filter((child) => child.key === name);
	};

	const closeModal = (event) => {
		event.stopPropagation();

		if (event.target.classList.contains('modal-close')) {
			click();
			return new Promise((resolve, reject) => {
				click();
				resolve();
			});
			// .then(() => (document.body.style.overflowY = 'auto'));
		}
	};

	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	return createPortal(
		<div
			className={`${allClasses} modal-close`}
			style={modelClasses['modal-mask']}
			onClick={closeModal}
		>
			<div
				className={`${classes['modal-wrapper']}`}
				style={modelClasses['modal-wrapper']}
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
		// document.getElementsByTagName('body')[0]
		document.getElementById('__next')
	);
};

export default Modal;
