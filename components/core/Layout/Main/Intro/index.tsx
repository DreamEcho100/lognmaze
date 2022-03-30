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
		<div
			className={`${classes['main-intro']} ${
				removeIntro && classes['remove-intro']
			}`}
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
		</div>
	);
};

export default MainIntroComponent;
