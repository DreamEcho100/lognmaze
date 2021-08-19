import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

const Votes = ({ user, userExist, data, setData, isLoadingUserVote }) => {
	const [voteBtnDisabled, setVoteBtnDisabled] = useState(
		userExist || isLoadingUserVote ? false : true
	);

	const handleVoting = async (vote_type) => {
		if (!userExist) return;
		setVoteBtnDisabled(true);

		if (
			!data.user_vote_type ||
			(data.user_vote_type && data.user_vote_type.length === 0)
		) {
			const result = await fetch('/api/v1/news/votes/vote', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					news_id: data.news_id,
					vote_type,
				}),
			}).then((response) => response.json());

			if (result?.status === 'error') {
				console.error(result.message);

				setVoteBtnDisabled(false);
				return;
			}

			setData((prev) => ({
				...prev,
				[`${vote_type}_votes_counter`]: prev[`${vote_type}_votes_counter`]
					? parseInt(prev[`${vote_type}_votes_counter`]) + 1
					: 1,
				user_vote_type: vote_type,
			}));
		} else {
			if (data.user_vote_type !== vote_type) {
				const result = await fetch('/api/v1/news/votes/vote', {
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({
						news_id: data.news_id,
						old_type: data.user_vote_type,
						new_type: vote_type,
					}),
				}).then((response) => response.json());

				if (result?.status === 'error') {
					console.error(result.message);

					setVoteBtnDisabled(false);
					return;
				}

				setData((prev) => ({
					...prev,
					[`${prev.user_vote_type}_votes_counter`]: prev[
						`${prev.user_vote_type}_votes_counter`
					]
						? parseInt(prev[`${prev.user_vote_type}_votes_counter`]) - 1
						: 0,
					[`${vote_type}_votes_counter`]: prev[`${vote_type}_votes_counter`]
						? parseInt(prev[`${vote_type}_votes_counter`]) + 1
						: 1,
					user_vote_type: vote_type,
				}));
			} else if (data.user_vote_type === vote_type) {
				const result = await fetch('/api/v1/news/votes/vote', {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${user.token}`,
					},
					body: JSON.stringify({
						news_id: data.news_id,
						vote_type,
					}),
				}).then((response) => response.json());

				if (result?.status === 'error') {
					console.error(result.message);

					setVoteBtnDisabled(false);
					return;
				}

				setData((prev) => ({
					...prev,
					[`${prev.user_vote_type}_votes_counter`]: prev[
						`${prev.user_vote_type}_votes_counter`
					]
						? parseInt(prev[`${prev.user_vote_type}_votes_counter`]) - 1
						: 0,
					user_vote_type: '',
				}));
			}
		}

		setVoteBtnDisabled(false);
	};

	useEffect(() => {
		if (userExist && !isLoadingUserVote && voteBtnDisabled) {
			setVoteBtnDisabled(false);
		} else if (!userExist && !voteBtnDisabled) {
			setVoteBtnDisabled(true);
		}
	}, [userExist, isLoadingUserVote]);

	return (
		<div className={`${classes.votes} ${classes.item}`}>
			<button
				title='up'
				onClick={() => handleVoting('up')}
				className={`${
					data.user_vote_type === 'up' ? classes['user_vote_type'] : ''
				}`}
				disabled={voteBtnDisabled}
			>
				{/* up */}
				{data.user_vote_type === 'up' ? (
					<FontAwesomeIcon icon={['fas', 'long-arrow-alt-up']} />
				) : (
					<FontAwesomeIcon icon={['fas', 'arrow-up']} />
				)}
			</button>
			<button
				title='down'
				onClick={() => handleVoting('down')}
				className={`${
					data.user_vote_type === 'down' ? classes['user_vote_type'] : ''
				}`}
				disabled={voteBtnDisabled}
			>
				{/* down */}
				{data.user_vote_type === 'down' ? (
					<FontAwesomeIcon icon={['fas', 'long-arrow-alt-down']} />
				) : (
					<FontAwesomeIcon icon={['fas', 'arrow-down']} />
				)}
			</button>
		</div>
	);
};

export default Votes;
