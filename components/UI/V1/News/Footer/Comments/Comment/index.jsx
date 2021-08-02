import { Component, useContext, useEffect, useState } from 'react';

import classes from './index.module.css';

import UserContext from '@store/UserContext';
import { dateToHumanReadableDate } from '@lib/v1/time';

import DropdownMenu from '@components/UI/V1/DropdownMenu';
import CommentTextarea from '../CommentTextarea';

const Replies = ({ replies, setData, data, parent_data }) =>
	replies
		? replies.map((reply) => (
				<Comment
					key={reply.news_id}
					comment={reply}
					setData={setData}
					data={data}
					parent_data={parent_data}
				/>
		  ))
		: null;

const Comment = ({ comment, data, setData, ...props }) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [showContent, setShowContent] = useState(true);
	const [showReplyTextarea, setShowReplyTextarea] = useState(false);
	const [showReplies, setShowReplies] = useState(false);

	// useEffect(() => {
	// }, [])

	const [focusTextarea, setFocusCommentTextarea] = useState(false);
	const [editBtnsDisabled, setEditBtnsDisabled] = useState(false);

	const [deleteBtnsDisabled, setDeleteBtnsDisabled] = useState(false);
	const [commentReplyBtnsDisabled, setCommentReplyBtnsDisabled] =
		useState(false);
	const [focusCommentReplyTextarea, setFocusCommentReplyTextarea] =
		useState(false);

	const [repliesIndex, setRepliesIndex] = useState(
		comment.type === 'comment' && comment.replies_index
			? comment.replies_index
			: 0
	);
	const [hitRepliesLimit, setHitRepliesLimit] = useState(
		comment.type === 'comment' && comment.hit_replies_limit
			? comment.hit_replies_limit
			: false
	);

	const [values, setValues] = useState({
		content: comment.content,
		comment_reply: '',
	});
	const [items, setItems] = useState([]);

	const handleDeleteComment = async (type, news_id, parent_id) => {
		setDeleteBtnsDisabled(true);

		const body = JSON.stringify({
			type,
			news_id,
			parent_id,
		});

		const {
			status,
			message,
			data: comment,
		} = await fetch('/api/v1/news/comments/comment', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				authorization: `Bearer ${user.token}`,
			},
			body,
		})
			.then((respone) => respone.json())
			.catch((error) => {
				return { ...error, status: 'error' };
			});

		if (status === 'error') {
			console.error(message);
			setDeleteBtnsDisabled(false);
			return;
		}

		setData((prev) => ({
			...prev,
			comments_count: prev.comments_count - 1,
			comments: prev.comments.filter((comment) => comment.news_id !== news_id),
		}));
	};

	const handleUpdatingComment = async (event) => {
		event.preventDefault();
		setEditBtnsDisabled(true);

		const bodyObj = {
			content: values.content,
			type: comment.type,
			news_id: comment.news_id,
		};

		const { status, message, data } = await fetch(
			'/api/v1/news/comments/comment',
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify(bodyObj),
			}
		)
			.then((respone) => respone.json())
			.catch((error) => {
				return { ...error, status: 'error' };
			});

		if (status === 'error') {
			console.error(message);
			setEditBtnsDisabled(false);
			return;
		}

		if (comment.type === 'comment') {
			setData((prev) => ({
				...prev,
				comments: prev.comments.map((comment) => {
					if (comment.news_id === bodyObj.news_id) {
						return {
							...comment,
							content: bodyObj.content,
							updated_on: new Date().toUTCString(),
						};
					}
					return comment;
				}),
			}));
		}

		setShowContent(true);
		setEditBtnsDisabled(false);
	};

	const handleSubmitCommentReply = async (
		bodyObj,
		user,
		comment_parent,
		setData,
		setValues
	) => {
		setCommentReplyBtnsDisabled(true);

		const { status, message, data } = await fetch(
			'/api/v1/news/comments/comment',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify(bodyObj),
			}
		)
			.then((respone) => respone.json())
			.catch((error) => {
				return { ...error, status: 'error' };
			});

		if (status === 'error') {
			console.error(message);
			setCommentReplyBtnsDisabled(false);
			return;
		}

		const commentReplyObj = {
			...bodyObj,

			author_first_name: user.first_name,
			author_last_name: user.last_name,
			author_profile_picture: user.profile_picture,
			author_user_name_id: user.user_name_id,

			author_id: user.id,
			comments_count: 0,
			news_id: data.news_id,
			created_at: new Date().toUTCString(),
			updated_on: new Date().toUTCString(),
		};

		setData((prev) => ({
			...prev,
			comments: prev.comments.map((comment) => {
				if (comment.news_id === bodyObj.parent_id) {
					const replies = comment.replies
						? [...comment.replies, commentReplyObj]
						: [commentReplyObj];

					return {
						...comment,
						comments_count: comment.comments_count + 1,
						replies,
					};
				}

				return comment;
			}),
		}));

		setValues((prev) => ({
			...prev,
			comment_reply: '',
		}));

		setShowReplyTextarea(false);
	};

	const loadRepliesHandler = async (parent_id) => {
		if (
			comment.type !== 'comment' ||
			(comment.type === 'comment' && comment.hit_replies_limit) ||
			hitRepliesLimit
		)
			return;

		if (!showReplies && comment.replies && comment.replies.length !== 0) {
			setShowReplies(true);
		}

		const { status, message, data } = await fetch(
			`/api/v1/news/comments/comment/?type=comment_reply&parent_id=${parent_id}&offset_index=${repliesIndex}`
		).then((respone) => respone.json());

		if (status === 'error') {
			return console.error(message);
		}

		setData((prev) => ({
			...prev,
			comments: prev.comments.map((comment) => {
				if (comment.news_id === parent_id) {
					const replies = comment.replies
						? [...comment.replies, ...data.comments]
						: data.comments;

					return {
						...comment,
						replies,
						hit_replies_limit: data.hit_replies_limit,
						replies_index: comment.replies_index
							? comment.replies_index + 1
							: 1,
					};
				}

				return comment;
			}),
		}));

		setRepliesIndex((prev) => prev + 1);

		if (data.hit_replies_limit) setHitRepliesLimit(true);
		if (!showReplies) setShowReplies(true);
	};

	useEffect(() => {
		if (UserCxt.userExist) {
			setItems([
				{
					props: {
						handleDeleteComment,
						comment,
						data,
						deleteBtnsDisabled,
					},
					Element: ({
						handleDeleteComment,
						comment,
						data,
						deleteBtnsDisabled,
					}) => (
						<button
							disabled={deleteBtnsDisabled}
							onClick={() => {
								if (comment.type === 'comment') {
									handleDeleteComment(
										comment.type,
										comment.news_id,
										data.news_id
									);
								}

								if (comment.type === 'comment_reply') {
									handleDeleteComment(
										comment.type,
										comment.news_id,
										comment.parent_id
									);
								}
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
			comment.type === 'comment' &&
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
					<img
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
					<DropdownMenu items={items} />
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
					disbleSubmitBtn={editBtnsDisabled}
					closeBtn
					onClickingCloseBtn={() => setShowContent(true)}
				/>
			)}
			<footer className={classes.footer}>
				<button onClick={() => setShowReplyTextarea((prev) => !prev)}>
					Comment
				</button>
			</footer>
			{!hitRepliesLimit &&
				comment.type === 'comment' &&
				comment.comments_count !== 0 && (
					<button onClick={() => loadRepliesHandler(comment.news_id, setData)}>
						{comment.comments_count === 1 ? 'Comment' : 'Comments'}{' '}
						{comment.comments_count}
					</button>
				)}
			{showReplyTextarea && (
				<CommentTextarea
					handleSubmit={(event) => {
						event.preventDefault();

						let bodyObj = {
							type: 'comment_reply',
							content: values.comment_reply,
							// reply_to_comment_id: null, // comment.news_id,
							reply_to_user_id: comment.author_id,
						};

						if (comment.type === 'comment') {
							bodyObj.parent_id = comment.news_id;
						} else if (comment.type === 'comment_reply') {
							bodyObj.parent_id = props.parent_data.news_id;
							bodyObj.reply_to_comment_id = comment.news_id;
						}

						handleSubmitCommentReply(
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
					disbleSubmitBtn={commentReplyBtnsDisabled}
					closeBtn
					onClickingCloseBtn={() => setShowReplyTextarea(false)}
				/>
			)}
			{showReplies && (
				<Replies
					replies={comment.replies}
					setData={setData}
					data={data}
					parent_data={comment}
				/>
			)}
		</div>
	);
};

export default Comment;
