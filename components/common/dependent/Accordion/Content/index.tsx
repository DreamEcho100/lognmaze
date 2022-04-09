import React, { forwardRef, ReactNode } from 'react';
import { Content } from '@radix-ui/react-accordion';

import classes from './index.module.css';

import withClassName from '@commonLibIndependent/hoc/withClassName';

const StyledContent = withClassName(Content, classes.AccordionContent);

interface AccordionContentForwardedProps {
	children?: ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	props?: { [key: string]: any };
}

export const CustomAccordionContent = forwardRef<
	HTMLDivElement,
	AccordionContentForwardedProps
>(function AccordionContentForwarded({ children, ...props }, forwardedRef) {
	return (
		<StyledContent {...props} ref={forwardedRef}>
			<div className={classes.AccordionContentText}>{children}</div>
		</StyledContent>
	);
});

export default CustomAccordionContent;
