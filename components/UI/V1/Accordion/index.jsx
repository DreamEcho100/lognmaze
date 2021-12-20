import { useState } from 'react';

import classes from './index.module.css';

import { handleAllClasses } from '@lib/v1/className';

const Accordion = ({
	defaultClasses = 'accordion',
	extraClasses = '',
	className = '',
	children,
	toggltButtonSize,
	accordionContainerBorderBottomSize,
	style = {},
	...props
}) => {
	const [hideAccordion, setHideAccordion] = useState(false);

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
				['--toggltButtonSize']: toggltButtonSize ? toggltButtonSize : '1',
				['--accordionContainerBorderBottomSize']:
					accordionContainerBorderBottomSize
						? accordionContainerBorderBottomSize
						: '1',
				...style,
			}}
			className={`${
				classes['accordion-container']
			} ${allClasses} accordion-container ${
				hideAccordion ? classes['toggle'] : ''
			}`}
		>
			<div className={`${classes['accordion-header']} accordion-header`}>
				<div
					className={classes['container']}
					onClick={() => setHideAccordion((prop) => !prop)}
				>
					<div className=''>{findByKey('header')}</div>
					<span
						className={`${classes['toggle-accordion-button-container']} ${
							hideAccordion ? classes['toggle'] : ''
						}`}
					>
						<button
							title={`${hideAccordion ? 'Show' : 'Hide'} accordion button`}
							className={classes['toggle-accordion-button']}
						></button>
					</span>
				</div>
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
