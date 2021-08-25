import { useContext, useState } from 'react';

// import classes from './index.module.css';

import UserContextTest from '@store/UserContextTest';

import LogNMazeSignature from '../../../svg/LogNMazeSignature';

const MainIntro = () => {
	const { state: userState } = useContext(UserContextTest);

	const [animationEnd, setAnimationEnd] = useState(false);

	return (
		<div
			id='main-intro'
			className={`${
				!userState.isVerifyingUserLoading && animationEnd
					? 'verifying-credentials-finished'
					: ''
			}`}
		>
			<div className='svg-container'>
				<LogNMazeSignature setAnimationEnd={setAnimationEnd} />
			</div>
		</div>
	);
};

export default MainIntro;
