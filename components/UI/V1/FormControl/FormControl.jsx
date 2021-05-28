import classes from './FormControl.module.css';

const FormControl = ({
	defaultClasses = classes['form-control'],
	extraClasses = '',
	BoxShadow,
	children,
	className = '',
	...props
}) => {
	const handleAllClasses = () => {
		let allClasses = '';
		if (defaultClasses !== classes['form-control']) {
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

export default FormControl;
