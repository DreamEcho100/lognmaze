import { FC, HTMLAttributes, ReactNode } from 'react';

import classes from './index.module.css';

import { handleAllClasses } from '@commonLibIndependent/className';

interface Props extends HTMLAttributes<HTMLDivElement> {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
	children: ReactNode;
}

const FormatContainer: FC<Props> = ({
	defaultClasses = 'format-md',
	extraClasses = '',
	className = '',
	children,
	...props
}) => {
	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className: className,
	});

	return (
		<div {...props} className={allClasses}>
			{children}
		</div>
	);
};

export default FormatContainer;
