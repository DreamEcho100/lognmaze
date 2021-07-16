import classes from './Label.module.css';

import { handleAllClasses } from '../utils/index';

const Label = ({
	defaultClasses = 'label',
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

export default Label;
