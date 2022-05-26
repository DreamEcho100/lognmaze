import { Dispatch, HTMLAttributes, SetStateAction } from 'react';

import classes from './index.module.css';

import { handleAllClasses } from '@commonLibIndependent/className';

interface IProps extends HTMLAttributes<HTMLElement> {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setValues?: Dispatch<SetStateAction<any>>;
	elemType?: 'section' | 'article' | 'div';
}

const SectionWrapper = ({
	defaultClasses = 'sectionWrapper',
	extraClasses = '',
	className = '',
	children,
	elemType = 'div',
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

	if (elemType === 'section')
		return <section {...sectionWrapperProps}>{children}</section>;
	if (elemType === 'article')
		return <article {...sectionWrapperProps}>{children}</article>;
	return <div {...sectionWrapperProps}>{children}</div>;
};

export default SectionWrapper;
