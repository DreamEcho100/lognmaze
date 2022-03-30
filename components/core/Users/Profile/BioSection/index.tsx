// import { useState } from 'react';
// import dynamic from 'next/dynamic';

import classes from './index.module.css';

// const DynamicEditBioButton = dynamic(() => import('./EditBioButton'), {
// 	ssr: false,
// });

// const GUEST = 'GUEST';
// const OWNER = 'OWNER';

interface IProps {
	bio?: string;
	// visitorIdentity
}

const ProfileBioSection = ({
	bio = '',
}: // visitorIdentity
IProps) => {
	// const [values, setValues] = useState({
	// 	bio,
	// });

	return (
		<div className={classes.bio}>
			<header className={classes.header}>
				<h2>Bio:</h2>
				{/* {visitorIdentity === OWNER && (
					<DynamicEditBioButton values={values} setValues={setValues} />
				)} */}
			</header>
			<main>
				<p>{bio}</p>
			</main>
		</div>
	);
};

export default ProfileBioSection;
