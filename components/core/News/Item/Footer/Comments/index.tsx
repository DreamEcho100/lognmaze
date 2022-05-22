/* eslint-disable no-mixed-spaces-and-tabs */
import { FC, FormEvent, useCallback, useEffect, useState } from 'react';

import helpersClasses from '@styles/helpers.module.css';

import {
	TNewsItemCommentBasicData,
	TNewsItemCommentsMain,
	TNewsItemCommentTypeMain,
	TNewsItemData,
} from '@coreLib/ts/global';
import { useUserSharedState } from '@store/UserContext';

import Comment from './Comment';
import CommentTextarea from './CommentTextarea';
import { useNewsSharedState } from '@store/NewsContext';
import ButtonComponent from '@commonComponentsIndependent/Button';
import { useNewsItemExtraDataSharedState } from '../../context';
import useRequestState from '@commonLibDependent/requestState';
import ENewsItemExtraData from '../../context/constants';
import {
	handleRequestStateChanges,
	returnBearerTokenIfExist,
} from '@commonLibIndependent/fetch';
import networkReqArgs from '@coreLib/networkReqArgs';
import { ICreateNewsItemCommentReqArgsPropsBodyContentTypeCommentMain } from '@coreLib/networkReqArgs/_app/news/[news_id]/comments/ts';

interface IGetMoreNewsItemCommentRepliesMainExtraProps {
	news_id: TNewsItemData['news_id'];
	parent_id: TNewsItemCommentBasicData['news_comment_id'];
}

interface IProps {
	newsItemComments: TNewsItemCommentsMain;
	handleSetIsCommentsVisible: (isCommentsVisible?: boolean) => void;
	isCommentsVisible: boolean;

	news_id: TNewsItemData['news_id'];
	comments_counter: TNewsItemData['comments_counter'];
	hit_comments_limit: TNewsItemData['hit_comments_limit'];
	comments: TNewsItemData['comments'];
}

const Comments: FC<IProps> = ({
	newsItemComments,
	handleSetIsCommentsVisible,
	isCommentsVisible,
	news_id,
	comments_counter,
	hit_comments_limit,
	comments,
}) => {
	const [
		{
			data: { user: userData, token: userToken },
		},
	] = useUserSharedState();

	const [
		{
			actions: { items: newsItemsActions },
		},
		newsDispatch,
	] = useNewsSharedState();

	const { requestState, requestsActionsDispatch, requestsConstants } =
		useRequestState({
			requestString: 'initGetComments,create',
		});

	const [isCommentTextarea, setIsCommentTextarea] = useState(true);

	const getMoreMainCommentsRequest =
		newsItemsActions[news_id]?.requests?.getMoreMainComments;

	const [values, setValues] = useState({
		content: '',
	});

	const [newsItemExtraDataSharedState, newsItemExtraDataDispatch] =
		useNewsItemExtraDataSharedState();

	const isSendCommentButtonDisable = !!(
		!userData || requestState.create?.isLoading
	);

	const getMoreNewsItemCommentsMain = useCallback(async () => {
		const queries: Parameters<
			typeof networkReqArgs._app.news.item.comments.get
		>['0']['urlOptions']['queries'] = {
			comment_type: 'comment_main',
		};

		if (Array.isArray(comments) && comments[comments.length - 1]?.created_at) {
			queries.last_comment_created_at = new Date(
				comments[comments.length - 1].created_at
			).toISOString();
		}

		return await handleRequestStateChanges<{
			comments: TNewsItemCommentsMain;
			hit_comments_limit: boolean;
		}>({
			onInit: async () => {
				requestsActionsDispatch({
					type: requestsConstants.IS_LOADING,
					payload: {
						target: 'initGetComments',
					},
				});

				const { requestInfo, requestInit } =
					networkReqArgs._app.news.item.comments.get({
						urlOptions: {
							params: {
								news_id: news_id,
							},
							queries: queries,
						},
					});

				return await fetch(requestInfo, requestInit);
			},
			onError: (error) => {
				return requestsActionsDispatch({
					type: requestsConstants.ERROR,
					payload: {
						target: 'initGetComments',
						error,
					},
				});
			},
			onSuccess: ({ comments, hit_comments_limit }) => {
				requestsActionsDispatch({
					type: requestsConstants.SUCCESS,
					payload: {
						target: 'initGetComments',
					},
				});
				newsItemExtraDataDispatch({
					type: ENewsItemExtraData.ADD_MAIN_COMMENTS,
					payload: {
						commentsMainData: comments,
						hit_comments_limit,
					},
				});
			},
		});
	}, [
		comments,
		newsItemExtraDataDispatch,
		news_id,
		requestsActionsDispatch,
		requestsConstants.ERROR,
		requestsConstants.IS_LOADING,
		requestsConstants.SUCCESS,
	]);

	const createNewsItemMainComment = async () => {
		// 	commentDispatch,
		// 	{ newsItemExtraDataDispatch, bodyContent, requiredExtraData, token }
		// ) => {

		if (
			!userData ||
			requestState.create?.isLoading ||
			values.content.length < 2
		)
			return;

		const token = userToken;
		const bodyContent = {
			comment_type: 'comment_main',
			content: values.content,
			news_id: news_id,
		} as unknown as TNewsItemCommentTypeMain;
		// newsItemExtraDataDispatch,
		const requiredExtraData = {
			author_id: userData.id,
			author_user_name_id: userData.user_name_id,
			author_first_name: userData.first_name,
			author_last_name: userData.last_name,
			author_profile_picture: userData.profile_picture,
			type: 'comment_main',
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
								// news_comment_id: requiredData.news_comment_id,
								news_id: news_id,
							},
						},
						bodyContent:
							bodyContent as unknown as ICreateNewsItemCommentReqArgsPropsBodyContentTypeCommentMain,
						headersList: {
							Authorization: token && returnBearerTokenIfExist(token),
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
				requestsActionsDispatch({
					type: requestsConstants.SUCCESS,
					payload: {
						target: 'create',
					},
				});

				if (requiredExtraData.type === 'comment_main')
					newsItemExtraDataDispatch({
						type: ENewsItemExtraData.ADD_NEW_MAIN_OR_MAIN_REPLY_COMMENT,
						payload: {
							newCommentData: {
								...requiredExtraData,
								...(bodyContent as unknown as TNewsItemCommentTypeMain),
								type: 'comment_main',
								news_comment_id,
								created_at: new Date().getTime(),
								updated_at: new Date().getTime(),
							},
						},
					});
				setValues({
					content: '',
				});
			},
		});
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		createNewsItemMainComment();
	};

	const loadMoreNewsItemMainComments = useCallback(async () => {
		if (
			parseInt(comments_counter + '') === 0 ||
			hit_comments_limit ||
			!comments ||
			comments.length === 0
		)
			return;

		getMoreNewsItemCommentsMain();
	}, [
		comments_counter,
		hit_comments_limit,
		comments,
		getMoreNewsItemCommentsMain,
	]);

	const handleIsUpdatingContentVisible = (isVisible?: boolean) => {
		setIsCommentTextarea((prevState) =>
			typeof isVisible === 'boolean' ? isVisible : !prevState
		);
	};

	useEffect(() => {
		if (
			parseInt(comments_counter + '') === 0 ||
			hit_comments_limit ||
			newsItemComments.length !== 0
		)
			return;
		if (
			!requestState.initGetComments ||
			(requestState.initGetComments &&
				!requestState.initGetComments.isLoading &&
				!requestState.initGetComments.success &&
				!requestState.initGetComments.error)
		) {
			getMoreNewsItemCommentsMain();
		}
	}, [
		news_id,
		newsDispatch,
		newsItemComments.length,
		requestState.initGetComments,
		hit_comments_limit,
		comments_counter,
		newsItemExtraDataSharedState,
		newsItemExtraDataDispatch,
		getMoreNewsItemCommentsMain,
	]);

	return (
		<div>
			{!!(userData?.id && isCommentTextarea) && (
				<CommentTextarea
					handleSubmit={handleSubmit}
					name='content'
					setValues={setValues}
					value={values.content}
					disableSubmitButton={isSendCommentButtonDisable}
					handleIsCommentTextareaIsVisible={() =>
						handleIsUpdatingContentVisible(false)
					}
				/>
			)}
			{!!(userData?.id && !isCommentTextarea) && (
				<ButtonComponent onClick={() => handleIsUpdatingContentVisible(true)}>
					Add Comment?
				</ButtonComponent>
			)}
			<div>
				{requestState.initGetComments?.isLoading && (
					<p className='isLoadingLoader'>Loading...</p>
				)}
				{requestState.initGetComments?.error && (
					<p className='errorMessage'>{!requestState.initGetComments.error}</p>
				)}
				{newsItemComments.length !== 0 &&
					newsItemComments.map((comment) => (
						<Comment
							commentType='comment_main'
							key={comment.news_comment_id}
							comment={comment}
							news_id={news_id}
						/>
					))}
			</div>
			<div className='buttons-holder'>
				{!hit_comments_limit && comments && comments.length !== 0 && (
					<button
						title='Load more comments'
						disabled={
							requestState.initGetComments?.isLoading ||
							getMoreMainCommentsRequest?.isLoading
						}
						onClick={async () => await loadMoreNewsItemMainComments()}
					>
						<span className={helpersClasses.fontWeightBold}>Load More</span>
					</button>
				)}{' '}
				<button
					title='Hide comments'
					disabled={
						requestState.initGetComments?.isLoading ||
						getMoreMainCommentsRequest?.isLoading
					}
				>
					<span
						className={helpersClasses.fontWeightBold}
						onClick={() => {
							if (isCommentsVisible) handleSetIsCommentsVisible(false);
						}}
					>
						Hide Comments
					</span>
				</button>
			</div>
		</div>
	);
};

export default Comments;
