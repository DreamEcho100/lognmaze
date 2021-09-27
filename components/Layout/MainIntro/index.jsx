import { useContext, useEffect, useRef, useState } from 'react';

import classes from './index.module.css';

// import UserContext from '@store/UserContext';

import LogNMazeSignature from '@svg/LogNMazeSignature';

const MainIntro = () => {
	const introRef = useRef();

	const [animationEnd, setAnimationEnd] = useState(false);

	// console.log('introHorizontal', introHorizontal);

	return (
		<section ref={introRef} className={classes['main-intro']}>
			<div className={classes.container}>
				<div className={classes['svg-container']}>
					<LogNMazeSignature setAnimationEnd={setAnimationEnd} />
				</div>
			</div>
		</section>
	);
};

export default MainIntro;
