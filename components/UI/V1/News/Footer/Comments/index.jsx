import { useContext, useEffect, useState } from 'react';

import classes from './index.module.css';

import UserContext from '@store/UserContext';

import Comment from './Comment';
import CommentTextarea from './CommentTextarea';

const Comments = ({
	inheritedClasses,
	data,
	setData,
	comments,
	className,
	setShowComments,
	setFocusCommentTextarea,
	showComments,
	focusCommentTextarea,
}) => {
	const { user, ...UserCxt } = useContext(UserContext);

	const [values, setValues] = useState({
		content: '',
	});

	const [disbleSendCommentButton, setDisbleSendCommentButton] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setDisbleSendCommentButton(true);

		const body = JSON.stringify({
			type: 'comment_main',
			content: values.content,
			news_id: data.news_id,
		});

		const {
			status,
			message,
			data: comment,
		} = await fetch('/api/v1/news/comments/comment', {
			method: 'POST',
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
			return;
		}

		setData((prev) => ({
			...prev,
			comments_counter: prev.comments_counter + 1,
			comments: [
				...prev.comments,
				{
					author_id: user.id,

					author_first_name: user.first_name,
					author_last_name: user.last_name,
					author_profile_picture: user.profile_picture,
					author_user_name_id: user.user_name_id,

					replies_counter: 0,
					content: values.content,
					created_at: new Date().toUTCString(),
					news_comment_id: comment.news_comment_id,
					type: 'comment_main',
					updated_on: new Date().toUTCString(),
				},
			],
		}));

		setValues({
			content: '',
		});

		setDisbleSendCommentButton(false);
	};

	useEffect(async () => {
		if (data.comments && data.comments_counter !== 0) {
			if (data.comments && data.comments.length !== 0) return;

			const {
				status,
				message,
				data: result,
			} = await fetch(
				`/api/v1/news/comments/comment/?type=comment_main&news_id=${
					data.news_id
				}&offset_index=${0}`
			).then((respone) => respone.json());

			if (status === 'error') {
				return console.error(message);
			}

			setData((prev) => ({
				...prev,
				comments: result.comments.reverse(),
			}));
		}
	}, []);

	return (
		<section className={`${inheritedClasses}`}>
			<CommentTextarea
				handleSubmit={handleSubmit}
				focusTextarea={focusCommentTextarea}
				setFocusCommentTextarea={setFocusCommentTextarea}
				name='content'
				setValues={setValues}
				value={values.content}
				disbleSubmitBtn={disbleSendCommentButton}
			/>
			<div>
				{data.comments &&
					data.comments.map((comment, index) => (
						<Comment
							key={comment.news_comment_id}
							comment={comment}
							setData={setData}
							data={data}
						/>
					))}
			</div>
			<button
				onClick={() => {
					if (showComments) setShowComments(false);
					if (focusCommentTextarea) setFocusCommentTextarea(false);
				}}
			>
				<h3>Hide Comments</h3>
			</button>
		</section>
	);
};

export default Comments;
