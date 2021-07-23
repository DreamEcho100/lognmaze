import { useContext } from 'react';

import classes from './index.module.css';

import UserContext from '@store/UserContext';

const Settings = ({ data, reactions, setData }) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const handleReaction = async (reaction) => {
		if (!reactions.userReaction) {
			const body = JSON.stringify({
				news_id: data.news_id,
				reaction,
				news_reaction_id: data.reactions.types[reaction].id,
			});
			return await fetch('api/v1/news/reactions/reaction', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${user.token}`,
				},
				body,
			})
				.then((response) => response.json())
				.then(({ status, message, data }) => {
					if (status === 'error') {
						return console.error(message);
					}
					setData((prev) => ({
						...prev,
						reactions: {
							userReaction: reaction,
							types: {
								...prev.reactions.types,
								[reaction]: {
									count: prev.reactions.types[reaction].count + 1,
									id: prev.reactions.types[reaction].id
										? prev.reactions.types[reaction].id
										: data.news_reaction_id,
									data: [user.id],
								},
							},
						},
					}));
				})
				.catch((error) => {
					console.error('error', error);
				});
		}

		if (reaction === reactions.userReaction) {
			const body = JSON.stringify({
				news_reaction_id: data.reactions.types[reaction].id,
				news_reaction_type: reaction,
			});
			return await fetch('api/v1/news/reactions/reaction', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${user.token}`,
				},
				body,
			})
				.then((response) => response.json())
				.then(() => {
					setData((prev) => ({
						...prev,
						reactions: {
							userReaction: '',
							types: {
								...prev.reactions.types,
								[reaction]: {
									...prev.reactions.types[reaction],
									count: prev.reactions.types[reaction].count - 1,
									// data: [],
								},
							},
						},
					}));
				});
		}

		if (reaction !== reactions.userReaction) {
			const body = JSON.stringify({
				news_id: data.news_id,
				old_reaction_id: data.reactions.types[reactions.userReaction].id,
				new_reaction_id: data.reactions.types[reaction].id,
				new_reaction: reaction,
			});
			return await fetch('api/v1/news/reactions/reaction', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${user.token}`,
				},
				body,
			})
				.then((response) => response.json())
				.then(({ status, message, data }) => {
					if (status === 'error') {
						return console.error(message);
					}
					setData((prev) => ({
						...prev,
						reactions: {
							userReaction: reaction,
							types: {
								...prev.reactions.types,
								[reaction]: {
									count: prev.reactions.types[reaction].count + 1,
									id: prev.reactions.types[reaction].id
										? prev.reactions.types[reaction].id
										: data.new_reaction_id,
									// data: [],
								},
								[reactions.userReaction]: {
									...prev.reactions.types[reactions.userReaction],
									count: prev.reactions.types[reactions.userReaction].count - 1,
									// data: [],
								},
							},
						},
					}));
				})
				.catch((error) => {
					console.error('error', error);
				});
		}
	};

	return (
		<section className={classes.settings}>
			<div className={`${classes.reaction} ${classes.item}`}>
				<button
					onClick={() => handleReaction('upvote')}
					className={`${
						reactions.userReaction === 'upvote' ? classes['user-reaction'] : ''
					}`}
				>
					Upvote
				</button>
				<button
					onClick={() => handleReaction('downvote')}
					className={`${
						reactions.userReaction === 'downvote'
							? classes['user-reaction']
							: ''
					}`}
				>
					Downvote
				</button>
			</div>
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
