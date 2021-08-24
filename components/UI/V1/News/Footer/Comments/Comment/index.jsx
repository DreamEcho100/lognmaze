import { useContext, useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';

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

// const DynamicDropdownMenu = dynamic(() =>
// 	import('@components/UI/V1/DropdownMenu')
// );

import DropdownMenu from '@components/UI/V1/DropdownMenu';
import CommentTextarea from '../CommentTextarea';
import Image from '@components/UI/V1/Image';

const Replies = ({ replies, setData, newsItem, parent_data }) =>
	replies
		? replies.map((reply) => (
				<Comment
					key={reply.news_comment_id}
					comment={reply}
					setData={setData}
					newsItem={newsItem}
					parent_data={parent_data}
				/>
		  ))
		: null;

const Comment = ({ comment, newsItem, setData, ...props }) => {
	const { dispatch } = useContext(NewsContext);

	const { user, userExist, ...UserCxt } = useContext(UserContext);

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
			user,
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
			// type: comment.type,
			content: values.content,
			news_comment_id: comment.news_comment_id,
		};

		await handleUpdatingMainOrReplyCommentInNewsItem({
			dispatch,
			user,
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
		setData,
		setValues
	) => {
		setCommentReplyBtnsDisabled(true);

		await handleReplyingToMainOrReplyCommentInNewsItem({
			dispatch,
			newsItem,
			user,
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
		if (UserCxt.userExist) {
			setItems([
				{
					props: {
						handleDeleteComment,
						comment,
						newsItem,
						deleteBtnsDisabled,
					},
					Element: ({
						handleDeleteComment,
						comment,
						newsItem,
						deleteBtnsDisabled,
					}) => (
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
					),
				},
				{
					props: {
						setShowContent,
						setFocusCommentTextarea,
					},
					Element: ({ setShowContent, setFocusCommentTextarea }) => (
						<button
							title='Edit Comment'
							onClick={() => {
								setShowContent(false);
								setFocusCommentTextarea(true);
							}}
						>
							Edit
						</button>
					),
				},
			]);
		} else {
			if (items.length > 0) setItems([]);
		}
	}, [UserCxt.userExist]);

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
				{user.id === comment.author_id && showContent && (
					<DropdownMenu
						// DynamicDropdownMenu
						items={items}
					/>
				)}
			</header>
			{showContent && (
				<main className={classes.main}>
					<p>{comment.content}</p>
				</main>
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
				<p>
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
				</p>
				{userExist && (
					<button
						title='Reply To A Comment'
						title='Comment'
						onClick={() => setShowReplyTextarea((prev) => !prev)}
					>
						Reply
					</button>
				)}
			</footer>
			{comment.type === 'comment_main' &&
				parseInt(comment.replies_counter) !== 0 &&
				!showReplies && (
					// !comment.hit_replies_limit &&
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
			{userExist && showReplyTextarea && (
				<CommentTextarea
					handleSubmit={(event) => {
						event.preventDefault();

						let bodyObj = {
							type: 'comment_main_reply',
							news_id: newsItem.news_id,
							content: values.comment_reply,
							// reply_to_comment_id: null, // comment.news_id,
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
							user,
							comment,
							setData,
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
					setData={setData}
					newsItem={newsItem}
					parent_data={comment}
				/>
			)}

			{loadingReplies && <p>Loading...</p>}

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
	);
};

export default Comment;
