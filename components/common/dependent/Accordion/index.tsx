import React from 'react';

import CustomAccordionRoot from './Root';
import CustomAccordionItem from './Item';
import CustomAccordionHeaderTrigger from './HeaderTrigger';
import CustomAccordionContent from './Content';
// Your app...
export const AccordionDemo = () => (
	<CustomAccordionRoot type='single' defaultValue='item-1' collapsible>
		<CustomAccordionItem value='item-1'>
			<CustomAccordionHeaderTrigger>
				Is it accessible?
			</CustomAccordionHeaderTrigger>
			<CustomAccordionContent>
				Yes. It adheres to the WAI-ARAI design pattern.
			</CustomAccordionContent>
		</CustomAccordionItem>

		<CustomAccordionItem value='item-2'>
			<CustomAccordionHeaderTrigger>
				Is it unstyled?
			</CustomAccordionHeaderTrigger>
			<CustomAccordionContent>
				Yes. It&apos;s unstyled by default, giving you freedom over the look and
				feel.
			</CustomAccordionContent>
		</CustomAccordionItem>

		<CustomAccordionItem value='item-3'>
			<CustomAccordionHeaderTrigger>
				Can it be animated?
			</CustomAccordionHeaderTrigger>
			<CustomAccordionContent>
				Yes! You can animate the CustomAccordionRoot with CSS or JavaScript.
			</CustomAccordionContent>
		</CustomAccordionItem>
	</CustomAccordionRoot>
);

export default AccordionDemo;
