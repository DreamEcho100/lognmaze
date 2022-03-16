import { Item } from '@radix-ui/react-accordion';

import classes from './index.module.css';

import withClassName from '@commonLibIndependent/hoc/withClassName';

const StyledItem = withClassName(Item, classes.AccordionItem);

const CustomAccordionItem = StyledItem;

export default CustomAccordionItem;
