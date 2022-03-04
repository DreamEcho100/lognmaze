import { Root } from '@radix-ui/react-accordion';
import classes from './styles.module.css';
import withClassName from '@commonLibIndependent/hoc/withClassName';

const StyledAccordion = withClassName(Root, classes.AccordionRoot);

const CustomAccordionRoot = StyledAccordion;

export default CustomAccordionRoot;
