// import { useCallback, useLayoutEffect, useState } from 'react';

import classes from './index.module.css';

import LogNMazeSignature from '@svg/LogNMazeSignature';

const MainIntro = () => {
	return (
		<section
			className={`${classes['main-intro']} ${classes['remove-intro']}`}
		>
			<div className={classes.container}>
				<div
					className={`${classes['svg-container']} ${classes['draw-signature']}`}
				>
					<LogNMazeSignature
					// setAnimationEnd={setAnimationEnd}
					/>
				</div>
			</div>
		</section>
	);
};

export default MainIntro;
