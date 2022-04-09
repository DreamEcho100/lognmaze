import React, { forwardRef, ReactNode } from 'react';
// import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Header, Trigger } from '@radix-ui/react-accordion';

import classes from './index.module.css';

import withClassName from '@commonLibIndependent/hoc/withClassName';

interface IAccordionTriggerForwardedProps {
	children?: ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	props?: { [key: string]: any };
}

const StyledHeader = withClassName(Header, classes.AccordionHeader);
const StyledTrigger = withClassName(Trigger, classes.AccordionTrigger);

const CustomAccordionHeaderTrigger = forwardRef<
	HTMLButtonElement,
	IAccordionTriggerForwardedProps
>(function AccordionTriggerForwarded({ children, ...props }, forwardedRef) {
	return (
		<StyledHeader>
			<StyledTrigger {...props} ref={forwardedRef}>
				{children}

				{/* <FontAwesomeIcon
					icon={faArrowAltCircleUp}
					className={classes.AccordionChevronDownIcon}
					aria-hidden
				/> */}
			</StyledTrigger>
		</StyledHeader>
	);
});

export default CustomAccordionHeaderTrigger;
