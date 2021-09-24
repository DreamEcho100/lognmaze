import classes from './index.module.css';

import { handleAllClasses } from '@/lib/v1/className';

const Form = ({
	defaultClasses = 'default-form',
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
		<form {...props} className={allClasses}>
			{children}
		</form>
	);
};

export default Form;
