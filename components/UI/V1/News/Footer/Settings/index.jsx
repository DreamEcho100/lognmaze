import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

import UserContext from '@store/UserContext';

import Votes from './Votes';

const Settings = ({
	newsItem,

	setData,
	setShowComments,
	setFocusCommentTextarea,
	showComments,
	focusCommentTextarea,
	isLoadingUserVote,
}) => {
	const { user, userExist } = useContext(UserContext);

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
			<Votes
				user={user}
				userExist={userExist}
				newsItem={newsItem}
				setData={setData}
				isLoadingUserVote={isLoadingUserVote}
			/>
			<div className={`${classes.comment} ${classes.item}`}>
				<button
					title={`Comment on this ${newsItem.type.toLowerCase()}`}
					disabled={commentBtnDisabled && userExist}
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
