import { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

import classes from './index.module.css';

import {
	handleDeletingMainOrReplyCommentInNewsItem,
	handleLoadingCommentRepliesInNewsItem,
	handleReplyingToMainOrReplyCommentInNewsItem,
	handleUpdatingMainOrReplyCommentInNewsItem,
} from '@store/NewsContext/actions';
import NewsContext from '@store/NewsContext';
import UserContext from '@store/UserContext';
import { dateToHumanReadableDate } from '@lib/v1/time';

const DynamicMd = dynamic(() => import('@components/UI/V1/Format/Md'));
const DynamicContainer = dynamic(() =>
	import('@components/UI/V1/Format/Container')
);

import DropdownMenu from '@components/UI/V1/DropdownMenu';
import CommentTextarea from '../CommentTextarea';
import Image from '@components/UI/V1/Image';

const Replies = ({ replies, newsItem, parent_data }) =>
	replies
		? replies.map((reply) => (
				<Comment
					key={reply.news_comment_id}
					comment={reply}
					newsItem={newsItem}
					parent_data={parent_data}
				/>
		  ))
		: null;

const Comment = ({ comment, newsItem, ...props }) => {
	const { dispatch } = useContext(NewsContext);
	const { state: userState } = useContext(UserContext);

	const [showContent, setShowContent] = useState(true);
	const [showReplyTextarea, setShowReplyTextarea] = useState(false);
	const [showReplies, setShowReplies] = useState(false);

	const [focusTextarea, setFocusCommentTextarea] = useState(false);
	const [editBtnsDisabled, setEditBtnsDisabled] = useState(false);

	const [deleteBtnsDisabled, setDeleteBtnsDisabled] = useState(false);
	const [commentReplyBtnsDisabled, setCommentReplyBtnsDisabled] =
		useState(false);
	const [focusCommentReplyTextarea, setFocusCommentReplyTextarea] =
		useState(false);

	const [loadingReplies, setLoadingReplies] = useState(false);

	const [values, setValues] = useState({
		content: comment.content,
		comment_reply: '',
	});
	const [items, setItems] = useState([]);

	const handleDeleteComment = async (bodyObj) => {
		setDeleteBtnsDisabled(true);

		await handleDeletingMainOrReplyCommentInNewsItem({
			dispatch,
			news_id: newsItem.news_id,
			comment,
			token: userState.token,
			bodyObj,
			parent_data_id:
				comment.type === 'comment_main_reply'
					? props.parent_data.news_comment_id
					: undefined,
		});
	};

	const handleUpdatingComment = async (event) => {
		event.preventDefault();
		setEditBtnsDisabled(true);

		const bodyObj = {
			content: values.content,
			news_comment_id: comment.news_comment_id,
		};

		await handleUpdatingMainOrReplyCommentInNewsItem({
			dispatch,
			token: userState.token,
			bodyObj,
			comment,
			news_id: newsItem.news_id,
			parent_data_id:
				comment.type === 'comment_main_reply'
					? props.parent_data.news_comment_id
					: undefined,
		});

		setShowContent(true);
		setEditBtnsDisabled(false);
	};

	const handleSubmitCommentReply = async (
		dispatch,
		bodyObj,
		user,
		commentData,
		setValues
	) => {
		setCommentReplyBtnsDisabled(true);

		await handleReplyingToMainOrReplyCommentInNewsItem({
			dispatch,
			newsItem,
			user: userState.user,
			token: userState.token,
			bodyObj,
		});

		setValues((prev) => ({
			...prev,
			comment_reply: '',
		}));

		setShowReplyTextarea(false);
		setCommentReplyBtnsDisabled(false);
	};

	const loadRepliesHandler = async (parent_id, news_id) => {
		if (
			comment.hit_replies_limit ||
			(comment.replies && comment.replies.length === comment.replies_counter)
		)
			return;
		setLoadingReplies(true);

		await handleLoadingCommentRepliesInNewsItem({
			dispatch,
			comment,
			parent_id,
			news_id,
		});

		if (!showReplies) setShowReplies(true);

		setLoadingReplies(false);
	};

	useEffect(() => {
		if (userState.userExist) {
			setItems([
				{
					props: {
						handleDeleteComment,
						comment,
						newsItem,
						deleteBtnsDisabled,
					},
					Element: function Element({
						handleDeleteComment,
						comment,
						newsItem,
						deleteBtnsDisabled,
					}) {
						return (
							<button
								title='Delete Comment'
								disabled={deleteBtnsDisabled}
								onClick={() => {
									let bodyObj = {};
									if (comment.type === 'comment_main') {
										bodyObj = {
											type: comment.type,
											news_comment_id: comment.news_comment_id,
											parent_id: newsItem.news_id,
										};
									} else if (comment.type === 'comment_main_reply') {
										bodyObj = {
											type: comment.type,
											news_comment_id: comment.news_comment_id,
											parent_id: props.parent_data.news_comment_id,
										};

										if (comment.reply_to_comment_id)
											bodyObj.reply_to_comment_id = comment.reply_to_comment_id;
									}

									handleDeleteComment(bodyObj);
								}}
							>
								Delete
							</button>
						);
					},
				},
				{
					props: {
						setShowContent,
						setFocusCommentTextarea,
					},
					Element: function Element({
						setShowContent,
						setFocusCommentTextarea,
					}) {
						return (
							<button
								title='Edit Comment'
								onClick={() => {
									setShowContent(false);
									setFocusCommentTextarea(true);
								}}
							>
								Edit
							</button>
						);
					},
				},
			]);
		} else {
			if (items.length > 0) setItems([]);
		}
	}, [userState.userExist]);

	useEffect(() => {
		if (
			comment.type === 'comment_main' &&
			!showReplies &&
			comment.replies &&
			comment.replies.length !== 0
		) {
			setShowReplies(true);
		}
	}, []);

	return (
		<div className={`${classes.comment} ${classes[`type-${comment.type}`]}`}>
			<header className={classes.header}>
				<nav className={classes.nav}>
					<Image
						className={classes.profile_picture}
						src={comment.author_profile_picture}
						alt=''
					/>
					<div className={classes['author-info']}>
						<p className={classes.author_name}>
							{comment.author_first_name} {comment.author_last_name}
						</p>
						<p className={classes.user_name_id}>
							{comment.author_user_name_id}
						</p>
					</div>
				</nav>
				{userState.user.id === comment.author_id && (
					<DropdownMenu items={items} />
				)}
			</header>
			{showContent && (
				<DynamicContainer className={classes.comment_content}>
					<DynamicMd content={comment.content} />
				</DynamicContainer>
			)}
			{!showContent && (
				<CommentTextarea
					type='update'
					handleSubmit={handleUpdatingComment}
					focusTextarea={focusTextarea}
					setFocusCommentTextarea={setFocusCommentTextarea}
					name='content'
					comment={comment}
					setValues={setValues}
					value={values.content}
					disableSubmitBtn={editBtnsDisabled}
					closeBtn
					onClickingCloseBtn={() => setShowContent(true)}
				/>
			)}
			<footer className={classes.footer}>
				<time>
					<span>
						<small>
							<strong>Created At:</strong>{' '}
							<em>
								{
									dateToHumanReadableDate(comment.created_at, {
										withTime: true,
									}).dateAndTimeString
								}
							</em>
						</small>
					</span>
					{comment.created_at !== comment.updated_on && (
						<span>
							<small>
								, <strong>Updated On:</strong>{' '}
								<em>
									{
										dateToHumanReadableDate(comment.updated_on, {
											withTime: true,
										}).dateAndTimeString
									}
								</em>
							</small>
						</span>
					)}
				</time>
				{userState.userExist && (
					<button
						title='Reply To A Comment'
						onClick={() => setShowReplyTextarea((prev) => !prev)}
					>
						Reply
					</button>
				)}
			</footer>
			{comment.type === 'comment_main' &&
				parseInt(comment.replies_counter) !== 0 &&
				!showReplies && (
					<button
						title={`${
							parseInt(comment.replies_counter) === 1 ? 'Reply' : 'Replies'
						} ${parseInt(comment.replies_counter)}`}
						disabled={loadingReplies}
						onClick={() => {
							if (
								comment.replies &&
								comment.replies.length !== 0 &&
								!showReplies
							)
								setShowReplies(true);
							if (
								(comment.replies &&
									comment.replies.length !==
										parseInt(comment.replies_counter)) ||
								!comment.hit_replies_limit
							) {
								loadRepliesHandler(comment.news_comment_id, newsItem.news_id);
							}
						}}
					>
						<p>
							{parseInt(comment.replies_counter) === 1 ? 'Reply' : 'Replies'}{' '}
							{parseInt(comment.replies_counter)}
						</p>
					</button>
				)}
			{userState.userExist && showReplyTextarea && (
				<CommentTextarea
					handleSubmit={(event) => {
						event.preventDefault();

						let bodyObj = {
							type: 'comment_main_reply',
							news_id: newsItem.news_id,
							content: values.comment_reply,
							reply_to_user_id: comment.author_id,
						};

						if (comment.type === 'comment_main') {
							bodyObj.parent_id = comment.news_comment_id;
						} else if (comment.type === 'comment_main_reply') {
							bodyObj.parent_id = props.parent_data.news_comment_id;
							bodyObj.reply_to_comment_id = comment.news_comment_id;
						}

						handleSubmitCommentReply(
							dispatch,
							bodyObj,
							userState.user,
							comment,
							setValues
						);
					}}
					focusTextarea={focusCommentReplyTextarea}
					setFocusCommentTextarea={setFocusCommentReplyTextarea}
					name='comment_reply'
					setValues={setValues}
					value={values.comment_reply}
					disableSubmitBtn={commentReplyBtnsDisabled}
					closeBtn
					onClickingCloseBtn={() => setShowReplyTextarea(false)}
				/>
			)}
			{showReplies && (
				<Replies
					replies={comment.replies}
					newsItem={newsItem}
					parent_data={comment}
				/>
			)}

			{loadingReplies && <p>Loading...</p>}

			<div className='buttons-holder-padding-half-em'>
				{showReplies &&
					comment.type === 'comment_main' &&
					!comment.hit_replies_limit &&
					parseInt(comment.replies_counter) !== 0 &&
					parseInt(comment.replies_counter) !== comment?.replies?.length && (
						<button
							title='Load More'
							disabled={loadingReplies}
							onClick={() => {
								if (
									comment.replies &&
									comment.replies.length !== 0 &&
									!showReplies
								)
									setShowReplies(true);
								if (
									(comment.replies &&
										comment.replies.length !== comment.replies_counter) ||
									!comment.hit_replies_limit
								) {
									loadRepliesHandler(comment.news_comment_id, newsItem.news_id);
								}
							}}
						>
							Load More
						</button>
					)}

				{showReplies && (
					<button
						title='Hide Replies'
						disabled={loadingReplies}
						onClick={() => setShowReplies(false)}
					>
						Hide Replies
					</button>
				)}
			</div>
		</div>
	);
};

export default Comment;
