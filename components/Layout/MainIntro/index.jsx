import classes from './index.module.css';

import LogNMazeSignature from '@svg/LogNMazeSignature';

const MainIntro = ({ isWindowVertical }) => {
	/*
	const onResize = useCallback(() => {
		const width = window.innerWidth;
		const height = window.innerHeight;

		if (!isWindowVertical && width < height) return setIsWindowVertical(true);
		if (isWindowVertical && width > height) return setIsWindowVertical(false);
	}, []);

	useLayoutEffect(() => {
		onResize();

		document.body.addEventListener('resize', onResize);

		setIsStartingIntro(true);

		return () => document.body.removeEventListener('resize', onResize);
	}, []);
	*/

	return (
		<section
			className={`${classes['main-intro']} ${
				isWindowVertical ? classes['window-is-vertical'] : ''
			}
				${classes['remove-intro']}
			`}
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
