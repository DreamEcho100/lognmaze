import classes from './FormInput.module.css';

const FormInput = ({
	defaultClasses = classes['form-input'],
	extraClasses = '',
	BoxShadow,
	children,
	className = '',
	...props
}) => {
	const handleAllClasses = () => {
		let allClasses = '';
		if (defaultClasses !== classes['form-input']) {
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
		<input {...props} className={allClasses}>
			{children}
		</input>
	);
};

export default FormInput;
