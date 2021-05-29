import { useState } from 'react';
import classes from './Accordion.module.css';

const Accordion = ({
	defaultClasses = classes['accordion'],
	extraClasses = '',
	BoxShadow,
	children,
	className = '',
	toggltButtonSize,
	accordionContainerBorderBottomSize,
	...props
}) => {
	const [hideAccordion, useHideAccordion] = useState(false);

	const handleAllClasses = () => {
		let allClasses = '';
		if (defaultClasses !== classes['accordion']) {
			allClasses = defaultClasses
				.split(' ')
				.map((className) => classes[className])
				.join(' ');
		} else {
			allClasses = defaultClasses;
		}

		if (extraClasses.length !== 0) allClasses += ` ${extraClasses}`;

		allClasses += ` ${className}`;

		return allClasses.trim();
	};

	const allClasses = handleAllClasses();

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
				{findByKey('header')}
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
