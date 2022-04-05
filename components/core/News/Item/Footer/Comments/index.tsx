import { FC, FormEvent, useCallback, useEffect, useState } from 'react';

import helpersClasses from '@styles/helpers.module.css';

import { TNewsItemCommentsMain, TNewsItemData } from '@coreLib/ts/global';
// import {
// 	handleLoadingNewsItemComments,
// 	handlePostingCommentToNewsItem,
// } from '@store/NewsContext/actions';
// import { useNewsSharedState } from '@store/NewsContext';
// import { useUserSharedState } from '@store/UserContext';
import { useUserSharedState } from '@store/UserContext';
// import { useNewsSharedState } from '@store/newsContext';

import Comment from './Comment';
import CommentTextarea from './CommentTextarea';
import {
	getMoreNewsItemCommentsMain,
	initGetNewsItemCommentsMain,
} from '@store/NewsContext/actions/comments';
import { useNewsSharedState } from '@store/NewsContext';
import ButtonComponent from '@commonComponentsIndependent/Button';

interface IProps {
	newsItemComments: TNewsItemCommentsMain;
	handleSetIsCommentsVisible: (isCommentsVisible?: boolean) => void;
	isCommentsVisible: boolean;
	newsItemData: TNewsItemData;
}

const Comments: FC<IProps> = ({
	newsItemComments,
	handleSetIsCommentsVisible,
	isCommentsVisible,
	newsItemData,
}) => {
	const [
		{
			data: { user: userData },
		},
		userDispatch,
	] = useUserSharedState();
	// const [newsDataState, newsDispatch] = useNewsSharedState();

	const [
		{
			actions: { items: newsItemsActions },
		},
		newsDispatch,
	] = useNewsSharedState();

	const [isCommentTextarea, setIsCommentTextarea] = useState(true);

	const initGetMainCommentsRequest =
		newsItemsActions[newsItemData.news_id]?.requests?.init?.getMainComments;
	const getMoreMainCommentsRequest =
		newsItemsActions[newsItemData.news_id]?.requests?.getMoreMainComments;

	// const [userData, userDispatch] = useUserSharedState();
	// const [newsDataState, newsDispatch] = useNewsSharedState();

	const [values, setValues] = useState({
		content: '',
	});

	const [disableSendCommentButton, setDisableSendCommentButton] =
		useState(false);

	const [loadingComments, setLoadingComments] = useState(false);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		setDisableSendCommentButton(true);

		// await handlePostingCommentToNewsItem({
		// 	newsDispatch,
		// 	commentType: 'comment_main',
		// 	commentContent: values.content,
		// 	news_id: newsItemData.news_id,
		// 	user: userData.user,
		// 	token: userData.token,
		// });

		setValues({
			content: '',
		});

		setDisableSendCommentButton(false);
	};

	const loadMoreNewsItemMainComments = useCallback(async () => {
		if (
			newsItemData.comments_counter === 0 ||
			newsItemData.hit_comments_limit ||
			!newsItemData.comments ||
			newsItemData.comments.length === 0
		)
			return;

		await getMoreNewsItemCommentsMain(newsDispatch, {
			news_id: newsItemData.news_id,
			urlOptions: {
				params: {
					news_id: newsItemData.news_id,
				},
				queries: {
					comment_type: 'comment_main',
					last_comment_created_at: new Date(
						newsItemData.comments[newsItemData.comments.length - 1].created_at
					).toISOString(),
				},
			},
		});
	}, [
		newsDispatch,
		newsItemData.comments,
		newsItemData.comments_counter,
		newsItemData.hit_comments_limit,
		newsItemData.news_id,
	]);

	const handleIsUpdatingContentVisible = (isVisible?: boolean) => {
		setIsCommentTextarea((prevState) =>
			typeof isVisible === 'boolean' ? isVisible : !prevState
		);
	};

	// useEffect(() => loadMoreNewsItemMainComments(), [loadMoreNewsItemMainComments]);

	useEffect(() => {
		if (
			!newsItemData.hit_comments_limit &&
			newsItemComments.length === 0 &&
			(!initGetMainCommentsRequest ||
				(initGetMainCommentsRequest &&
					!initGetMainCommentsRequest.isLoading &&
					!initGetMainCommentsRequest.success))
		) {
			(async () =>
				await initGetNewsItemCommentsMain(newsDispatch, {
					news_id: newsItemData.news_id,
					urlOptions: {
						params: {
							news_id: newsItemData.news_id,
						},
						queries: {
							comment_type: 'comment_main',
						},
					},
				}))();
		}
	}, [
		newsItemData.news_id,
		newsDispatch,
		newsItemComments.length,
		initGetMainCommentsRequest,
		newsItemData.hit_comments_limit,
	]);

	return (
		<div>
			{!!(userData?.id && isCommentTextarea) && (
				<CommentTextarea
					handleSubmit={handleSubmit}
					name='content'
					setValues={setValues}
					value={values.content}
					disableSubmitButton={disableSendCommentButton}
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
				{initGetMainCommentsRequest?.isLoading && (
					<p className='isLoadingLoader'>Loading...</p>
				)}
				{initGetMainCommentsRequest?.error && (
					<p className='errorMessage'>{!initGetMainCommentsRequest.error}</p>
				)}
				{initGetMainCommentsRequest &&
					!initGetMainCommentsRequest.isLoading &&
					initGetMainCommentsRequest.success &&
					newsItemComments.length !== 0 &&
					newsItemComments.map((comment) => (
						<Comment
							commentType='comment_main'
							key={comment.news_comment_id}
							comment={comment}
							newsItemData={newsItemData}
						/>
					))}
			</div>
			<div className='buttons-holder'>
				{!newsItemData.hit_comments_limit && (
					<button
						title='Load more comments'
						disabled={
							initGetMainCommentsRequest?.isLoading ||
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
						initGetMainCommentsRequest?.isLoading ||
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
