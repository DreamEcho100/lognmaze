import React from 'react';
import classes from './LinearProgressBar.module.css';

const LinearProgressBar = ({ length = 0, color = 'darkblue' }) => {
	return (
		<div
			style={{
				'--progress-bar-length': length,
				'--progress-bar-color': color,
			}}
			className={classes['progress-bar']}
		></div>
	);
};

export default LinearProgressBar;
