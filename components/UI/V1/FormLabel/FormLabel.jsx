import React from 'react';
import classes from './FormLabel.module.css';

const FormLabel = ({
	defaultClasses = classes['form-label'],
	extraClasses = '',
	BoxShadow,
	children,
	className = '',
	...props
}) => {
	const handleAllClasses = () => {
		let allClasses = '';
		if (defaultClasses !== classes['form-label']) {
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
		<label {...props} className={allClasses}>
			{children}
		</label>
	);
};

export default FormLabel;
