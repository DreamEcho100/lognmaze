import classes from './index.module.css';

import { handleAllClasses } from '@lib/v1/className';

const Button = ({
	defaultClasses = 'button',
	extraClasses = '',
	className = '',
	children,
	type = 'button',
	...props
}) => {
	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	const buttonProps = {
		className: allClasses,
		type,
		...props,
	};

	return <button {...buttonProps}>{children}</button>;
};

export default Button;
