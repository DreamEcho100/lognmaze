import networkReqArgs from '@coreLib/networkReqArgs';
import { TNewsItemCommentsMain } from '@coreLib/ts/global';
import { TInitGetNewsItemCommentsMain } from '../ts';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';
// import { TUseFetchNewsItemMainComments } from '../../ts';
// import { TUseFetchNewsItemMainComments } from '@store/newsContext/ts';

export const initGetNewsItemCommentsMain: TInitGetNewsItemCommentsMain = async (
	newsDispatch,
	{ news_id, urlOptions }
) => {
	newsDispatch({
		type: NewsItemContextConstants.INIT_GET_COMMENTS_PENDING,
		payload: { news_id },
	});

	const { requestInfo, requestInit } =
		networkReqArgs._app.news.item.comments.get({
			urlOptions,
		});

	const response = await fetch(requestInfo, requestInit);

	if (!response.ok)
		return newsDispatch({
			type: NewsItemContextConstants.INIT_GET_COMMENTS_FAIL,
			payload: { news_id, error: await response.text() },
		});

	const {
		comments: commentsMainData,
		hit_comments_limit,
	}: { comments: TNewsItemCommentsMain; hit_comments_limit: boolean } =
		await response.json();

	newsDispatch({
		type: NewsItemContextConstants.INIT_GET_COMMENTS_SUCCESS,
		payload: { news_id, commentsMainData, hit_comments_limit },
	});
};
