import { useContext, useEffect, useState } from 'react';

import classes from './index.module.css';

import UserContext from '@store/UserContext';

import Reactions from './Reactions';

const Settings = ({ data, reactions, user_reaction, setData }) => {
	const { user, userExist, ...UserCxt } = useContext(UserContext);

	return (
		<section className={classes.settings}>
			<Reactions
				user={user}
				userExist={userExist}
				data={data}
				reactions={reactions}
				user_reaction={user_reaction}
				setData={setData}
			/>
			<div className={`${classes.comment} ${classes.item}`}>
				<button>comment</button>
			</div>
			<div className={`${classes.more} ${classes.item}`}>
				<button>More</button>
			</div>
		</section>
	);
};

export default Settings;
