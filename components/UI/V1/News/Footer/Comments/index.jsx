import { useContext, useEffect, useState } from 'react';

// import classes from './index.module.css';

import UserContext from '@store/UserContext';
import NewsContext from '@store/NewsContext';

import Comment from './Comment';
import CommentTextarea from './CommentTextarea';

const Comments = ({
	inheritedClasses,
	// data,
	// setData,
	comments,
	className,
	setShowComments,
	setFocusCommentTextarea,
	showComments,
	focusCommentTextarea,
}) => {
	const { user /* , ...UserCxt*/ } = useContext(UserContext);
	const { news, setNews } = useContext(NewsContext);

	const [values, setValues] = useState({
		content: '',
	});

	const [disableSendCommentButton, setDisableSendCommentButton] =
		useState(false);

	const [loadingComments, setLoadingComments] = useState(false);
	const [hitCommentsLimit, setHitCommentsLimit] = useState(
		news.hit_comments_limit || news.comments_counter === 0 ? true : false
	);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setDisableSendCommentButton(true);

		const body = JSON.stringify({
			type: 'comment_main',
			content: values.content,
			news_id: news.news_id,
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
				return { status: 'error', message: error.message, data: {} };
			});

		if (status === 'error') {
			setDisableSendCommentButton(false);
			console.error(message);
			return;
		}

		setNews((prev) => ({
			...prev,
			comments: [
				{
					author_id: user.id,

					author_first_name: user.first_name,
					author_last_name: user.last_name,
					author_profile_picture: user.profile_picture,
					author_user_name_id: user.user_name_id,

					replies_counter: 0,
					content: values.content,
					news_comment_id: comment.news_comment_id,
					type: 'comment_main',
					created_at: new Date().toUTCString(),
					updated_on: new Date().toUTCString(),
				},
				...prev.comments,
			],
			comments_counter: prev.comments_counter + 1,
			comments_to_not_fetch: prev.comments_to_not_fetch
				? [...prev.comments_to_not_fetch, comment.news_comment_id]
				: [comment.news_comment_id],
		}));

		// setCommentsToNotFetch((prev) => [...prev, comment.news_comment_id]);

		setValues({
			content: '',
		});

		setDisableSendCommentButton(false);
	};

	const LoadComments = async () => {
		if (news.comments_counter === 0 || news.hit_comments_limit) return;

		setLoadingComments(true);

		let fetchInput = `/api/v1/news/comments/comment/?type=comment_main&news_id=${news.news_id}`;

		if (news.last_comment_created_at) {
			fetchInput += `&last_comment_created_at=${news.last_comment_created_at}`;
		}

		if (news.comments_to_not_fetch && news.comments_to_not_fetch.length > 0) {
			fetchInput += `&comments_to_not_fetch=${news.comments_to_not_fetch.join(
				','
			)}`;
		}

		const {
			status,
			message,
			data: result,
		} = await fetch(fetchInput).then((response) => response.json());

		if (status === 'error') {
			setLoadingComments(false);
			return console.error(message);
		}

		const toAdd = {};

		if (result?.comments.length > 0) {
			toAdd.last_comment_created_at =
				result.comments[result.comments.length - 1].created_at;
			toAdd.comments = [...news.comments, ...result.comments];
		}

		if (
			result.hit_comments_limit ||
			(toAdd.comments && toAdd.comments.length === news.comments_counter)
		) {
			toAdd.hit_comments_limit = true;
			setHitCommentsLimit(true);
		}

		setNews((prev) => ({
			...prev,
			...toAdd,
		}));
		setLoadingComments(false);
	};

	useEffect(async () => {
		if (news?.comments.length === 0) await LoadComments();
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
				{news.comments &&
					news.comments.map((comment, index) => (
						<Comment
							key={comment.news_comment_id}
							comment={comment}
							setData={setNews}
							data={news}
						/>
					))}
			</div>
			{loadingComments && <p>Loading...</p>}
			<div>
				{!hitCommentsLimit && (
					<button
						title='Load More'
						disabled={loadingComments}
						onClick={async () => await LoadComments()}
					>
						<h3>Load More</h3>
					</button>
				)}
				<button title='Hide Comments' disabled={loadingComments}>
					<h3
						onClick={() => {
							if (showComments) setShowComments(false);
							if (focusCommentTextarea) setFocusCommentTextarea(false);
						}}
					>
						Hide Comments
					</h3>
				</button>
			</div>
		</section>
	);
};

export default Comments;
