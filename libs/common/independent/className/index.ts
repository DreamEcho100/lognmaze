import { THandleAllClasses } from './ts';

export const handleAllClasses: THandleAllClasses = ({
	classes,
	defaultClasses = '',
	extraClasses = '',
	className = '',
}) => {
	let allClasses = '';

	if (classes) {
		if (defaultClasses && defaultClasses.length !== 0) {
			allClasses += defaultClasses
				.split(' ')
				.map((className) => classes[className])
				.join(' ');
		}

		allClasses += ' ';

		if (extraClasses.length !== 0) {
			allClasses += extraClasses
				.split(' ')
				.map((className) => classes[className])
				.join(' ');
		}

		allClasses += ' ';
	}

	if (className) allClasses += ` ${className}`;

	return allClasses.trim().replace(/\s/, ' ');
};

export const bundleClassesIfExist = (classes: (string | undefined)[]) => {
	let allClasses = '';

	classes.forEach(
		(className) =>
			typeof className === 'string' &&
			className.length > 0 &&
			(allClasses += ' ' + className)
	);

	return allClasses;
};
