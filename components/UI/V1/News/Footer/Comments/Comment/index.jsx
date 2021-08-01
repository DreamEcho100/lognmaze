import { Component, useContext, useEffect, useState } from 'react';

import classes from './index.module.css';

import UserContext from '@store/UserContext';
import { dateToHumanReadableDate } from '@lib/v1/time';

import DropdownMenu from '@components/UI/V1/DropdownMenu';
import CommentTextarea from '../CommentTextarea';

const Comment = ({ comment, data, setData }) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [showContent, setShowContent] = useState(true);
	const [focusTextarea, setFocusCommentTextarea] = useState(false);
	const [editBtnsDisabled, setEditBtnsDisabled] = useState(false);
	const [deleteBtnsDisabled, setDeleteBtnsDisabled] = useState(false);
	const [values, setValues] = useState({
		// type: comment.type,
		// comment_id: comment.news_id,
		content: comment.content,
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

	useEffect(() => {
		if(UserCxt.userExist){
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
		]);} else {
			if(items.length > 0) setItems([])
		}
	}, [UserCxt.userExist]);

	return (
		<div className={classes.comment}>
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
					closeBtn={true}
					onClickingCloseBtn={() => setShowContent(true)}
				/>
			)}
			<footer className={classes.footer}>
				{comment.created_at === comment.updated_on ? (
					<p>Created At: {dateToHumanReadableDate(comment.created_at)}</p>
				) : (
					<p>Updated On: {dateToHumanReadableDate(comment.updated_on)}</p>
				)}
				<p className={classes.comments_count}>
					Comments: {comment.comments_count}
				</p>
			</footer>
		</div>
	);
};

export default Comment;
