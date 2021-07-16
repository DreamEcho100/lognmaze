import classes from './Input.module.css';

import { handleAllClasses } from '../utils/index';

const Input = ({
	defaultClasses = 'input',
	extraClasses = '',
	className = '',
	children,
	type = 'text',
	palceholder = '',
	onChange = () => {},
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
			className={allClasses}
			onChange={(event) => {
				if (setValues) {
					return setValues((prev) => ({
						...prev,
						[event.target.name]: event.target.value,
					}));
				}
				return onChange(event);
			}}
			{...props}
		>
			{children}
		</input>
	);
};

export default Input;
