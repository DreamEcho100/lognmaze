import { Dispatch, HTMLAttributes, SetStateAction } from 'react';

import classes from './index.module.css';

import { handleAllClasses } from '@commonLibIndependent/className';

interface IProps extends HTMLAttributes<HTMLElement> {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
	setValues?: Dispatch<SetStateAction<any>>;
}

const SectionWrapper = ({
	defaultClasses = 'sectionWrapper',
	extraClasses = '',
	className = '',
	children,
	...props
}: IProps) => {
	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	const sectionWrapperProps = {
		className: allClasses,
		...props,
	};

	return <section {...sectionWrapperProps}>{children}</section>;
};

export default SectionWrapper;
