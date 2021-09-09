import { useEffect, useRef } from 'react';

import classes from './index.module.css';
import BorderClasses from '../Border.module.css';

import { handleAllClasses } from '../utils/index';

const Textarea = ({
	defaultClasses = 'textarea',
	extraClasses = '',
	className = '',
	children,
	onChange,
	focus,
	setFocus,
	setValues,
	...props
}) => {
	const textareaRef = useRef();

	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	useEffect(() => {
		if (focus) {
			textareaRef.current.focus();
		}
	}, [focus]);

	const textareaProps = {
		className: `${allClasses} ${BorderClasses['border-2']}`,
		ref: textareaRef,
		onChange: (event) => {
			if (setValues) {
				return setValues((prev) => ({
					...prev,
					[event.target.name]: event.target.value,
				}));
			}
			if (onChange) return onChange(event);
		},
		onBlur: () => {
			if (setFocus) {
				if (focus) {
					setFocus(false);
				}
			}
		},
		...props,
	};

	return <textarea {...textareaProps}>{children}</textarea>;
};

export default Textarea;
