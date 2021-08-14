import classes from './index.module.css';

import { handleAllClasses } from '../utils/index';

const Wrapper = ({
	defaultClasses = 'wrapper',
	extraClasses = '',
	className = '',
	children,
	...props
}) => {
	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	const wrapperProps = {
		className: allClasses,
		...props,
	};

	return <section {...wrapperProps}>{children}</section>;
};

export default Wrapper;
