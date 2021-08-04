import classes from './index.module.css';
import BorderClasses from '../Border.module.css';

import { handleAllClasses } from '../utils/index';

const Input = ({
	defaultClasses = 'input',
	extraClasses = '',
	className = '',
	cn = '',
	children,
	type = 'text',
	palceholder = '',
	onChange,
	setValues,
	...props
}) => {
	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className: className || cn,
	});

	const elementProps = {
		type: type,
		palceholder: palceholder,
		className: `${allClasses} ${BorderClasses['border-bottom']}`,
		onChange: (event) => {
			if (setValues) {
				return setValues((prev) => ({
					...prev,
					[event.target.name]: event.target.value,
				}));
			}
			if (onChange) return onChange(event);
		},
		...props,
	};

	return (
		<input {...elementProps} className={`${allClasses} ${BorderClasses['border-bottom']}`}>
			{children}
		</input>
	);
};

export default Input;
