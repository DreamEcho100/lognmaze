import { useEffect, useState } from 'react';

import classes from './styles.module.css';

import {
	handleDeletingMainOrReplyCommentInNewsItem,
	handleLoadingCommentRepliesInNewsItem,
	handleReplyingToMainOrReplyCommentInNewsItem,
	handleUpdatingMainOrReplyCommentInNewsItem,
} from '@store/NewsContext/actions';
// import NewsContext from '@store/NewsContext';
import { useNewsSharedState } from '@store/NewsContext';
import { useUserSharedState } from '@store/UserContext';
import { dateToHumanReadableDate } from '@lib/v1/time';

import Md from '@components/UI/V1/Format/Md';
import FormatterContainer from '@components/UI/V1/Format/Container';

import DropdownMenu from '@components/UI/V1/DropdownMenu';
import CommentTextarea from '../CommentTextarea';
import CustomImage from '@components/UI/V1/Image';

const Replies = ({ replies, newsItemData, parent_data }) =>
	replies
		? replies.map((reply) => (
				<Comment
					key={reply.news_comment_id}
					comment={reply}
					newsItemData={newsItemData}
					parent_data={parent_data}
				/>
		  ))
		: null;

const Comment = ({ comment, newsItemData, ...props }) => {
	const [userState, userDispatch] = useUserSharedState();
	const [newsState, newsDispatch] = useNewsSharedState();

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
			newsDispatch,
			news_id: newsItemData.news_id,
			comment,
			token: userState.token,
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
			content: values.content,
			news_comment_id: comment.news_comment_id,
		};

		await handleUpdatingMainOrReplyCommentInNewsItem({
			newsDispatch,
			token: userState.token,
			bodyObj,
			comment,
			news_id: newsItemData.news_id,
			parent_data_id:
				comment.type === 'comment_main_reply'
					? props.parent_data.news_comment_id
					: undefined,
		});

		setShowContent(true);
		setEditBtnsDisabled(false);
	};

	const handleSubmitCommentReply = async (
		newsDispatch,
		bodyObj,
		user,
		commentData,
		setValues
	) => {
		setCommentReplyBtnsDisabled(true);

		await handleReplyingToMainOrReplyCommentInNewsItem({
			newsDispatch,
			newsItem: newsItemData,
			user: userState.user,
			token: userState.token,
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
			newsDispatch,
			comment,
			parent_id,
			news_id,
		});

		if (!showReplies) setShowReplies(true);

		setLoadingReplies(false);
	};

	useEffect(() => {
		if (userState.userExist) {
			setItems([
				{
					props: {
						handleDeleteComment,
						comment,
						newsItemData,
						deleteBtnsDisabled,
					},
					Element: function Element({
						handleDeleteComment,
						comment,
						newsItemData,
						deleteBtnsDisabled,
					}) {
						return (
							<button
								title='Delete Comment'
								disabled={deleteBtnsDisabled}
								onClick={() => {
									let bodyObj = {};
									if (comment.type === 'comment_main') {
										bodyObj = {
											type: comment.type,
											news_comment_id: comment.news_comment_id,
											parent_id: newsItemData.news_id,
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
						);
					},
				},
				{
					props: {
						setShowContent,
						setFocusCommentTextarea,
					},
					Element: function Element({
						setShowContent,
						setFocusCommentTextarea,
					}) {
						return (
							<button
								title='Edit Comment'
								onClick={() => {
									setShowContent(false);
									setFocusCommentTextarea(true);
								}}
							>
								Edit
							</button>
						);
					},
				},
			]);
		} else {
			if (items.length > 0) setItems([]);
		}
	}, [userState.userExist]);

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
					<CustomImage
						src={`//images.weserv.nl/?url=${comment.author_profile_picture}&w=150&h=150`}
						alt=''
						className={classes['profile_picture-container']}
						effect='blur'
					/>
					<div className={classes['author-info']}>
						<p>
							<strong>{comment.author_user_name_id}</strong>
						</p>
						<p>
							<em>
								<small>
									{comment.author_first_name} {comment.author_last_name}
								</small>
							</em>
						</p>
					</div>
				</nav>
				{userState.user.id === comment.author_id && (
					<DropdownMenu items={items} />
				)}
			</header>
			{showContent && (
				<FormatterContainer className={classes.comment_content}>
					<Md content={comment.content} />
				</FormatterContainer>
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
				<span dateTime={comment.created_at}>
					<time dateTime={comment.created_at}>
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
					</time>
					{comment.created_at !== comment.updated_at && (
						<time dateTime={comment.updated_at}>
							<small>
								, <strong>Updated On:</strong>{' '}
								<em>
									{
										dateToHumanReadableDate(comment.updated_at, {
											withTime: true,
										}).dateAndTimeString
									}
								</em>
							</small>
						</time>
					)}
				</span>
				{userState.userExist && (
					<button
						title='Reply To A Comment'
						onClick={() => setShowReplyTextarea((prev) => !prev)}
					>
						Reply
					</button>
				)}
			</footer>
			{comment.type === 'comment_main' &&
				parseInt(comment.replies_counter) !== 0 &&
				!showReplies && (
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
								loadRepliesHandler(
									comment.news_comment_id,
									newsItemData.news_id
								);
							}
						}}
					>
						<p>
							{parseInt(comment.replies_counter) === 1 ? 'Reply' : 'Replies'}{' '}
							{parseInt(comment.replies_counter)}
						</p>
					</button>
				)}
			{userState.userExist && showReplyTextarea && (
				<CommentTextarea
					handleSubmit={(event) => {
						event.preventDefault();

						let bodyObj = {
							type: 'comment_main_reply',
							news_id: newsItemData.news_id,
							content: values.comment_reply,
							reply_to_user_id: comment.author_id,
						};

						if (comment.type === 'comment_main') {
							bodyObj.parent_id = comment.news_comment_id;
						} else if (comment.type === 'comment_main_reply') {
							bodyObj.parent_id = props.parent_data.news_comment_id;
							bodyObj.reply_to_comment_id = comment.news_comment_id;
						}

						handleSubmitCommentReply(
							newsDispatch, // newsDispatch,
							bodyObj,
							userState.user,
							comment,
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
					newsItemData={newsItemData}
					parent_data={comment}
				/>
			)}

			{loadingReplies && <p>Loading...</p>}

			<div className='buttons-holder'>
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
									loadRepliesHandler(
										comment.news_comment_id,
										newsItemData.news_id
									);
								}
							}}
						>
							<strong>Load More</strong>
						</button>
					)}

				{showReplies && (
					<button
						title='Hide Replies'
						disabled={loadingReplies}
						onClick={() => setShowReplies(false)}
					>
						<strong>Hide Replies</strong>
					</button>
				)}
			</div>
		</div>
	);
};

export default Comment;
