import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

import UserContextTest from '@store/UserContextTest';

import Votes from './Votes';

const Settings = ({
	newsItem,
	setShowComments,
	setFocusCommentTextarea,
	showComments,
	focusCommentTextarea,
	isLoadingUserVote,
}) => {
	const { state: userState } = useContext(UserContextTest);

	const [commentBtnDisabled, setCommentBtnDisabled] = useState(
		userState.userExist ? false : true
	);
	commentBtnDisabled;
	useEffect(() => {
		if (userState.userExist && commentBtnDisabled) {
			setCommentBtnDisabled(false);
		} else if (!userState.userExist && !commentBtnDisabled) {
			setCommentBtnDisabled(true);
		}
	}, [userState.userExist]);

	return (
		<section className={classes.settings}>
			<Votes
				user={userState.user}
				userExist={userState.userExist}
				newsItem={newsItem}
				isLoadingUserVote={isLoadingUserVote}
			/>
			<div className={`${classes.comment} ${classes.item}`}>
				<button
					title={`Comment on this ${newsItem.type.toLowerCase()}`}
					disabled={commentBtnDisabled && userState.userExist}
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
