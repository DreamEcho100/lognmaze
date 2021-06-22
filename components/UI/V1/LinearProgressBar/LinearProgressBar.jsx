import classes from './LinearProgressBar.module.css';

import { handleAllClasses } from '../utils/index';

const LinearProgressBar = ({
	defaultClasses = 'progress-bar',
	extraClasses = '',
	className = '',
	length = 0,
	color = 'darkblue',
}) => {
	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	return (
		<div
			className={`${allClasses}`}
			style={{
				'--progress-bar-length': length,
				'--progress-bar-color': color,
			}}
		></div>
	);
};

export default LinearProgressBar;
