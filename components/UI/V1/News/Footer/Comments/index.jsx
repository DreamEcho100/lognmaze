import { useContext, useEffect, useState } from 'react';

import classes from './index.module.css';

import UserContext from '@store/UserContext';

import Form from '@components/UI/V1/Form';
import Textarea from '@components/UI/V1/Textarea';
import Button from '@components/UI/V1/Button';

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
		comment: '',
	});

	const [disbleSendCommentButton, setDisbleSendCommentButton] = useState(false);


	const handleSubmit = async (event) => {
		event.preventDefault();

		setDisbleSendCommentButton(true);

		const body = JSON.stringify({
			type: 'comment',
			content: values.comment,
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
			comments_count: prev.comments_count + 1,
			comments: [
				{
					author_id: user.id,
					comments_count: 0,
					content: values.comment,
					created_at: new Date().toUTCString(),
					news_id: comment.news_id,
					type: 'comment',
					updated_on: new Date().toUTCString(),
				},
				...prev.comments,
			],
		}));

		setValues({
			comment: '',
		});

		setDisbleSendCommentButton(false);
	};

	const handleDeleteComment = async (type, news_id) => {
		// setDisbleDeleteCommentButton(true);

		const body = JSON.stringify({
			type,
			news_id,
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
			// setDisbleDeleteCommentButton(false);
			return;
		}

		setData((prev) => ({
			...prev,
			comments_count: prev.comments_count - 1,
			comments: prev.comments.filter((comment) => comment.news_id !== news_id),
		}));
	};

	useEffect(async () => {
		if (data.comments && data.comments_count !== 0) {
			const {
				status,
				message,
				data: comments,
			} = await fetch(
				`/api/v1/news/comments/comment/?type=comment&news_id=${data.news_id}`
			).then((respone) => respone.json());

			if (status === 'error') {
				return console.error(message);
			}

			setData((prev) => ({
				...prev,
				comments,
			}));
		}
	}, []);

	return (
		<section className={`${inheritedClasses}`}>
			<div
				style={{
					width: '100%',
				}}
			>
				<Form onSubmit={handleSubmit}>
					<Textarea
						useElement={(elem) => {
							elem.focus();
						}}
						// useElementInEffect={(elem) => {
						// 	console.log(elem);
						// 	if (!elem) return;
						// 	elem.focus();
						// }}
						// useElementInEffectDependencyList={[]}
						name='comment'
						setValues={setValues}
						value={values.comment}
					/>
					<Button type='submit' disabled={disbleSendCommentButton}>
						Send
					</Button>
				</Form>
			</div>
			<div>
				{data.comments &&
					data.comments.map((comment, index) => {
						return (
							<div key={comment.news_id}>
								<p>{comment.content}</p>
								<small>{comment.created_at}</small>
								<small>{comment.updated_on}</small>
								<button
									onClick={() =>
										handleDeleteComment(comment.type, comment.news_id)
									}
								>
									Delete
								</button>
							</div>
						);
					})}
			</div>
			<h3
				onClick={() => {
					if (showComments) setShowComments(false);
					if (focusCommentTextarea) setFocusCommentTextarea(false);
				}}
			>
				Hide Comments
			</h3>
		</section>
	);
};

export default Comments;
