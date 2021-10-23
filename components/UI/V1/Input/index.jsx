import { useRef } from 'react';

import classes from './index.module.css';
import BorderClasses from '../Border.module.css';

import { handleAllClasses } from '@/lib/v1/className';
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
	setElementUseIn = () => {
		return;
	},
	elementUseIn = () => {
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
			elementUseIn(inputRef.current);
			setElementUseIn(false);
		}
	}, [
		useElement,
		// elementUseIn, setElementUseIn
	]);

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
