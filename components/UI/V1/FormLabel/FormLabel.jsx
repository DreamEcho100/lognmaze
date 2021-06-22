import classes from './FormLabel.module.css';

import { handleAllClasses } from '../utils/index';

const FormLabel = ({
	defaultClasses = 'form-label',
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
		<label {...props} className={allClasses}>
			{children}
		</label>
	);
};

export default FormLabel;
