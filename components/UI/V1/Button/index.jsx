import classes from './index.module.css';

import { handleAllClasses } from '../utils/index';

const Button = ({
	defaultClasses = 'button',
	extraClasses = '',
	className = '',
	children,
	...props
}) => {
	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	return (
		<button {...props} className={allClasses}>
			{children}
		</button>
	);
};

export default Button;
