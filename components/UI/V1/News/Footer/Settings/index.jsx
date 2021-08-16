import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

import UserContext from '@store/UserContext';

import Reactions from './Reactions';

const Settings = ({
	data,
	reactions,
	user_reaction,
	setData,
	setShowComments,
	setFocusCommentTextarea,
	showComments,
	focusCommentTextarea,
	isLoadingReactions,
}) => {
	const { user, userExist, ...UserCxt } = useContext(UserContext);

	const [commentBtnDisabled, setCommentBtnDisabled] = useState(
		userExist ? false : true
	);
	commentBtnDisabled;
	useEffect(() => {
		if (userExist && commentBtnDisabled) {
			setCommentBtnDisabled(false);
		} else if (!userExist && !commentBtnDisabled) {
			setCommentBtnDisabled(true);
		}
	}, [userExist]);

	return (
		<section className={classes.settings}>
			<Reactions
				user={user}
				userExist={userExist}
				data={data}
				reactions={reactions}
				user_reaction={user_reaction}
				setData={setData}
				isLoadingReactions={isLoadingReactions}
			/>
			<div className={`${classes.comment} ${classes.item}`}>
				<button
					disabled={commentBtnDisabled}
					onClick={() => {
						if (commentBtnDisabled) return;
						if (!showComments) setShowComments(true);
						if (!focusCommentTextarea) setFocusCommentTextarea(true);
					}}
				>
					{/* Comment */}
					<FontAwesomeIcon icon={['fas', 'comment']} />
				</button>
			</div>
			<div className={`${classes.more} ${classes.item}`}>
				<button title='More (None At The Moment)' disabled>
					More
				</button>
			</div>
		</section>
	);
};

export default Settings;
