import { Dispatch, HTMLAttributes, SetStateAction } from 'react';

import classes from './index.module.css';

interface IProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
	className?: string | ((defaultClassName: string) => string);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setValues?: Dispatch<SetStateAction<any>>;
	elemType?: 'section' | 'article' | 'div';
}

const SectionWrapper = ({
	className,
	children,
	elemType = 'div',
	...props
}: IProps) => {
	const sectionWrapperProps = {
		className:
			typeof className === 'function'
				? className(classes.default)
				: typeof className === 'string'
				? `${classes.default} ${className}`
				: classes.default,
		...props,
	};

	if (elemType === 'section')
		return <section {...sectionWrapperProps}>{children}</section>;
	if (elemType === 'article')
		return <article {...sectionWrapperProps}>{children}</article>;
	return <div {...sectionWrapperProps}>{children}</div>;
};

export default SectionWrapper;
