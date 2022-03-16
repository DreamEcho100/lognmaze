import networkReqArgs from '@coreLib/networkReqArgs';
import { TNewsItemCommentsMain } from '@coreLib/ts/global';
import { TInitGetNewsItemCommentsMain } from '../ts';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
// import { TUseFetchNewsItemMainComments } from '../../ts';
// import { TUseFetchNewsItemMainComments } from '@store/newsContext/ts';

export const initGetNewsItemCommentsMain: TInitGetNewsItemCommentsMain = async (
	newsItemDispatch,
	{ urlOptions }
) => {
	newsItemDispatch({
		type: NewsItemContextConstants.INIT_GET_COMMENTS_PENDING,
	});

	const { requestInfo, requestInit } =
		networkReqArgs._app.news.item.comments.get({
			urlOptions,
		});

	// const fetcher = async ({
	// 	requestInfo,
	// 	requestInit,
	// }: {
	// 	requestInfo: RequestInfo;
	// 	requestInit: RequestInit;
	// }) => {
	const response = await fetch(requestInfo, requestInit);

	if (!response.ok)
		return newsItemDispatch({
			type: NewsItemContextConstants.INIT_GET_COMMENTS_FAIL,
			payload: { error: await response.text() },
		});

	const {
		comments: commentsMainData,
		hit_comments_limit,
	}: { comments: TNewsItemCommentsMain; hit_comments_limit: boolean } =
		await response.json();

	newsItemDispatch({
		type: NewsItemContextConstants.INIT_GET_COMMENTS_SUCCESS,
		payload: { commentsMainData, hit_comments_limit },
	});
};
