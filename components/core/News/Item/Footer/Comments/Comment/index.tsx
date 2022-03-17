import { FC, FormEvent, useEffect, useState } from 'react';

import classes from './index.module.css';

import {
	TNewsItemData,
	TNewsItemCommentTypeMain,
	TNewsItemCommentTypeReplyMain,
} from '@coreLib/ts/global';

import { useUserSharedState } from '@store/UserContext';
import { useNewsSharedState } from '@store/newsContext';

// import {
// 	handleDeletingMainOrReplyCommentInNewsItem,
// 	handleLoadingCommentRepliesInNewsItem,
// 	handleReplyingToMainOrReplyCommentInNewsItem,
// 	handleUpdatingMainOrReplyCommentInNewsItem,
// } from '@store/NewsContext/actions';
// // import NewsContext from '@store/NewsContext';
// import { useNewsSharedState } from '@store/NewsContext';
// import { useUserSharedState } from '@store/UserContext';
// import { dateToHumanReadableDate } from '@lib/v1/time';

// import Md from '@components/UI/V1/Format/Md';
// import FormatterContainer from '@components/UI/V1/Format/Container';

// import DropdownMenu from '@components/UI/V1/DropdownMenu';
import CommentTextarea from '../CommentTextarea';
import CustomNextImage from '@commonComponentsDependent/CustomNextImage';
import MdToHTMLFormatter from '@commonComponentsDependent/Format/MdToHTML';
import FormatContainer from '@commonComponentsIndependent/Format/Container';
import TimeAndDate from '@coreComponents/News/Item/TimeAndDate';

interface ICommentMainProps {
	commentType: TNewsItemCommentTypeMain['type'];
	comment: TNewsItemCommentTypeMain;
	newsItemData: TNewsItemData;
	// ...props
}
interface ICommentMainReplyProps {
	commentType: TNewsItemCommentTypeReplyMain['type'];
	comment: TNewsItemCommentTypeReplyMain;
	newsItemData: TNewsItemData;
	parent_data: TNewsItemCommentTypeMain;
	// ...props
}

const Replies = ({
	replies,
	newsItemData,
	parent_data,
}: {
	replies: TNewsItemCommentTypeReplyMain[];
	newsItemData: TNewsItemData;
	parent_data: TNewsItemCommentTypeMain;
}): JSX.Element => {
	if (replies)
		return (
			<>
				{replies.map((reply) => (
					<Comment
						key={reply.news_comment_id}
						commentType={reply.type}
						comment={reply}
						newsItemData={newsItemData}
						parent_data={parent_data}
					/>
				))}{' '}
			</>
		);

	return <></>;
};

const Comment: FC<ICommentMainProps | ICommentMainReplyProps> = ({
	// props.commentType,
	// props.comment,
	newsItemData,
	...props
}) => {
	// const [userData, userDispatch] = useUserSharedState();
	// const [newsState, newsDispatch] = useNewsSharedState();

	const [
		{
			data: { user: userData },
		},
		userDispatch,
	] = useUserSharedState();

	const [newsDataState, newsDataDispatch] = useNewsSharedState();

	const commentMain =
		(props.commentType === 'comment_main' && props.comment) || undefined;
	const commentMainReply =
		(props.commentType === 'comment_main_reply' && props.comment) || undefined;
	const commentPropsMainReplyParentData =
		(props.commentType === 'comment_main_reply' && props.parent_data) ||
		undefined;

	const [isContentVisible, setShowContent] = useState(true);
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
		content: props.comment.content,
		comment_reply: '',
	});
	const [items, setItems] = useState([]);

	const handleDeleteComment = async () =>
		// bodyObj
		{
			// setDeleteBtnsDisabled(true);
			// await handleDeletingMainOrReplyCommentInNewsItem({
			// 	newsDispatch,
			// 	news_id: newsItemData.news_id,
			// 	props.comment,
			// 	token: userData?.token,
			// 	bodyObj,
			// 	parent_data_id:
			// 		props.commentType === 'comment_main_reply'
			// 			? props.parent_data.news_comment_id
			// 			: undefined,
			// });
		};

	const handleUpdatingComment = async (event: FormEvent) => {
		// event.preventDefault();
		// setEditBtnsDisabled(true);
		// const bodyObj = {
		// 	content: values.content,
		// 	news_comment_id: props.comment.news_comment_id,
		// };
		// await handleUpdatingMainOrReplyCommentInNewsItem({
		// 	newsDispatch,
		// 	token: userData?.token,
		// 	bodyObj,
		// 	props.comment,
		// 	news_id: newsItemData.news_id,
		// 	parent_data_id:
		// 		props.commentType === 'comment_main_reply'
		// 			? props.parent_data.news_comment_id
		// 			: undefined,
		// });
		// setShowContent(true);
		// setEditBtnsDisabled(false);
	};

	const handleSubmitCommentReply = async () =>
		// newsDispatch,
		// bodyObj,
		// user,
		// commentData,
		// setValues
		{
			// setCommentReplyBtnsDisabled(true);
			// await handleReplyingToMainOrReplyCommentInNewsItem({
			// 	newsDispatch,
			// 	newsItem: newsItemData,
			// 	user: userData?.user,
			// 	token: userData?.token,
			// 	bodyObj,
			// });
			// setValues((prev) => ({
			// 	...prev,
			// 	comment_reply: '',
			// }));
			// setShowReplyTextarea(false);
			// setCommentReplyBtnsDisabled(false);
		};

	const loadRepliesHandler = async () =>
		// parent_id, news_id
		{
			// if (
			// 	props.comment.hit_replies_limit ||
			// 	(props.comment.replies && props.comment.replies.length === props.comment.replies_counter)
			// )
			// 	return;
			// setLoadingReplies(true);
			// await handleLoadingCommentRepliesInNewsItem({
			// 	newsDispatch,
			// 	props.comment,
			// 	parent_id,
			// 	news_id,
			// });
			// if (!showReplies) setShowReplies(true);
			// setLoadingReplies(false);
		};

	useEffect(() => {
		/*
		if (userData?.userExist) {
			setItems([
				{
					props: {
						handleDeleteComment,
						props.comment,
						newsItemData,
						deleteBtnsDisabled,
					},
					Element: function Element({
						handleDeleteComment,
						props.comment,
						newsItemData,
						deleteBtnsDisabled,
					}) {
						return (
							<button
								title='Delete Comment'
								disabled={deleteBtnsDisabled}
								onClick={() => {
									let bodyObj = {};
									if (props.commentType === 'comment_main') {
										bodyObj = {
											type: props.commentType,
											news_comment_id: props.comment.news_comment_id,
											parent_id: newsItemData.news_id,
										};
									} else if (props.commentType === 'comment_main_reply') {
										bodyObj = {
											type: props.commentType,
											news_comment_id: props.comment.news_comment_id,
											parent_id: props.parent_data.news_comment_id,
										};

										if (props.comment.reply_to_comment_id)
											bodyObj.reply_to_comment_id = props.comment.reply_to_comment_id;
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
		*/
	}, [
		props.comment,
		deleteBtnsDisabled,
		items.length,
		newsItemData,
		commentPropsMainReplyParentData?.news_comment_id,
		// userData?.userExist,
	]);

	useEffect(() => {
		/*
		if (
			props.commentType === 'comment_main' &&
			!showReplies &&
			props.comment.replies &&
			props.comment.replies.length !== 0
		) {
			setShowReplies(true);
		}
		*/
	}, [commentMain?.replies, props.commentType, showReplies]);

	return (
		<div
			className={`${classes.comment} ${classes[`type-${props.commentType}`]}`}
		>
			<header className={classes.header}>
				<nav className={classes.nav}>
					{props.comment.author_profile_picture && (
						<CustomNextImage
							src={props.comment.author_profile_picture}
							alt=''
							className={classes['profile_picture-container']}
						/>
					)}
					<div className={classes['author-info']}>
						<p>
							<strong>{props.comment.author_user_name_id}</strong>
						</p>
						<p>
							<em>
								<small>
									{props.comment.author_first_name}{' '}
									{props.comment.author_last_name}
								</small>
							</em>
						</p>
					</div>
				</nav>
				{/* {userData?.user.id === props.comment.author_id && (
					<DropdownMenu items={items} />
				)} */}
			</header>
			{isContentVisible && (
				<FormatContainer className={classes.comment_content}>
					<MdToHTMLFormatter content={props.comment.content} />
				</FormatContainer>
			)}
			{!isContentVisible && (
				<CommentTextarea
					// type='update'
					handleSubmit={handleUpdatingComment}
					// focusTextarea={focusTextarea}
					// setFocusCommentTextarea={setFocusCommentTextarea}
					name='content'
					// comment={props.comment}
					// comment={props.comment}
					setValues={setValues}
					value={values.content}
					disableSubmitBtn={editBtnsDisabled}
					// closeBtn
					// onClickingCloseBtn={() => setShowContent(true)}
				/>
			)}
			<footer className={classes.footer}>
				<TimeAndDate
					created_at={props.comment.created_at}
					updated_at={props.comment.updated_at}
				/>
				{/* {userData?.userExist && (
					<button
						title='Reply To A Comment'
						onClick={() => setShowReplyTextarea((prev) => !prev)}
					>
						Reply
					</button>
				)} */}
			</footer>
			{props.commentType === 'comment_main' &&
				props.comment.replies_counter !== 0 &&
				!showReplies && (
					<button
						title={`${
							props.comment.replies_counter === 1 ? 'Reply' : 'Replies'
						} ${props.comment.replies_counter}`}
						disabled={loadingReplies}
						onClick={() => {
							if (
								props.comment.replies &&
								props.comment.replies.length !== 0 &&
								!showReplies
							)
								setShowReplies(true);
							if (
								(props.comment.replies &&
									props.comment.replies.length !==
										props.comment.replies_counter) ||
								!props.comment.hit_replies_limit
							) {
								loadRepliesHandler();
								// props.comment.news_comment_id,
								// newsItemData.news_id
							}
						}}
					>
						<p>
							{props.comment.replies_counter === 1 ? 'Reply' : 'Replies'}{' '}
							{props.comment.replies_counter}
						</p>
					</button>
				)}
			{userData?.id && showReplyTextarea && (
				<CommentTextarea
					handleSubmit={(event) => {
						// event.preventDefault();
						// let bodyObj = {
						// 	type: 'comment_main_reply',
						// 	news_id: newsItemData.news_id,
						// 	content: values.comment_reply,
						// 	reply_to_user_id: props.comment.author_id,
						// };
						// if (props.commentType === 'comment_main') {
						// 	bodyObj.parent_id = props.comment.news_comment_id;
						// } else if (props.commentType === 'comment_main_reply') {
						// 	bodyObj.parent_id = props.parent_data.news_comment_id;
						// 	bodyObj.reply_to_comment_id = props.comment.news_comment_id;
						// }
						// handleSubmitCommentReply(
						// 	// newsDispatch, // newsDispatch,
						// 	// bodyObj,
						// 	// userData?.user,
						// 	// props.comment,
						// 	// setValues
						// );
					}}
					// focusTextarea={focusCommentReplyTextarea}
					// setFocusCommentTextarea={setFocusCommentReplyTextarea}
					name='comment_reply'
					setValues={setValues}
					value={values.comment_reply}
					disableSubmitBtn={commentReplyBtnsDisabled}
				/>
			)}
			{showReplies && commentMain?.replies && (
				<Replies
					replies={commentMain.replies}
					newsItemData={newsItemData}
					parent_data={commentMain}
				/>
			)}

			{loadingReplies && <p>Loading...</p>}

			<div className='buttons-holder'>
				{showReplies &&
					props.commentType === 'comment_main' &&
					!props.comment.hit_replies_limit &&
					props.comment.replies_counter !== 0 &&
					props.comment.replies_counter !== props.comment?.replies?.length && (
						<button
							title='Load More'
							disabled={loadingReplies}
							onClick={() => {
								if (
									props.comment.replies &&
									props.comment.replies.length !== 0 &&
									!showReplies
								)
									setShowReplies(true);
								if (
									(props.comment.replies &&
										props.comment.replies.length !==
											props.comment.replies_counter) ||
									!props.comment.hit_replies_limit
								) {
									loadRepliesHandler();
									// props.comment.news_comment_id,
									// newsItemData.news_id
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
