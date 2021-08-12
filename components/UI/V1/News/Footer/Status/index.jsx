import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

const Status = ({ data, showComments, setShowComments }) => {
	return (
		<section className={classes.status}>
			<div className={`${classes.reactions} ${classes['status-item']}`}>
				{data.reactions.map((item, index) => {
					let icon;

					if (item.type === 'upvote') {
						icon = ['fas', 'arrow-up'];
					} else if (item.type === 'downvote') {
						icon = ['fas', 'arrow-down'];
					}

					return (
						<button
							key={item.news_reaction_id || index}
							className={`${classes.reaction} ${item.type}`}
						>
							<FontAwesomeIcon icon={icon} /> {item.counter}
						</button>
					);
				})}
			</div>
			<div
				onClick={() => {
					if (!showComments) {
						setShowComments(true);
					}
				}}
				className={`${classes.comments_counter} ${classes['status-item']}`}
			>
				<button>
					{data.comments_counter === 0 ? (
						<FontAwesomeIcon icon={['fas', 'comment-slash']} />
					) : data.comments_counter === 1 ? (
						<FontAwesomeIcon icon={['fas', 'comment']} />
					) : (
						<FontAwesomeIcon icon={['fas', 'comments']} />
					)}{' '}
					{data.comments_counter}
				</button>
			</div>
		</section>
	);
};

export default Status;
