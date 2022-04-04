import {
	FC,
	FormEvent,
	// useEffect,
	useReducer,
	useState,
} from 'react';

import classes from './index.module.css';
import helpersClasses from '@styles/helpers.module.css';

import {
	TNewsItemData,
	TNewsItemCommentTypeMain,
	TNewsItemCommentTypeReplyMain,
} from '@coreLib/ts/global';

import { useUserSharedState } from '@store/UserContext';
import { useNewsSharedState } from '@store/NewsContext';

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
import Link from 'next/link';
// import { getMoreNewsItemCommentRepliesMain } from '@store/NewsContext/actions/comments';
import commentRequestsReducer from './utils/reducer';
import {
	createNewsItemReplyForMainComment,
	deleteNewsItemMainOrMainReplyComment,
	getRepliesForMainComment,
	updateNewsItemMainOrMainReplyComment,
} from './utils/actions';
import { imagesWeservNlLoader } from '@commonLibIndependent/image';

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
			data: { user: userData, token: userToken },
		},
		userDispatch,
	] = useUserSharedState();

	const [_newsState, newsDispatch] = useNewsSharedState();

	const [requestsActionsState, requestsActionsDispatch] = useReducer(
		commentRequestsReducer,
		{
			type: props.comment.type,
		}
	);

	const commentMain =
		(props.commentType === 'comment_main' && props.comment) || undefined;

	const [isUpdatingContentVisible, setIsUpdatingContentVisible] =
		useState(true);
	const [showReplyTextarea, setShowReplyTextarea] = useState(false);
	const [showReplies, setShowReplies] = useState(false);

	const [focusTextarea, setFocusCommentTextarea] = useState(false);
	const [editButtonsDisabled, setEditButtonsDisabled] = useState(false);

	const [deleteButtonsDisabled, setDeleteButtonsDisabled] = useState(false);
	const [commentReplyButtonsDisabled, setCommentReplyButtonsDisabled] =
		useState(false);
	const [focusCommentReplyTextarea, setFocusCommentReplyTextarea] =
		useState(false);

	// const [loadingReplies, setLoadingReplies] = useState(false);

	const [values, setValues] = useState({
		content: props.comment.content,
		comment_reply: '',
	});
	const [items, setItems] = useState([]);

	const handleDeleteComment = async () =>
		// bodyObj
		{
			setDeleteButtonsDisabled(true);
			deleteNewsItemMainOrMainReplyComment(requestsActionsDispatch, {
				newsDispatch,
				token: userToken,
				requiredData: {
					news_comment_id: props.comment.news_comment_id,
					news_id: newsItemData.news_id,
					// parent_id:
					...(() => {
						if (props.comment.type === 'comment_main_reply') {
							return {
								type: props.comment.type,
								parent_id: props.comment.parent_id,
							};
						}

						return {
							type: props.comment.type,
						};
					})(),
				},
			});
		};

	const handleUpdatingComment = async (event: FormEvent) => {
		event.preventDefault();
		if (!userData) return;

		const result = await updateNewsItemMainOrMainReplyComment(
			requestsActionsDispatch,
			{
				newsDispatch,
				token: userToken,
				requiredData: {
					newContent: values.content,
					news_comment_id: props.comment.news_comment_id,
					news_id: newsItemData.news_id,
					...(() => {
						if (props.comment.type === 'comment_main_reply') {
							return {
								parent_id: props.comment.parent_id,
								type: props.comment.type,
							};
						}

						return {
							type: props.comment.type,
						};
					})(),
				},
			}
		);

		if (result) setIsUpdatingContentVisible(false);
	};

	const handleSubmitCommentReply = async () => {
		if (!userData) return;

		await createNewsItemReplyForMainComment(requestsActionsDispatch, {
			newsDispatch,
			token: userToken,
			requiredData: {
				author_id: userData.id,
				author_user_name_id: userData.user_name_id,
				author_first_name: userData.first_name,
				author_last_name: userData.last_name,
				author_profile_picture: userData.profile_picture,
				content: values.comment_reply,
				news_id: newsItemData.news_id,
				...(() => {
					if (props.comment.type === 'comment_main_reply') {
						return {
							type: props.comment.type,
							parent_id: props.comment.news_comment_id,
							reply_to_comment_id: props.comment.news_comment_id,
							reply_to_user_id: props.comment.author_id,
						};
					}

					return {
						type: props.comment.type,
						parent_id: props.comment.news_comment_id,
					};
				})(),
			},
		});
	};

	const loadRepliesHandler = async () => {
		if (props.comment.type !== 'comment_main') return;

		let last_reply_created_at;
		try {
			last_reply_created_at = new Date(props.comment.created_at).toISOString();
			if (!last_reply_created_at)
				throw new Error(
					'last_reply_created_at is undefined \u{1F612}, So we will fetch the initial comment \u{1F60A}'
				);
		} catch (error) {
			if (error instanceof Error) console.error(error.message);
		}

		await getRepliesForMainComment(requestsActionsDispatch, {
			newsDispatch,
			parent_id: props.comment.news_comment_id,
			news_id: newsItemData.news_id,
			urlOptions: {
				params: {
					news_id: newsItemData.news_id,
				},
				queries: {
					comment_type: 'comment_main_reply',
					last_reply_created_at,
					parent_id: props.comment.news_comment_id,
				},
			},
		});
	};

	// useEffect(() => {
	/*
		if (userData?.userExist) {
			setItems([
				{
					props: {
						handleDeleteComment,
						props.comment,
						newsItemData,
						deleteButtonsDisabled,
					},
					Element: function Element({
						handleDeleteComment,
						props.comment,
						newsItemData,
						deleteButtonsDisabled,
					}) {
						return (
							<button
								title='Delete Comment'
								disabled={deleteButtonsDisabled}
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
	// }, [
	// 	props.comment,
	// 	deleteButtonsDisabled,
	// 	items.length,
	// 	newsItemData,
	// 	commentPropsMainReplyParentData?.news_comment_id,
	// 	// userData?.userExist,
	// ]);

	// useEffect(() => {
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
	// }, [commentMain?.replies, props.commentType, showReplies]);

	return (
		<div
			className={`${classes.comment} ${classes[`type-${props.commentType}`]}`}
		>
			<header className={classes.header}>
				<nav className={classes.nav}>
					{props.comment.author_profile_picture && (
						<Link
							prefetch={false}
							// passHref
							href={`/users/${props.comment.author_user_name_id}`}
						>
							<a>
								<CustomNextImage
									src={imagesWeservNlLoader({
										url: props.comment.author_profile_picture,
										w: 300,
										h: 300,
									})}
									alt=''
									className={classes['profile_picture-container']}
								/>
							</a>
						</Link>
					)}
					<div className={classes['author-info']}>
						<p>
							<Link
								prefetch={false}
								// passHref
								href={`/users/${props.comment.author_user_name_id}`}
							>
								<a className={helpersClasses.fontWeightBold}>
									{props.comment.author_user_name_id}
								</a>
							</Link>
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
			{isUpdatingContentVisible && (
				<FormatContainer className={classes.comment_content}>
					<MdToHTMLFormatter content={props.comment.content} />
				</FormatContainer>
			)}
			{userData?.id &&
				userData.id === props.comment.author_id &&
				!isUpdatingContentVisible && (
					<CommentTextarea
						handleSubmit={handleUpdatingComment}
						name='content'
						setValues={setValues}
						value={values.content}
						disableSubmitButton={editButtonsDisabled}
						commentToType={props.comment.type}
					/>
				)}
			<footer className={classes.footer}>
				<TimeAndDate
					created_at={props.comment.created_at}
					updated_at={props.comment.updated_at}
				/>
				{userData?.id && (
					<button
						title='Reply To A Comment'
						onClick={() => setShowReplyTextarea((prev) => !prev)}
					>
						Reply
					</button>
				)}
			</footer>
			{props.commentType === 'comment_main' &&
				requestsActionsState.type === 'comment_main' &&
				props.comment.replies_counter !== 0 &&
				!showReplies && (
					<button
						title={`${
							props.comment.replies_counter === 1 ? 'Reply' : 'Replies'
						} ${props.comment.replies_counter}`}
						disabled={requestsActionsState?.getReplies?.isLoading}
						onClick={() => {
							if (
								(!props.comment.replies ||
									props.comment.replies.length !==
										props.comment.replies_counter) &&
								!props.comment.hit_replies_limit
							) {
								loadRepliesHandler();
							}
							setShowReplies(true);
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
					handleSubmit={handleSubmitCommentReply}
					// focusTextarea={focusCommentReplyTextarea}
					// setFocusCommentTextarea={setFocusCommentReplyTextarea}
					name='comment_reply'
					setValues={setValues}
					value={values.comment_reply}
					disableSubmitButton={commentReplyButtonsDisabled}
					commentToType={props.comment.type}
				/>
			)}
			{showReplies &&
				commentMain?.replies &&
				commentMain.replies?.length !== 0 && (
					<Replies
						replies={commentMain.replies}
						newsItemData={newsItemData}
						parent_data={commentMain}
					/>
				)}

			{requestsActionsState.type === 'comment_main' &&
				requestsActionsState?.getReplies?.isLoading && (
					<p className='isLoadingLoader'>Loading...</p>
				)}

			<div className='buttons-holder'>
				{showReplies &&
					props.comment.type === 'comment_main' &&
					requestsActionsState.type === 'comment_main' &&
					props.comment?.replies &&
					props.comment?.replies.length !== 0 &&
					!props.comment.hit_replies_limit &&
					props.comment.replies_counter !== 0 &&
					props.comment.replies_counter !== props.comment?.replies?.length && (
						<button
							title='Load More'
							disabled={requestsActionsState?.getReplies?.isLoading}
							onClick={() => {
								if (
									props.comment.type === 'comment_main' &&
									props.comment.replies &&
									props.comment.replies.length !== 0 &&
									!showReplies
								)
									setShowReplies(true);
								if (
									props.comment.type === 'comment_main' &&
									!props.comment.hit_replies_limit &&
									props.comment.replies &&
									props.comment.replies.length !== props.comment.replies_counter
								) {
									loadRepliesHandler();
								}
							}}
						>
							<span className={helpersClasses.fontWeightBold}>Load More</span>
						</button>
					)}

				{props.comment.type === 'comment_main' &&
					requestsActionsState.type === 'comment_main' &&
					showReplies &&
					props.comment?.replies &&
					props.comment?.replies.length !== 0 && (
						<button
							title='Hide Replies'
							disabled={requestsActionsState?.getReplies?.isLoading}
							onClick={() => setShowReplies(false)}
						>
							<span className={helpersClasses.fontWeightBold}>
								Hide Replies
							</span>
						</button>
					)}
			</div>
		</div>
	);
};

export default Comment;
