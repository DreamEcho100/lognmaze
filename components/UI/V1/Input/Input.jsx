import classes from './Input.module.css';
import BorderClasses from '../Border.module.css';

import { handleAllClasses } from '../utils/index';

const Input = ({
	defaultClasses = 'input',
	extraClasses = '',
	className = '',
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
		className,
	});

	return (
		<input
			type={type}
			palceholder={palceholder}
			className={`${allClasses} ${BorderClasses['border-bottom']}`}
			onChange={(event) => {
				if (setValues) {
					return setValues((prev) => ({
						...prev,
						[event.target.name]: event.target.value,
					}));
				}
				if (onChange) return onChange(event);
			}}
			{...props}
		>
			{children}
		</input>
	);
};

export default Input;
