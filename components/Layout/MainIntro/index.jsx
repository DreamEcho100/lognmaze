import { useContext, useState } from 'react';

import classes from './index.module.css';

import UserContext from '@store/UserContext';

import LogNMazeSignature from '@/svg/LogNMazeSignature';

const MainIntro = () => {
	const UserCxt = useContext(UserContext);

	const [animationEnd, setAnimationEnd] = useState(false);

	return (
		<div
			id='main-intro'
			className={`${
				!UserCxt.isLoading && animationEnd
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
