import { useEffect, useState } from 'react';

import classes from './index.module.css';

import LogNMazeSignature from '@svg/LogNMazeSignature';

const MainIntro = () => {
	// const [animationEnd, setAnimationEnd] = useState(false);
	const [isWindowVertical, setIsWindowVertical] = useState(
		typeof window !== 'undefined' && window.innerWidth > window.innerHeight ? false : true);

	useEffect(() => {
		const onResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			if (!isWindowVertical && width < height) setIsWindowVertical(true);
			if (isWindowVertical && width > height) setIsWindowVertical(false);
		};

		onResize();

		document.addEventListener('resize', onResize);

		return () => document.removeEventListener('resize', onResize);
	}, []);

	return (
		<section
			className={`${classes['main-intro']} ${
				isWindowVertical && classes['window-is-vertical']
			}`}
		>
			<div className={classes.container}>
				<div className={classes['svg-container']}>
					<LogNMazeSignature
					// setAnimationEnd={setAnimationEnd}
					/>
				</div>
			</div>
		</section>
	);
};

export default MainIntro;
