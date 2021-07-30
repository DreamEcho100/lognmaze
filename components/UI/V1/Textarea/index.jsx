import { useEffect, useRef } from 'react';

import classes from './index.module.css';
import BorderClasses from '../Border.module.css';

import { handleAllClasses } from '../utils/index';

const Textarea = ({
	defaultClasses = 'textarea',
	extraClasses = '',
	className = '',
	useElement = () => {},
	// useElementInEffect = () => {},
	// useElementInEffectDependencyList = [],
	children,
	onChange,
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
		useElement(textareaRef.current);
	}, []);

	// useEffect(() => {
	// 	if (!textareaRef.current) return;
	// 	useElementInEffect(textareaRef.current);
	// }, [...useElementInEffectDependencyList, textareaRef.current]);

	return (
		<textarea
			className={allClasses}
			className={`${allClasses} ${BorderClasses['border-2']}`}
			ref={textareaRef}
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
		</textarea>
	);
};

export default Textarea;
