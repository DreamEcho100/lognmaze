import { FC, LabelHTMLAttributes, ReactNode } from 'react';

import classes from './index.module.css';

interface IProps
	extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'className'> {
	className?: string | ((defaultClassName: string) => string);
	children: ReactNode;
}

const LabelComponent: FC<IProps> = ({ className, children, ...props }) => {
	return (
		<label
			{...props}
			className={
				typeof className === 'function'
					? className(classes.default)
					: typeof className === 'string'
					? `${classes.default} ${className}`
					: classes.default
			}
		>
			{children}
		</label>
	);
};

export default LabelComponent;
