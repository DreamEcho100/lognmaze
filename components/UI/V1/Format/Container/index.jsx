import classes from './index.module.css';

import { handleAllClasses } from '../../utils/index';

const Container = ({
	defaultClasses = 'format-md',
	extraClasses = '',
	className = '',
	children,
}) => {
	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className: className,
	});

	return <main className={allClasses}>{children}</main>;
};

export default Container;