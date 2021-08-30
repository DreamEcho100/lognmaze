import { useContext, useEffect, useRef, useState } from 'react';

// import classes from './index.module.css';

import UserContext from '@store/UserContext';

import LogNMazeSignature from '@svg/LogNMazeSignature';

const MainIntro = () => {
	const introRef = useRef();

	const { state: userState } = useContext(UserContext);

	const [animationEnd, setAnimationEnd] = useState(false);
	const [introHorizontal, setIntroHorizontal] = useState(true);

	useEffect(() => {
		const handleResize = () => {
			const width = introRef.current.offsetWidth;
			const height = introRef.current.offsetHeight;

			if (width > height) {
				if (!introHorizontal) setIntroHorizontal(true);
			} else {
				if (introHorizontal) setIntroHorizontal(false);
			}
		};

		handleResize();

		window.addEventListener('resize', handleResize);
	}, []);

	return (
		<div
			ref={introRef}
			id='main-intro'
			className={`${
				!userState.isVerifyingUserLoading && animationEnd
					? 'verifying-credentials-finished'
					: ''
			}
			${!introHorizontal ? 'setVertical' : ''}
			`}
		>
			<div className='svg-container'>
				<LogNMazeSignature setAnimationEnd={setAnimationEnd} />
			</div>
		</div>
	);
};

export default MainIntro;
