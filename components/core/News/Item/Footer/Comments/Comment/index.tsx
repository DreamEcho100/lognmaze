import { FC, FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';

import classes from './index.module.css';
import helpersClasses from '@styles/helpers.module.css';

import {
	TNewsItemData,
	TNewsItemCommentTypeMain,
	TNewsItemCommentTypeReplyMain,
	TNewsItemCommentBasicData,
	TNewsItemCommentMainReplies,
} from '@coreLib/ts/global';

import { useUserSharedState } from '@store/UserContext';

import { imagesWeservNlLoader } from '@commonLibIndependent/image';
import { useNewsItemExtraDataSharedState } from '@coreComponents/News/Item/context';
import useRequestState from '@commonLibDependent/requestState';
import networkReqArgs from '@coreLib/networkReqArgs';
import {
	handleRequestStateChanges,
	returnBearerTokenIfExist,
} from '@commonLibIndependent/fetch';
import ENewsItemExtraData from '@coreComponents/News/Item/context/constants';

import CustomDropdown from './CustomDropdown';
import DropdownMenuItem from '@commonComponentsIndependent/Dropdown/Item';
import CommentTextarea from '../CommentTextarea';
import CustomNextImage from '@commonComponentsDependent/CustomNextImage';
import MdToHTMLFormatter from '@commonComponentsDependent/Format/MdToHTML';
import FormatContainer from '@commonComponentsIndependent/Format/Container';
import TimeAndDate from '@coreComponents/News/Item/TimeAndDate';

interface IGetMoreNewsItemCommentRepliesMainExtraProps {
	news_id: TNewsItemData['news_id'];
	parent_id: TNewsItemCommentBasicData['news_comment_id'];
}
interface IGetRepliesForMainCommentSuccessData {
	hit_replies_limit: boolean;
	comments: TNewsItemCommentMainReplies;
}

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

	const { requestsState, requestsActionsDispatch, requestsConstants } =
		useRequestState({
			requestString: 'create,getReplies,update,delete',
		});

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

	const handleUpdateNewsItemMainOrMainReplyComment = async (
		event: FormEvent
	) => {
		event.preventDefault();
		if (!userData) return;

		const requiredData = {
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
		};

		return await handleRequestStateChanges<
			{
				comments: TNewsItemCommentMainReplies;
				hit_replies_limit: boolean;
			},
			true
		>({
			onInit: async () => {
				requestsActionsDispatch({
					type: requestsConstants.IS_LOADING,
					payload: {
						target: 'delete',
					},
				});

				const { requestInfo, requestInit } =
					networkReqArgs._app.news.item.comment.update({
						urlOptions: {
							params: {
								news_comment_id: requiredData.news_comment_id,
								news_id: requiredData.news_id,
							},
						},
						bodyContent: {
							content: requiredData.newContent,
						},
						headersList: {
							Authorization: userToken && returnBearerTokenIfExist(userToken),
						},
					});

				return await fetch(requestInfo, requestInit);
			},
			onError: (error) => {
				requestsActionsDispatch({
					type: requestsConstants.ERROR,
					payload: {
						target: 'delete',
						error,
					},
				});
			},
			onSuccess: () => {
				setIsUpdatingContentVisible(false);

				newsItemExtraDataDispatch({
					type: ENewsItemExtraData.UPDATE_MAIN_OR_MAIN_REPLY_COMMENT,
					payload: {
						...requiredData,
						newContent: requiredData.newContent,
					},
				});
				requestsActionsDispatch({
					type: requestsConstants.SUCCESS,
					payload: {
						target: 'delete',
					},
				});

				setIsUpdatingContentVisible(false);
			},
		});
	};

	const handleCreateNewsItemReplyForMainComment = async (event: FormEvent) => {
		event.preventDefault();
		if (!userData || values.comment_reply.length < 2) return;

		const requiredData = {
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
		};

		return await handleRequestStateChanges<
			{
				news_comment_id: TNewsItemCommentBasicData['news_comment_id'];
			},
			boolean,
			IGetMoreNewsItemCommentRepliesMainExtraProps,
			IGetMoreNewsItemCommentRepliesMainExtraProps,
			IGetMoreNewsItemCommentRepliesMainExtraProps
		>({
			onInit: async () => {
				requestsActionsDispatch({
					type: requestsConstants.IS_LOADING,
					payload: {
						target: 'create',
					},
				});

				const { requestInfo, requestInit } =
					networkReqArgs._app.news.item.comment.create({
						urlOptions: {
							params: {
								news_id: requiredData.news_id,
							},
						},
						bodyContent: {
							comment_type: 'comment_main_reply',
							parent_id: requiredData.parent_id,
							reply_to_user_id: requiredData.reply_to_user_id,
							reply_to_comment_id: requiredData.reply_to_comment_id,
							content: requiredData.content,
							news_id: requiredData.news_id,
						},
						headersList: {
							Authorization: userToken && returnBearerTokenIfExist(userToken),
						},
					});

				return await fetch(requestInfo, requestInit);
			},
			onError: (error) => {
				requestsActionsDispatch({
					type: requestsConstants.ERROR,
					payload: {
						target: 'create',
						error,
					},
				});
			},
			onSuccess: ({ news_comment_id }) => {
				setTimeout(
					() =>
						newsItemExtraDataDispatch({
							type: ENewsItemExtraData.ADD_NEW_MAIN_OR_MAIN_REPLY_COMMENT,
							payload: {
								newCommentData: {
									...requiredData,
									news_comment_id,
									type: 'comment_main_reply',
									created_at: new Date().getTime(),
									updated_at: new Date().getTime(),
								},
							},
						}),
					0
				);
				requestsActionsDispatch({
					type: requestsConstants.SUCCESS,
					payload: {
						target: 'create',
					},
				});
			},
		});
	};

	const handleGetRepliesForMainComment = async () => {
		if (
			props.comment.type !== 'comment_main' ||
			(parseInt(props.comment.replies_counter + '') || 0) === 0
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

		const parent_id = props.comment.news_comment_id;
		const urlOptions: Parameters<
			typeof networkReqArgs._app.news.item.comments.get
		>['0']['urlOptions'] = {
			params: {
				news_id: news_id,
			},
			queries: {
				comment_type: 'comment_main_reply',
				last_reply_created_at,
				parent_id: props.comment.news_comment_id,
			},
		};

		return handleRequestStateChanges<IGetRepliesForMainCommentSuccessData>({
			onInit: async () => {
				requestsActionsDispatch({
					type: requestsConstants.IS_LOADING,
					payload: {
						target: 'getReplies',
					},
				});

				const { requestInfo, requestInit } =
					networkReqArgs._app.news.item.comments.get({
						urlOptions,
					});

				return await fetch(requestInfo, requestInit);
			},
			onError: (error) => {
				requestsActionsDispatch({
					type: requestsConstants.ERROR,
					payload: {
						target: 'getReplies',
						error,
					},
				});
				return false;
			},
			onSuccess: ({ comments, hit_replies_limit }) => {
				requestsActionsDispatch({
					type: requestsConstants.SUCCESS,
					payload: {
						target: 'getReplies',
					},
				});

				newsItemExtraDataDispatch({
					type: ENewsItemExtraData.ADD_REPLIES_TO_COMMENT_MAIN,
					payload: {
						newCommentMainRepliesData: comments,
						hit_replies_limit,
						parent_id,
					},
				});
			},
		});
	};

	const handleDeleteNewsItemMainOrMainReplyComment = async () => {
		if (!confirm('Are you sure you want to delete this comment?')) return;

		const requiredData = {
			news_comment_id: props.comment.news_comment_id,
			news_id: news_id,
			...(() => {
				if (props.comment.type === 'comment_main_reply') {
					return {
						parent_id:
							props.parent_data?.news_comment_id || props.comment.parent_id,
						type: props.comment.type,
					};
				}

				return {
					type: props.comment.type,
				};
			})(),
		};

		return await handleRequestStateChanges<
			{
				comments: TNewsItemCommentMainReplies;
				hit_replies_limit: boolean;
			},
			true
		>({
			onInit: async () => {
				requestsActionsDispatch({
					type: requestsConstants.IS_LOADING,
					payload: {
						target: 'delete',
					},
				});

				const { requestInfo, requestInit } =
					networkReqArgs._app.news.item.comment.delete({
						urlOptions: {
							params: {
								news_comment_id: requiredData.news_comment_id,
								news_id: requiredData.news_id,
							},
						},
						bodyContent:
							requiredData.type === 'comment_main_reply'
								? {
										type: requiredData.type,
										parent_id: requiredData.parent_id,
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  }
								: {
										type: requiredData.type,
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  },
						headersList: {
							Authorization: userToken && returnBearerTokenIfExist(userToken),
						},
					});

				return await fetch(requestInfo, requestInit);
			},
			onError: (error) => {
				requestsActionsDispatch({
					type: requestsConstants.ERROR,
					payload: {
						target: 'delete',
						error,
					},
				});
			},
			onSuccess: () => {
				requestsActionsDispatch({
					type: requestsConstants.SUCCESS,
					payload: {
						target: 'delete',
					},
				});
				newsItemExtraDataDispatch({
					type: ENewsItemExtraData.DELETE_MAIN_OR_MAIN_REPLY_COMMENT,
					payload: {
						...requiredData,
					},
				});
			},
		});
	};

	useEffect(() => {
		if (requestsState.create?.success) {
			setValues((prevState) => ({
				...prevState,
				comment_reply: '',
			}));
		}
	}, [requestsState.create?.success]);

	return (
		<div
			className={`${classes.comment} ${classes[`type-${props.commentType}`]}`}
		>
			<div className={classes.commentContainer}>
				<header className={classes.header}>
					<nav className={classes.nav}>
						<Link
							prefetch={false}
							href={`/users/${props.comment.author_user_name_id}`}
						>
							<a className={classes.authorProfilePictureLink}>
								{props.comment.author_profile_picture && (
									<CustomNextImage
										src={imagesWeservNlLoader({
											url: props.comment.author_profile_picture,
											w: 300,
											h: 300,
										})}
										alt=''
										className={classes['profile_picture-container']}
									/>
								)}
							</a>
						</Link>
						<small className={classes['author-info']}>
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
						</small>
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
										requestsState.update?.isLoading || isUpdatingContentVisible
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
									disabled={requestsState.delete?.isLoading}
									onClick={async () =>
										await handleDeleteNewsItemMainOrMainReplyComment()
									}
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
							handleSubmit={handleUpdateNewsItemMainOrMainReplyComment}
							name='content'
							setValues={setValues}
							value={values.content}
							disableSubmitButton={requestsState.update?.isLoading}
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
							props.comment.type === 'comment_main' &&
							// requestsState.type === 'comment_main' &&
							requestsState?.getReplies?.isLoading
						}
						onClick={async () => {
							if (
								(!props.comment.replies ||
									props.comment.replies.length !==
										props.comment.replies_counter) &&
								!props.comment.hit_replies_limit
							) {
								await handleGetRepliesForMainComment();
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
					handleSubmit={handleCreateNewsItemReplyForMainComment}
					name='comment_reply'
					setValues={setValues}
					value={values.comment_reply}
					disableSubmitButton={requestsState.create?.isLoading}
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

			{props.comment.type === 'comment_main' &&
				// requestsState.type === 'comment_main' &&
				requestsState?.getReplies?.isLoading && (
					<p className='isLoadingLoader'>Loading...</p>
				)}

			<div className='buttons-holder'>
				{showReplies &&
					props.comment.type === 'comment_main' &&
					// requestsState.type === 'comment_main' &&
					props.comment?.replies &&
					props.comment?.replies.length !== 0 &&
					!props.comment.hit_replies_limit &&
					props.comment.replies_counter !== 0 &&
					props.comment.replies_counter !== props.comment?.replies?.length && (
						<button
							title='Load More'
							disabled={requestsState?.getReplies?.isLoading}
							onClick={async () => {
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
									await handleGetRepliesForMainComment();
								}
							}}
						>
							<span className={helpersClasses.fontWeightBold}>Load More</span>
						</button>
					)}

				{props.comment.type === 'comment_main' &&
					// requestsState.type === 'comment_main' &&
					showReplies &&
					props.comment?.replies &&
					props.comment?.replies.length !== 0 && (
						<button
							title='Hide Replies'
							disabled={requestsState?.getReplies?.isLoading}
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
