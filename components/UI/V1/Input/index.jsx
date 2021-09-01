import { useRef } from 'react';

import classes from './index.module.css';
import BorderClasses from '../Border.module.css';

import { handleAllClasses } from '../utils/index';
import { useEffect } from 'react';

const Input = ({
	defaultClasses = 'input',
	extraClasses = '',
	className = '',
	children,
	type = 'text',
	placeholder = '',
	onChange,
	setValues,
	useElement = false,
	setUseElement = () => {
		return;
	},
	useElementIn = () => {
		return;
	},
	...props
}) => {
	const inputRef = useRef();

	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className: className,
	});

	const inputProps = {
		ref: inputRef,
		type: type,
		placeholder,
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

	useEffect(() => {
		if (useElement) {
			useElementIn(inputRef.current);
			setUseElement(false);
		}
	}, [useElement]);

	return (
		<input
			{...inputProps}
			className={`${allClasses} ${BorderClasses['border-bottom']}`}
		>
			{children}
		</input>
	);
};

export default Input;
