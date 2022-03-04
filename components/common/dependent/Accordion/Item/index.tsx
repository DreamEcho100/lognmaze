import { Item } from '@radix-ui/react-accordion';

import classes from './styles.module.css';

import withClassName from '@commonLibIndependent/hoc/withClassName';

const StyledItem = withClassName(Item, classes.AccordionItem);

const CustomAccordionItem = StyledItem;

export default CustomAccordionItem;
