import { useEffect, useState } from 'react';

import classes from './index.module.css';

import LogNMazeSignature from '@coreComponents/LogNMazeSignature';

const MainIntroComponent = () => {
	const [removeIntro, setRemoveIntro] = useState(false);

	useEffect(() => {
		setRemoveIntro(true);
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
