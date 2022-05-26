import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classes from './index.module.css';

interface IProps {
	comments_counter: number;
	isCommentsVisible: boolean;
	handleSetIsCommentsVisible: (isCommentsVisible?: boolean) => void;
}

const Status: FC<IProps> = ({
	isCommentsVisible,
	handleSetIsCommentsVisible,
	comments_counter,
}) => {
	/*
	const handleInitGetNewsItemCommentsMain = async () => {
		if (
			!initGetMainComments ||
			(!newsItemData.hit_comments_limit &&
				newsItemData.comments &&
				newsItemData.comments.length === 0 &&
				initGetMainComments &&
				!initGetMainComments.success &&
				!initGetMainComments.isLoading &&
				!hit_comments_limit)
		)
			await getMoreNewsItemCommentsMain(newsDispatch, {
				news_id: newsItemData.news_id,
				urlOptions: {
					params: {
						news_id: newsItemData.news_id,
					},
					queries: {
						comment_type: 'comment_main',
					},
				},
			});
	};
	*/

	return (
		<div className={classes.status}>
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
					if (!isCommentsVisible) handleSetIsCommentsVisible();
					// handleInitGetNewsItemCommentsMain();
				}}
				className={`${classes.comments_counter} ${classes['status-item']}`}
			>
				{comments_counter === 0 ? (
					<button title='No Comment'>
						<FontAwesomeIcon icon={['fas', 'comment-slash']} />{' '}
						{comments_counter}
					</button>
				) : comments_counter === 1 ? (
					<button title='1 Comment'>
						<FontAwesomeIcon icon={['fas', 'comment']} /> {comments_counter}
					</button>
				) : (
					<button title={`${comments_counter} Comments`}>
						<FontAwesomeIcon icon={['fas', 'comments']} /> {comments_counter}
					</button>
				)}{' '}
			</div>
		</div>
	);
};

export default Status;
