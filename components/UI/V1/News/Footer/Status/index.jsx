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
							title={item.type}
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
				{data.comments_counter === 0 ? (
					<button title='No Comment'>
						<FontAwesomeIcon icon={['fas', 'comment-slash']} />
					</button>
				) : data.comments_counter === 1 ? (
					<button title='1 Comment'>
						<FontAwesomeIcon icon={['fas', 'comment']} />
					</button>
				) : (
					<button title={`${data.comments_counter} Comments`}>
						<FontAwesomeIcon icon={['fas', 'comments']} />
					</button>
				)}{' '}
				{data.comments_counter}
			</div>
		</section>
	);
};

export default Status;
