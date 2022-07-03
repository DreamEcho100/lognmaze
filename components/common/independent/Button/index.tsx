import { FC, ButtonHTMLAttributes, ReactNode } from 'react';

import classes from '@styles/components/common/independent/Button/index.module.css';

interface IProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
	className?: string | ((defaultClassName: string) => string);
	children: ReactNode;
}

const ButtonComponent: FC<IProps> = ({ className, children, ...props }) => {
	return (
		<button
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
		</button>
	);
};

export default ButtonComponent;
