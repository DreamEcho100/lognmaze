import { useContext, useEffect, useRef, useState } from 'react';

import classes from './index.module.css';

import UserContext from '@store/UserContext';

import LogNMazeSignature from '@svg/LogNMazeSignature';

const MainIntro = () => {
	const introRef = useRef();

	const { state: userState } = useContext(UserContext);

	const [animationEnd, setAnimationEnd] = useState(false);
	const [introHorizontal, setIntroHorizontal] = useState(true);

	useEffect(() => {
		const handleResize = (element) => {
			if (!element?.offsetWidth) return;

			const width = element.offsetWidth;
			const height = element.offsetHeight;

			// console.log('width', width);
			// console.log('height', height);

			if (width > height) {
				if (!introHorizontal) setIntroHorizontal(true);
			} else {
				if (introHorizontal) setIntroHorizontal(false);
			}
		};

		handleResize(introRef.current);
		const onResize = (event) => handleResize(introRef.current);

		window.addEventListener('resize', onResize);

		return () => window.removeEventListener('resize', onResize);
	}, [introRef.current]);

	// console.log('introHorizontal', introHorizontal);

	return (
		<div
			ref={introRef}
			className={`${
				!userState.isVerifyingUserLoading && animationEnd
					? classes['verifying-credentials-finished']
					: ''
			} 
			${!introHorizontal ? classes['setVertical'] : ''} ${classes['main-intro']}
			`}
		>
			<div className={classes['svg-container']}>
				<LogNMazeSignature setAnimationEnd={setAnimationEnd} />
			</div>
		</div>
	);
};

export default MainIntro;
