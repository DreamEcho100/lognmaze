import classes from './index.module.css';

import { handleAllClasses } from '../utils/index';

const FormControl = ({
	defaultClasses = 'form-control',
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
		<div {...props} className={allClasses}>
			{children}
		</div>
	);
};

export default FormControl;