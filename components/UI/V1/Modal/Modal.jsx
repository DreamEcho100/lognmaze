import { useEffect } from 'react';
import classes from './Modal.module.css';

const Modal = ({ children, click, className, CloseButtonElement }) => {
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

	// useEffect(() => {
	// 	document.body.style.overflow = 'hidden';
	// }, []);

	return (
		<div
			className={
				className
					? `${className} ${classes['modal-mask']} ${classes['modal-close']} modal-mask modal-close`
					: `${classes['modal-mask']} ${classes['modal-close']} modal-mask modal-close`
			}
			onClick={closeModal}
		>
			<div className={`${classes['modal-wrapper']} modal-wrapper`}>
				<div className={`${classes['modal-container']} modal-container`}>
					<div className={`${classes['modal-header']} modal-header`}>
						{findByKey('header')}
					</div>
					<div className={`${classes['modal-body']} modal-body`}>
						{findByKey('body')}
					</div>
					<div className={`${classes['modal-footer']} modal-footer`}>
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
		</div>
	);
};

export default Modal;
