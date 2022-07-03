import { FC, OlHTMLAttributes, ReactNode } from 'react';

import classes from './index.module.css';

interface IProps extends Omit<OlHTMLAttributes<HTMLUListElement>, 'className'> {
	className?: string | ((defaultClassName: string) => string);
	variant: 'danger';
	children: ReactNode;
}

const MessagesListComponent: FC<IProps> = ({
	children,
	className,
	variant,
	...props
}: IProps) => {
	return (
		<ul
			{...props}
			className={
				typeof className === 'function'
					? `${className(classes.default)} ${classes[variant]}`
					: `${className} ${classes[variant]}`
			}
		>
			{children}
		</ul>
	);
};

export default MessagesListComponent;
