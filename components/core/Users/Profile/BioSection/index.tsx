// import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import classes from './index.module.css';

const DynamicEditBioButton = dynamic(() => import('./EditBioButton'), {
	ssr: false,
});

// const GUEST = 'GUEST';
// const OWNER = 'OWNER';

interface IProps {
	bio?: string;
	profilePageVisitorStatus: 'VISITOR_PROFILE_GUEST' | 'VISITOR_PROFILE_OWNER';
}

const ProfileBioSection = ({
	bio = '',
	profilePageVisitorStatus,
}: // visitorIdentity
IProps) => {
	const [values, setValues] = useState({
		bio: bio || '',
	});

	return (
		<div className={classes.bio}>
			<header className={classes.header}>
				<h2>Bio:</h2>
				{profilePageVisitorStatus === 'VISITOR_PROFILE_OWNER' && (
					<DynamicEditBioButton originalBio={bio} />
				)}
			</header>
			<main>
				<p>{bio}</p>
			</main>
		</div>
	);
};

export default ProfileBioSection;
