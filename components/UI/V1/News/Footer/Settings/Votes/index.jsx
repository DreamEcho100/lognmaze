import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

import {
	HandleAddingUserVote,
	HandleDeletingUserVote,
	HandleChangingUserVote,
} from '@store/NewsContext/actions';
import NewsContext from '@store/NewsContext';

const Votes = ({ user, userExist, newsItem, setData, isLoadingUserVote }) => {
	const { dispatch } = useContext(NewsContext);

	const [voteBtnDisabled, setVoteBtnDisabled] = useState(
		!userExist || isLoadingUserVote ? false : true
	);

	const handleVoting = async (vote_type) => {
		if (!userExist || isLoadingUserVote) return;
		setVoteBtnDisabled(true);

		if (
			!newsItem.user_vote_type ||
			(newsItem.user_vote_type && newsItem.user_vote_type.length === 0)
		) {
			await HandleAddingUserVote({
				dispatch,
				user,
				news_id: newsItem.news_id,
				vote_type,
			});
		} else {
			if (newsItem.user_vote_type !== vote_type) {
				await HandleChangingUserVote({
					dispatch,
					user,
					news_id: newsItem.news_id,
					old_vote_type: newsItem.user_vote_type,
					new_vote_type: vote_type,
				});
			} else if (newsItem.user_vote_type === vote_type) {
				await HandleDeletingUserVote({
					dispatch,
					user,
					news_id: newsItem.news_id,
					vote_type,
				});
			}
		}

		setVoteBtnDisabled(false);
	};

	useEffect(() => {
		if ((!userExist || isLoadingUserVote) !== voteBtnDisabled) {
			setVoteBtnDisabled(!userExist || isLoadingUserVote);
		}
	}, [userExist, isLoadingUserVote]);

	return (
		<div className={`${classes.votes} ${classes.item}`}>
			<button
				title='up'
				onClick={() => handleVoting('up')}
				className={`${
					newsItem.user_vote_type === 'up' ? classes['user_vote_type'] : ''
				}`}
				disabled={voteBtnDisabled}
			>
				{/* up */}
				{newsItem.user_vote_type === 'up' ? (
					<FontAwesomeIcon icon={['fas', 'long-arrow-alt-up']} />
				) : (
					<FontAwesomeIcon icon={['fas', 'arrow-up']} />
				)}
			</button>
			<button
				title='down'
				onClick={() => handleVoting('down')}
				className={`${
					newsItem.user_vote_type === 'down' ? classes['user_vote_type'] : ''
				}`}
				disabled={voteBtnDisabled}
			>
				{/* down */}
				{newsItem.user_vote_type === 'down' ? (
					<FontAwesomeIcon icon={['fas', 'long-arrow-alt-down']} />
				) : (
					<FontAwesomeIcon icon={['fas', 'arrow-down']} />
				)}
			</button>
		</div>
	);
};

export default Votes;
