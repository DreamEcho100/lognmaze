import classes from './Textarea.module.css';

import { handleAllClasses } from '../utils/index';

const Textarea = ({
	defaultClasses = 'default-textarea',
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
		<textarea {...props} className={allClasses}>
			{children}
		</textarea>
	);
};

export default Textarea;
