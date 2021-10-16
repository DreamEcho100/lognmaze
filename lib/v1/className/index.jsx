export const handleAddingLoadingSkeletonClass = (
	isLoadingSkeleton,
	classes = {},
	defaultClass = ''
) => {
	return `${classes} ${
		isLoadingSkeleton
			? `${defaultClass} ${classes.isLoadingSkeleton} skeleton-loading`
			: defaultClass
	}`;
};

export const handleAllClasses = ({
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

	allClasses += ` ${className}`;

	return allClasses.trim().replace(/\s/, ' ');
};
