import { useContext, useEffect, useState } from 'react';

import {
	handleLoadingNewsItemComments,
	handlePostingCommentToNewsItem,
} from '@store/NewsContext/actions';
import NewsContext from '@store/NewsContext';
import { useUserSharedState } from '@store/UserContext';

import Comment from './Comment';
import CommentTextarea from './CommentTextarea';

const Comments = ({
	inheritedClasses,
	className,
	newsItem,
	setShowComments,
	setFocusCommentTextarea,
	showComments,
	focusCommentTextarea,
}) => {
	const [userState, userDispatch] = useUserSharedState();
	const { dispatch } = useContext(NewsContext);

	const [values, setValues] = useState({
		content: '',
	});

	const [disableSendCommentButton, setDisableSendCommentButton] =
		useState(false);

	const [loadingComments, setLoadingComments] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		setDisableSendCommentButton(true);

		await handlePostingCommentToNewsItem({
			dispatch,
			commentType: 'comment_main',
			commentContent: values.content,
			news_id: newsItem.news_id,
			user: userState.user,
			token: userState.token,
		});

		setValues({
			content: '',
		});

		setDisableSendCommentButton(false);
	};

	const LoadComments = async () => {
		if (
			parseInt(newsItem.comments_counter) === 0 ||
			newsItem.hit_comments_limit
		)
			return;

		setLoadingComments(true);

		await handleLoadingNewsItemComments({ dispatch, newsItem });

		setLoadingComments(false);
	};

	useEffect(() => LoadComments(), []);

	return (
		<section className={`${inheritedClasses}`}>
			{userState.userExist && (
				<CommentTextarea
					handleSubmit={handleSubmit}
					focusTextarea={focusCommentTextarea}
					setFocusCommentTextarea={setFocusCommentTextarea}
					name='content'
					setValues={setValues}
					value={values.content}
					disableSubmitBtn={disableSendCommentButton}
				/>
			)}
			<div>
				{newsItem.comments &&
					newsItem.comments.map((comment, index) => (
						<Comment
							key={comment.news_comment_id}
							comment={comment}
							newsItem={newsItem}
						/>
					))}
			</div>
			{loadingComments && <p>Loading...</p>}
			<div className='buttons-holder'>
				{!newsItem.hit_comments_limit && (
					<button
						title='Load More'
						disabled={loadingComments}
						onClick={async () => await LoadComments()}
					>
						<strong>Load More</strong>
					</button>
				)}
				<button title='Hide Comments' disabled={loadingComments}>
					<strong
						onClick={() => {
							if (showComments) setShowComments(false);
							if (focusCommentTextarea) setFocusCommentTextarea(false);
						}}
					>
						Hide Comments
					</strong>
				</button>
			</div>
		</section>
	);
};

export default Comments;
