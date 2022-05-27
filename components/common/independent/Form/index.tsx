import { FC, FormHTMLAttributes } from 'react';

import classes from './index.module.css';

interface IProps
	extends Omit<FormHTMLAttributes<HTMLFormElement>, 'className'> {
	className?: string | ((defaultClassName: string) => string);
}

const FormComponent: FC<IProps> = ({ className, children, ...props }) => {
	return (
		<form
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
		</form>
	);
};

export default FormComponent;
