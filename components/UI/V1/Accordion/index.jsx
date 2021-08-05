import { useState } from 'react';

import classes from './index.module.css';

import { handleAllClasses } from '../utils/index';

const Accordion = ({
	defaultClasses = 'accordion',
	extraClasses = '',
	className = '',
	children,
	toggltButtonSize,
	accordionContainerBorderBottomSize,
	...props
}) => {
	const [hideAccordion, useHideAccordion] = useState(false);

	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	const findByKey = (name) => {
		return children.filter((child) => child.key === name);
	};

	return (
		<div
			{...props}
			style={{
				'--toggltButtonSize': toggltButtonSize ? toggltButtonSize : '1',
				'--accordionContainerBorderBottomSize':
					accordionContainerBorderBottomSize
						? accordionContainerBorderBottomSize
						: '1',
			}}
			className={`${
				classes['accordion-container']
			} ${allClasses} accordion-container ${
				hideAccordion ? classes['toggle'] : ''
			}`}
		>
			<div className={`${classes['accordion-header']} accordion-header`}>
				<div className={classes['container']}>{findByKey('header')}</div>
				<button
					className={`${classes['toggle-accordion-body']} ${
						hideAccordion ? classes['toggle'] : ''
					}`}
					onClick={() => useHideAccordion((prop) => !prop)}
				>
					<div className={classes['arrow-container']}></div>
				</button>
			</div>
			<div
				className={`${classes['accordion-body']} ${
					hideAccordion ? classes['toggle'] : ''
				} accordion-body`}
			>
				{findByKey('body')}
			</div>
			<div className={`${classes['accordion-footer']} accordion-footer`}>
				{!hideAccordion && findByKey('footer')}
			</div>
		</div>
	);
};

export default Accordion;
