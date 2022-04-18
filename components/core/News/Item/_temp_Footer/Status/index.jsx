import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

const Status = ({ newsItemData, showComments, setShowComments }) => {
	return (
		<section className={classes.status}>
			{/* <div className={`${classes.votes} ${classes['status-item']}`}>
				<button
					title='Up Vote'
					className={`${classes.vote} ${classes['up-vote']}`}
				>
					<FontAwesomeIcon icon={['fas', 'arrow-up']} />{' '}
					{newsItemData.up_votes_counter}
				</button>

				<button
					title='Down Vote'
					className={`${classes.vote} ${classes['down-vote']}`}
				>
					<FontAwesomeIcon icon={['fas', 'arrow-down']} />{' '}
					{newsItemData.down_votes_counter}
				</button>
			</div> */}
			<div
				onClick={() => {
					if (!showComments) {
						setShowComments(true);
					}
				}}
				className={`${classes.comments_counter} ${classes['status-item']}`}
			>
				{newsItemData.comments_counter === 0 ? (
					<button title='No Comment'>
						<FontAwesomeIcon icon={['fas', 'comment-slash']} />{' '}
						{newsItemData.comments_counter}
					</button>
				) : newsItemData.comments_counter === 1 ? (
					<button title='1 Comment'>
						<FontAwesomeIcon icon={['fas', 'comment']} />{' '}
						{newsItemData.comments_counter}
					</button>
				) : (
					<button title={`${newsItemData.comments_counter} Comments`}>
						<FontAwesomeIcon icon={['fas', 'comments']} />{' '}
						{newsItemData.comments_counter}
					</button>
				)}{' '}
			</div>
		</section>
	);
};

export default Status;
