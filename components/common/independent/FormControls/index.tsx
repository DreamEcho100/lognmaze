import { FC, HTMLAttributes, ReactNode } from 'react';

import classes from './index.module.css';

interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
	className?: string | ((defaultClassName: string) => string);
	children: ReactNode;
}

const FormControlsComponent: FC<IProps> = ({
	className,
	children,
	...props
}) => {
	return (
		<div
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
		</div>
	);
};

export default FormControlsComponent;
