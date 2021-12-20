import classes from './FormControls.module.css';

import { handleAllClasses } from '@lib/v1/className';

const FormControls = ({
	defaultClasses = 'form-controls',
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

export default FormControls;
