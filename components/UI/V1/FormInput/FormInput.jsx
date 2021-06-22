import classes from './FormInput.module.css';

import { handleAllClasses } from '../utils/index';

const FormInput = ({
	defaultClasses = 'form-input',
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
		<input {...props} className={allClasses}>
			{children}
		</input>
	);
};

export default FormInput;
