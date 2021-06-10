import React from 'react';
import classes from './FormControls.module.css';

const FormControls = ({
	defaultClasses = classes['form-controls-2'],
	extraClasses = '',
	BoxShadow,
	children,
	className = '',
	...props
}) => {
	const handleAllClasses = () => {
		let allClasses = '';
		if (defaultClasses !== classes['form-controls-2']) {
			allClasses = defaultClasses
				.split(' ')
				.map((className) => classes[className])
				.join(' ');
		} else {
			allClasses = defaultClasses;
		}

		if (extraClasses.length !== 0) allClasses += ` ${extraClasses}`;

		allClasses += ` ${className}`;

		return allClasses.trim();
	};

	const allClasses = handleAllClasses();

	return (
		<div {...props} className={allClasses}>
			{children}
		</div>
	);
};

export default FormControls;
