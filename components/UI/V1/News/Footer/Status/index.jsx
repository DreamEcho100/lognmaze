import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

const Status = ({ newsItem, showComments, setShowComments }) => {
	return (
		<section className={classes.status}>
			<div className={`${classes.votes} ${classes['status-item']}`}>
				<button
					title='Up Vote'
					className={`${classes.vote} ${classes['up-vote']}`}
				>
					<FontAwesomeIcon icon={['fas', 'arrow-up']} />{' '}
					{newsItem.up_votes_counter}
				</button>

				<button
					title='Down Vote'
					className={`${classes.vote} ${classes['down-vote']}`}
				>
					<FontAwesomeIcon icon={['fas', 'arrow-down']} />{' '}
					{newsItem.down_votes_counter}
				</button>
			</div>
			<div
				onClick={() => {
					if (!showComments) {
						setShowComments(true);
					}
				}}
				className={`${classes.comments_counter} ${classes['status-item']}`}
			>
				{newsItem.comments_counter === 0 ? (
					<button title='No Comment'>
						<FontAwesomeIcon icon={['fas', 'comment-slash']} />
					</button>
				) : newsItem.comments_counter === 1 ? (
					<button title='1 Comment'>
						<FontAwesomeIcon icon={['fas', 'comment']} />
					</button>
				) : (
					<button title={`${newsItem.comments_counter} Comments`}>
						<FontAwesomeIcon icon={['fas', 'comments']} />
					</button>
				)}{' '}
				{newsItem.comments_counter}
			</div>
		</section>
	);
};

export default Status;
