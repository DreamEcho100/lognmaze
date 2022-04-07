import { useEffect, useState } from 'react';

import classes from './index.module.css';

import LogNMazeSignature from '@coreComponents/LogNMazeSignature';

const MainIntroComponent = () => {
	const [removeIntro, setRemoveIntro] = useState(false);

	useEffect(() => {
		setRemoveIntro(true);
		// const timeoutId = setTimeout(() => setRemoveIntro(true), 100);

		// return () => clearTimeout(timeoutId);
	}, []);

	return (
		<div className={`${classes.mainIntro} ${removeIntro && classes.animate}`}>
			<div className={classes.container}>
				<div className={`${classes.svgContainer} ${classes.drawSignature}`}>
					<LogNMazeSignature
					// setAnimationEnd={setAnimationEnd}
					/>
				</div>
			</div>
		</div>
	);
};

export default MainIntroComponent;
