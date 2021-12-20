import classes from './index.module.css';

import { handleAllClasses } from '@lib/v1/className';

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
