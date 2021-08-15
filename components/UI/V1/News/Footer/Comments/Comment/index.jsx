import { useContext, useEffect, useState } from 'react';

import classes from './index.module.css';

import UserContext from '@store/UserContext';
import { dateToHumanReadableDate } from '@lib/v1/time';

import DropdownMenu from '@components/UI/V1/DropdownMenu';
import CommentTextarea from '../CommentTextarea';

const Replies = ({ replies, setData, data, parent_data }) =>
	replies
		? replies.map((reply) => (
				<Comment
					key={reply.news_comment_id}
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
		comment.type === 'comment_main' && comment.replies_index
			? comment.replies_index
			: 0
	);
	const [hitRepliesLimit, setHitRepliesLimit] = useState(
		comment.type === 'comment_main' && comment.hit_replies_limit
			? comment.hit_replies_limit
			: false
	);

	const [values, setValues] = useState({
		content: comment.content,
		comment_reply: '',
	});
	const [items, setItems] = useState([]);

	const handleDeleteComment = async (bodyObj) => {
		setDeleteBtnsDisabled(true);

		const body = JSON.stringify(bodyObj);

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
			.then((response) => response.json())
			.catch((error) => {
				return { ...error, status: 'error' };
			});

		if (status === 'error') {
			console.error(message);
			setDeleteBtnsDisabled(false);
			return;
		}

		if (bodyObj.type === 'comment_main') {
			setData((prev) => ({
				...prev,
				comments_counter: prev.comments_counter - 1,
				comments: prev.comments.filter(
					(comment) => comment.news_comment_id !== bodyObj.news_comment_id
				),
			}));
		} else if (bodyObj.type === 'comment_main_reply') {
			setData((prev) => ({
				...prev,
				comments: prev.comments.map((comment) => {
					if (comment.news_comment_id === bodyObj.parent_id) {
						let replies = comment.replies.filter(
							(reply) => reply.news_comment_id !== bodyObj.news_comment_id
						);

						// if (bodyObj.reply_to_comment_id) {
						// 	replies = replies.map((reply) => {
						// 		if (reply.news_comment_id === bodyObj.reply_to_comment_id) {
						// 			return {
						// 				...reply,
						// 				comments_counter: reply.comments_counter - 1,
						// 			};
						// 		}
						// 		return reply;
						// 	});
						// }

						return {
							...comment,
							replies_counter: comment.replies_counter - 1,
							replies_index:
								comment.replies_index && comment.replies_index - 0.1 > 0
									? comment.replies_index - 0.1
									: 0,
							replies,
						};
					}
					return comment;
				}),
			}));
		}

		if (repliesIndex) setRepliesIndex((prev) => prev - 0.1);
	};

	const handleUpdatingComment = async (event) => {
		event.preventDefault();
		setEditBtnsDisabled(true);

		const bodyObj = {
			// type: comment.type,
			content: values.content,
			news_comment_id: comment.news_comment_id,
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
			.then((response) => response.json())
			.catch((error) => {
				return { ...error, status: 'error' };
			});

		if (status === 'error') {
			console.error(message);
			setEditBtnsDisabled(false);
			return;
		}

		if (comment.type === 'comment_main') {
			setData((prev) => ({
				...prev,
				comments: prev.comments.map((comment) => {
					if (comment.news_comment_id === bodyObj.news_comment_id) {
						return {
							...comment,
							content: bodyObj.content,
							updated_on: new Date().toUTCString(),
						};
					}
					return comment;
				}),
			}));
		} else if (comment.type === 'comment_main_reply') {
			setData((prev) => ({
				...prev,
				comments: prev.comments.map((comment) => {
					if (comment.news_comment_id === props.parent_data.news_comment_id) {
						return {
							...comment,
							replies: comment.replies.map((reply) => {
								if (reply.news_comment_id === bodyObj.news_comment_id) {
									return {
										...reply,
										content: bodyObj.content,
										updated_on: new Date().toUTCString(),
									};
								}
								return reply;
							}),
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
		commentData,
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
			.then((response) => response.json())
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
			news_comment_id: data.news_comment_id,
			created_at: new Date().toUTCString(),
			updated_on: new Date().toUTCString(),
		};

		setData((prev) => ({
			...prev,
			comments: prev.comments.map((comment) => {
				if (comment.news_comment_id === bodyObj.parent_id) {
					// const replies = comment.replies
					// 	? [...comment.replies, commentReplyObj]
					// 	: [commentReplyObj];

					let replies = comment.replies || [];

					// if (bodyObj.reply_to_comment_id) {
					// 	replies = replies.map((reply) => {
					// 		if (reply.news_id === bodyObj.reply_to_comment_id) {
					// 			return {
					// 				...reply,
					// 				comments_counter: reply.comments_counter + 1,
					// 			};
					// 		}
					// 		return reply;
					// 	});
					// }

					replies.push(commentReplyObj);

					return {
						...comment,
						replies_counter: comment.replies_counter + 1,
						replies_index: comment.replies_index
							? comment.replies_index + 0.1
							: 0.1,
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

		setRepliesIndex((prev) => prev + 0.1);

		setShowReplyTextarea(false);
		setCommentReplyBtnsDisabled(false);
	};

	const loadRepliesHandler = async (parent_id) => {
		const { status, message, data } = await fetch(
			`/api/v1/news/comments/comment/?type=comment_main_reply&parent_id=${parent_id}&offset_index=${repliesIndex}`
		).then((response) => response.json());

		if (status === 'error') {
			return console.error(message);
		}

		setData((prev) => ({
			...prev,
			comments: prev.comments.map((comment) => {
				if (comment.news_comment_id === parent_id) {
					const replies = comment.replies
						? [...comment.replies, ...data.comments /*.reverse()*/]
						: data.comments; /*.reverse()*/

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

		if (data.hit_replies_limit && !hitRepliesLimit) setHitRepliesLimit(true);
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
								let bodyObj = {};
								if (comment.type === 'comment_main') {
									bodyObj = {
										type: comment.type,
										news_comment_id: comment.news_comment_id,
										parent_id: data.news_id,
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
					disableSubmitBtn={editBtnsDisabled}
					closeBtn
					onClickingCloseBtn={() => setShowContent(true)}
				/>
			)}
			<footer className={classes.footer}>
				<button onClick={() => setShowReplyTextarea((prev) => !prev)}>
					Comment
				</button>
			</footer>
			{comment.type === 'comment_main' &&
				comment.replies_counter !== 0 &&
				!showReplies && (
					// !hitRepliesLimit &&
					<button
						onClick={() => {
							if (comment.replies && comment.replies.length !== 0)
								setShowReplies(true);
							if (
								(comment.replies &&
									comment.replies.length !== comment.replies_counter) ||
								!comment.hitRepliesLimit
							) {
								loadRepliesHandler(comment.news_comment_id, setData);
							} else {
								if (hitRepliesLimit) setHitRepliesLimit(true);
							}
						}}
					>
						{comment.replies_counter === 1 ? 'Comment' : 'Comments'}{' '}
						{comment.replies_counter}
					</button>
				)}
			{showReplyTextarea && (
				<CommentTextarea
					handleSubmit={(event) => {
						event.preventDefault();

						let bodyObj = {
							type: 'comment_main_reply',
							news_id: data.news_id,
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
					data={data}
					parent_data={comment}
				/>
			)}

			{showReplies &&
				comment.type === 'comment_main' &&
				!hitRepliesLimit &&
				comment.replies_counter !== 0 && (
					<button
						onClick={() => {
							if (comment.replies && comment.replies.length !== 0)
								setShowReplies(true);
							if (
								(comment.replies &&
									comment.replies.length !== comment.replies_counter) ||
								!comment.hitRepliesLimit
							) {
								loadRepliesHandler(comment.news_comment_id, setData);
							} else {
								if (hitRepliesLimit) setHitRepliesLimit(true);
							}
						}}
					>
						Load More
					</button>
				)}

			{showReplies && (
				<button onClick={() => setShowReplies(false)}>Hide Replies</button>
			)}
		</div>
	);
};

export default Comment;
