import { useContext, useEffect, useState } from 'react';

// import classes from './index.module.css';

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
	const { user /* , ...UserCxt*/ } = useContext(UserContext);

	const [values, setValues] = useState({
		content: '',
	});

	const [disableSendCommentButton, setDisableSendCommentButton] =
		useState(false);

	const [loadingComments, setLoadingComments] = useState(false);

	const [commentsIndex, setCommentsIndex] = useState(
		data.comments_index ? data.comments_index : 0
	);
	const [hitCommentsLimit, setHitCommentsLimit] = useState(
		data.hit_comments_limit || data.comments_counter === 0
			? true
			: // data.hit_comments_limit
			  false
	);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setDisableSendCommentButton(true);

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
			.then((response) => response.json())
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

		setDisableSendCommentButton(false);
	};

	const LoadComments = async () => {
		// if (!news.comments_index) {
		// 	news.comments_index = 0;
		// 	news.hit_comments_limit = news.comments_counter === 0 ? true : false;

		// 	if (!addToNews) addToNews = true;
		// }
		if (data.comments_counter === 0 || data.hit_comments_limit) return;

		setLoadingComments(true);

		const {
			status,
			message,
			data: result,
		} = await fetch(
			`/api/v1/news/comments/comment/?type=comment_main&news_id=${data.news_id}&offset_index=${commentsIndex}`
		).then((response) => response.json());

		if (status === 'error') {
			setLoadingComments(false);
			return console.error(message);
		}

		const toAdd = {};

		if (result?.comments.length > 0) {
			toAdd.comments = [...data.comments, ...result.comments /*.reverse()*/];
		}

		if (
			result.hit_comments_limit ||
			(toAdd.comments && toAdd.comments.length === data.comments_counter)
		) {
			toAdd.hit_comments_limit = true;
			setHitCommentsLimit(true);
		}

		toAdd.comments_index = toAdd.comments_index + 1;
		setCommentsIndex((prev) => prev + 1);

		setData((prev) => ({
			...prev,
			...toAdd,
		}));
		setLoadingComments(false);
	};

	useEffect(async () => {
		if (data?.comments.length === 0) await LoadComments();
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
				disableSubmitBtn={disableSendCommentButton}
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
			{loadingComments && <p>Loading...</p>}
			<div
			// className={classes['btn-holder']}
			>
				<button disabled={loadingComments}>
					<h3
						onClick={() => {
							if (showComments) setShowComments(false);
							if (focusCommentTextarea) setFocusCommentTextarea(false);
						}}
					>
						Hide Comments
					</h3>
				</button>
				{!hitCommentsLimit && (
					<button
						disabled={loadingComments}
						onClick={async () => await LoadComments()}
					>
						<h3>Load More</h3>
					</button>
				)}
			</div>
		</section>
	);
};

export default Comments;
