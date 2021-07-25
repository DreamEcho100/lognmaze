import { useContext, useState } from 'react';

import classes from './index.module.css';

import UserContext from '@store/UserContext';

const Settings = ({ data, reactions, user_reaction, setData }) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [reactBtnDisabled, setReactBtnDisabled] = useState(false);

	const handleReaction = async (reaction) => {
		setReactBtnDisabled(true);
		if (!data.user_reaction) {
			const bodyObj = {
				news_id: data.news_id,
				news_reaction_type: reaction,
			};
			let methodType = 'PATCH';

			data.reactions.find((item) => {
				if (item.type === reaction) {
					if (item.news_reaction_id) {
						bodyObj.news_reaction_id = item.news_reaction_id;
					} else {
						methodType = 'POST';
					}
					return true;
				}
			});

			await fetch('/api/v1/news/reactions/reaction', {
				method: methodType,
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify(bodyObj),
			})
				.then((response) => response.json())
				.then(({ status, message, data }) => {
					if (status === 'error') {
						return console.error(message);
					}

					setData((prev) => ({
						...prev,
						user_reaction: reaction,
						reactions: prev.reactions.map((item) => {
							if (item.type === reaction) {
								return {
									...item,
									count: item.count + 1,
									news_reaction_id: item.news_reaction_id
										? item.news_reaction_id
										: data.news_reaction_id,
								};
							}
							return item;
						}),
					}));
				})
				.catch((error) => {
					console.error('error', error);
				});
		} else if (reaction === data.user_reaction) {
			const bodyObj = {
				news_reaction_type: reaction,
			};
			reactions.forEach((item) => {
				if (item.type === reaction)
					bodyObj.news_reaction_id = item.news_reaction_id;
			});
			await fetch('/api/v1/news/reactions/reaction', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify(bodyObj),
			})
				.then((response) => response.json())
				.then(({ status, message, data }) => {
					if (status === 'error') {
						return console.error(message);
					}

					setData((prev) => ({
						...prev,
						user_reaction: '',
						reactions: prev.reactions.map((item) => {
							if (item.type === reaction) {
								return {
									...item,
									count: item.count - 1,
								};
							}
							return item;
						}),
					}));
				});
		} else if (reaction !== data.user_reaction) {
			const bodyObj = {
				news_id: data.news_id,
				new_reaction: reaction,
			};

			reactions.forEach((item) => {
				if (item.type === reaction)
					return (bodyObj.new_reaction_id = item.news_reaction_id);

				if (item.type === data.user_reaction)
					return (bodyObj.old_reaction_id = item.news_reaction_id);
			});

			await fetch('/api/v1/news/reactions/reaction', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify(bodyObj),
			})
				.then((response) => response.json())
				.then(({ status, message, data }) => {
					if (status === 'error') {
						return console.error(message);
					}

					setData((prev) => ({
						...prev,
						reactions: prev.reactions.map((item) => {
							if (item.type === reaction) {
								return {
									...item,
									count: item.count + 1,
									news_reaction_id:
										typeof item.news_reaction_id === 'string' &&
										item.news_reaction_id.length !== 0
											? item.news_reaction_id
											: data.new_reaction_id,
								};
							}
							if (item.type === prev.user_reaction) {
								return {
									...item,
									count: item.count - 1,
								};
							}
							return item;
						}),
						user_reaction: reaction,
					}));
				})
				.catch((error) => {
					console.error('error', error);
				});
		}
		setReactBtnDisabled(false);
	};

	return (
		<section className={classes.settings}>
			<div className={`${classes.reaction} ${classes.item}`}>
				<button
					onClick={() => handleReaction('upvote')}
					className={`${
						user_reaction === 'upvote' ? classes['user-reaction'] : ''
					}`}
					disabled={reactBtnDisabled}
				>
					Upvote
				</button>
				<button
					onClick={() => handleReaction('downvote')}
					className={`${
						user_reaction === 'downvote' ? classes['user-reaction'] : ''
					}`}
					disabled={reactBtnDisabled}
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
