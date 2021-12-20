import classes from './Select.module.css';
import BorderClasses from '../Border.module.css';

import { handleAllClasses } from '@lib/v1/className';

const Select = ({
	defaultClasses = 'select',
	extraClasses = '',
	className = '',
	children,
	disabledOption = {},
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
		<select
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
			{disabledOption.text !== 0 && (
				<option disabled>{disabledOption.text}</option>
			)}
			{children}
		</select>
	);
};

export default Select;
