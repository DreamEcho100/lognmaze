import networkReqArgs from '@coreLib/networkReqArgs';
import { TNewsItemCommentsMain, TNewsItemData } from '@coreLib/ts/global';
import { TGetMoreNewsItemCommentsMain } from '../ts';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';

// const returnBearerToken = (token: string) => `Bearer ${token}`;

const handleLoadingChanges = async <
	TData,
	TInitExtraData = undefined,
	TErrorExtraData = undefined,
	TSuccessExtraData = undefined
>({
	onInit,
	onError,
	onSuccess,
	extraData,
	responseSuccessType = 'json',
}: {
	onInit: (extraData: TInitExtraData) => Promise<Response>;
	onError: (error: string, extraData: TErrorExtraData) => void; // TDispatcher;
	onSuccess: (data: TData, extraData: TSuccessExtraData) => void; // TDispatcher;
	extraData?: {
		init?: TInitExtraData;
		error?: TErrorExtraData;
		success?: TSuccessExtraData;
	};
	responseSuccessType?: 'json' | 'text';
}) => {
	const response = await onInit(
		extraData?.init || ({} as unknown as TInitExtraData)
	);

	if (!response.ok)
		return onError(
			await response.text(),
			extraData?.error || ({} as unknown as TErrorExtraData)
		);

	onSuccess(
		responseSuccessType === 'json'
			? await response.json()
			: await response.text(),
		extraData?.success || ({} as unknown as TSuccessExtraData)
	);
};

type IGetMoreNewsItemCommentsMainExtraProps = {
	news_id: TNewsItemData['news_id'];
};
export const getMoreNewsItemCommentsMain: TGetMoreNewsItemCommentsMain = async (
	newsDispatch,
	{ news_id, urlOptions }
) => {
	await handleLoadingChanges<
		{ comments: TNewsItemCommentsMain; hit_comments_limit: boolean },
		undefined,
		IGetMoreNewsItemCommentsMainExtraProps,
		IGetMoreNewsItemCommentsMainExtraProps
	>({
		onInit: async () => {
			newsDispatch({
				type: NewsItemContextConstants.GET_MORE_MAIN_COMMENTS_PENDING,
				payload: { news_id },
			});

			const { requestInfo, requestInit } =
				networkReqArgs._app.news.item.comments.get({
					urlOptions,
				});

			return await fetch(requestInfo, requestInit);
		},
		onError: (error, errorExtraData) => {
			return newsDispatch({
				type: NewsItemContextConstants.GET_MORE_MAIN_COMMENTS_FAIL,
				payload: { error, news_id: errorExtraData.news_id },
			});
		},
		onSuccess: ({ comments, hit_comments_limit }, errorExtraData) => {
			newsDispatch({
				type: NewsItemContextConstants.GET_MORE_MAIN_COMMENTS_SUCCESS,
				payload: {
					news_id: errorExtraData.news_id,
					newCommentsMainData: comments,
					hit_comments_limit,
				},
			});
		},
		extraData: {
			error: { news_id },
			success: { news_id },
		},
	});
};
