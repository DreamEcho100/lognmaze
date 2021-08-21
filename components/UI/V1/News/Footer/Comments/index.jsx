import { useContext, useEffect, useState } from 'react';

// import classes from './index.module.css';

import { handleLoadingNewsItemComments } from '@store/NewsContextTest/actions';
import NewsContextTest from '@store/NewsContextTest';
import UserContext from '@store/UserContext';
// import NewsContext from '@store/NewsContext';

import Comment from './Comment';
import CommentTextarea from './CommentTextarea';

const Comments = ({
	inheritedClasses,
	// data,
	// setData,
	comments,
	setNews = () => {},
	className,
	newsItem,
	setShowComments,
	setFocusCommentTextarea,
	showComments,
	focusCommentTextarea,
}) => {
	const { /* state, */ dispatch /* , types */ } = useContext(NewsContextTest);
	const { user /* , ...UserCxt*/ } = useContext(UserContext);
	// const { news, setNews } = useContext(NewsContext);

	const [values, setValues] = useState({
		content: '',
	});

	const [disableSendCommentButton, setDisableSendCommentButton] =
		useState(false);

	const [loadingComments, setLoadingComments] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setDisableSendCommentButton(true);

		const body = JSON.stringify({
			type: 'comment_main',
			content: values.content,
			news_id: newsItem.news_id,
		});

		const {
			status,
			message,
			data: comment,
		} = await fetch('/api/v1/newsItem/comments/comment', {
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
		console.log('setLoadingComments', setLoadingComments);
		if (newsItem.comments_counter === 0 || newsItem.hit_comments_limit) return;

		setLoadingComments(true);

		await handleLoadingNewsItemComments({ dispatch, newsItem });

		setLoadingComments(false);
	};

	useEffect(() => LoadComments(), []);

	console.log('loadingComments', loadingComments);

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
				{newsItem.comments &&
					newsItem.comments.map((comment, index) => (
						<Comment
							key={comment.news_comment_id}
							comment={comment}
							setData={setNews}
							newsItem={newsItem}
						/>
					))}
			</div>
			{loadingComments && <p>Loading...</p>}
			<div>
				{!newsItem.hit_comments_limit && (
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
