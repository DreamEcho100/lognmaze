import { FC, FormEvent, useEffect, useReducer, useState } from 'react';
import Link from 'next/link';

import classes from './index.module.css';
import helpersClasses from '@styles/helpers.module.css';

import {
	TNewsItemData,
	TNewsItemCommentTypeMain,
	TNewsItemCommentTypeReplyMain,
} from '@coreLib/ts/global';

import { useUserSharedState } from '@store/UserContext';

import commentRequestsReducer from './utils/reducer';
import {
	createNewsItemReplyForMainComment,
	getRepliesForMainComment,
	updateNewsItemMainOrMainReplyComment,
	deleteNewsItemMainOrMainReplyComment,
} from './utils/actions';
import { imagesWeservNlLoader } from '@commonLibIndependent/image';
import { useNewsItemExtraDataSharedState } from '@coreComponents/News/Item/context';

import CustomDropdown from './CustomDropdown';
import DropdownMenuItem from '@commonComponentsIndependent/Dropdown/Item';
import CommentTextarea from '../CommentTextarea';
import CustomNextImage from '@commonComponentsDependent/CustomNextImage';
import MdToHTMLFormatter from '@commonComponentsDependent/Format/MdToHTML';
import FormatContainer from '@commonComponentsIndependent/Format/Container';
import TimeAndDate from '@coreComponents/News/Item/TimeAndDate';

interface ICommentMainProps {
	commentType: TNewsItemCommentTypeMain['type'];
	comment: TNewsItemCommentTypeMain;
	news_id: TNewsItemData['news_id'];
	parent_data?: null;
}
interface ICommentMainReplyProps {
	commentType: TNewsItemCommentTypeReplyMain['type'];
	comment: TNewsItemCommentTypeReplyMain;
	news_id: TNewsItemData['news_id'];
	parent_data: TNewsItemCommentTypeMain;
}

const Replies = ({
	replies,
	news_id,
	parent_data,
}: {
	replies: TNewsItemCommentTypeReplyMain[];
	news_id: TNewsItemData['news_id'];
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
						news_id={news_id}
						parent_data={parent_data}
					/>
				))}{' '}
			</>
		);

	return <></>;
};

const Comment: FC<ICommentMainProps | ICommentMainReplyProps> = ({
	news_id,
	...props
}) => {
	const [
		{
			data: { user: userData, token: userToken },
		},
	] = useUserSharedState();

	const [, newsItemExtraDataDispatch] = useNewsItemExtraDataSharedState();

	const [requestsActionsState, requestsActionsDispatch] = useReducer(
		commentRequestsReducer,
		{
			type: props.comment.type,
		}
	);

	const commentMain =
		(props.commentType === 'comment_main' && props.comment) || undefined;

	const [isUpdatingContentVisible, setIsUpdatingContentVisible] =
		useState(false);
	const [showReplyTextarea, setShowReplyTextarea] = useState(false);
	const [showReplies, setShowReplies] = useState(false);

	const [isDropdownListVisible, setIsDropdownListVisible] = useState(false);

	const [values, setValues] = useState({
		content: props.comment.content,
		comment_reply: '',
	});

	const handleUpdatingComment = async (event: FormEvent) => {
		event.preventDefault();
		if (!userData) return;

		await updateNewsItemMainOrMainReplyComment(requestsActionsDispatch, {
			newsItemExtraDataDispatch,
			token: userToken,
			requiredData: {
				newContent: values.content,
				news_comment_id: props.comment.news_comment_id,
				news_id: news_id,
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
		});

		setIsUpdatingContentVisible(false);
	};

	const handleSubmitCommentReply = async (event: FormEvent) => {
		event.preventDefault();

		if (!userData || values.comment_reply.length < 2) return;

		await createNewsItemReplyForMainComment(requestsActionsDispatch, {
			newsItemExtraDataDispatch,
			token: userToken,
			requiredData: {
				author_id: userData.id,
				author_user_name_id: userData.user_name_id,
				author_first_name: userData.first_name,
				author_last_name: userData.last_name,
				author_profile_picture: userData.profile_picture,
				content: values.comment_reply,
				news_id: news_id,
				parent_id:
					props.comment.type === 'comment_main_reply' && props.parent_data
						? props.parent_data.news_comment_id
						: props.comment.news_comment_id,
				reply_to_user_id: props.comment.author_id,
				reply_to_comment_id:
					props.comment.type === 'comment_main_reply' && props.parent_data
						? props.parent_data.news_comment_id
						: undefined,
			},
		});
	};

	useEffect(() => {
		if (requestsActionsState.create?.success) {
			setValues((prevState) => ({
				...prevState,
				comment_reply: '',
			}));
		}
	}, [requestsActionsState.create?.success]);

	const loadRepliesHandler = async () => {
		if (
			props.comment.type !== 'comment_main' ||
			parseInt(props.comment.replies_counter + '') === 0
		)
			return;

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
			newsItemExtraDataDispatch,
			parent_id: props.comment.news_comment_id,
			urlOptions: {
				params: {
					news_id: news_id,
				},
				queries: {
					comment_type: 'comment_main_reply',
					last_reply_created_at,
					parent_id: props.comment.news_comment_id,
				},
			},
		});
	};

	const handleIsReplyTextareaIsVisible = (isVisible?: boolean) => {
		setShowReplyTextarea((prevState) =>
			typeof isVisible === 'boolean' ? isVisible : !prevState
		);
	};
	const handleIsUpdatingContentVisible = (isVisible?: boolean) => {
		setIsUpdatingContentVisible((prevState) =>
			typeof isVisible === 'boolean' ? isVisible : !prevState
		);
	};

	return (
		<div
			className={`${classes.comment} ${classes[`type-${props.commentType}`]}`}
		>
			<div className={classes.commentContainer}>
				<header className={classes.header}>
					<nav className={classes.nav}>
						{props.comment.author_profile_picture && (
							<Link
								prefetch={false}
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
					{userData?.id === props.comment.author_id && (
						<CustomDropdown
							isDropdownListVisible={isDropdownListVisible}
							setIsDropdownListVisible={setIsDropdownListVisible}
						>
							<DropdownMenuItem
								setIsDropdownListVisible={setIsDropdownListVisible}
							>
								<button
									disabled={
										requestsActionsState.update?.isLoading ||
										isUpdatingContentVisible
									}
									onClick={() => handleIsUpdatingContentVisible(true)}
								>
									update
								</button>
							</DropdownMenuItem>
							<DropdownMenuItem
								setIsDropdownListVisible={setIsDropdownListVisible}
							>
								<button
									disabled={requestsActionsState.delete?.isLoading}
									onClick={async () => {
										if (
											confirm('Are you sure you want to delete this comment?')
										) {
											console.log('DELETE');
											await deleteNewsItemMainOrMainReplyComment(
												requestsActionsDispatch,
												{
													newsItemExtraDataDispatch,
													token: userToken,
													requiredData: {
														news_comment_id: props.comment.news_comment_id,
														news_id: news_id,
														...(() => {
															if (props.comment.type === 'comment_main_reply') {
																console.log('props.comment.parent_id');
																return {
																	parent_id:
																		props.parent_data?.news_comment_id ||
																		props.comment.parent_id,
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
										}
									}}
								>
									delete
								</button>
							</DropdownMenuItem>
						</CustomDropdown>
					)}
				</header>
				{!isUpdatingContentVisible && (
					<FormatContainer className={classes.comment_content}>
						<MdToHTMLFormatter content={props.comment.content} />
					</FormatContainer>
				)}
				{userData?.id &&
					userData.id === props.comment.author_id &&
					isUpdatingContentVisible && (
						<CommentTextarea
							handleSubmit={handleUpdatingComment}
							name='content'
							setValues={setValues}
							value={values.content}
							disableSubmitButton={requestsActionsState.update?.isLoading}
							commentToType={props.comment.type}
							handleIsCommentTextareaIsVisible={() =>
								handleIsUpdatingContentVisible(false)
							}
						/>
					)}
				<footer className={classes.footer}>
					<small>
						<TimeAndDate
							created_at={props.comment.created_at}
							updated_at={props.comment.updated_at}
						/>
					</small>
					{userData?.id && (
						<button
							title='Reply To A Comment'
							onClick={() => setShowReplyTextarea((prev) => !prev)}
						>
							Reply
						</button>
					)}
				</footer>
			</div>
			{props.commentType === 'comment_main' &&
				props.comment.replies_counter !== 0 &&
				!showReplies && (
					<button
						title={`${
							props.comment.replies_counter === 1 ? 'Reply' : 'Replies'
						} ${props.comment.replies_counter}`}
						disabled={
							requestsActionsState.type === 'comment_main' &&
							requestsActionsState?.getReplies?.isLoading
						}
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
					name='comment_reply'
					setValues={setValues}
					value={values.comment_reply}
					disableSubmitButton={requestsActionsState.create?.isLoading}
					commentToType={props.comment.type}
					handleIsCommentTextareaIsVisible={() =>
						handleIsReplyTextareaIsVisible(false)
					}
				/>
			)}
			{showReplies &&
				commentMain?.replies &&
				commentMain.replies?.length !== 0 && (
					<Replies
						replies={commentMain.replies}
						news_id={news_id}
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
