import React from 'react';
import classes from './Form.module.css';

const Form = ({
	defaultClasses = classes['default-form'],
	extraClasses = '',
	BoxShadow,
	children,
	className = '',
	...props
}) => {
	const handleAllClasses = () => {
		let allClasses = '';
		if (defaultClasses !== classes['default-form']) {
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
		<form {...props} className={allClasses}>
			{children}
		</form>
	);
};

export default Form;
