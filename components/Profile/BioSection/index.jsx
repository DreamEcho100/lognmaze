import { useState } from 'react';
import dynamic from 'next/dynamic';

import classes from './index.module.css';

const DynamicEditBioButton = dynamic(() => import('./EditBioButton'), {
	ssr: false,
});

const GUEST = 'GUEST';
const OWNER = 'OWNER';

const BioSection = ({ bio = '', visitorIdentity }) => {
	const [values, setValues] = useState({
		bio,
	});

	return (
		<section className={classes.bio}>
			<header className={classes.header}>
				<h2>Bio:</h2>
				{visitorIdentity === OWNER && (
					<DynamicEditBioButton values={values} setValues={setValues} />
				)}
			</header>
			<main>
				<p>{bio}</p>
			</main>
		</section>
	);
};

export default BioSection;
