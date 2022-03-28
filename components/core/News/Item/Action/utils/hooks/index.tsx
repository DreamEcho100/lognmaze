import { TNewsItemData } from '@coreLib/ts/global';
import { useNewsSharedState } from '@store/NewsContext';
import { initGetNewsItemTypeBlogContent } from '@store/NewsContext/actions';
import { TNewsContextDispatch } from '@store/NewsContext/ts';
import { useEffect, useMemo } from 'react';

export const useCreateUpdateDeleteNewsItemNeeds = ({
	actionType = 'create',
	newsItemId,
	isLoadingContentProps,
}: // isModalVisible,
// newsItemData,
// newsDispatch,
{
	actionType: 'create' | 'update' | 'delete';
	newsItemId?: TNewsItemData['news_id'];
	isLoadingContentProps?: {
		isModalVisible?: boolean;
		newsItemData?: TNewsItemData;
	};
}) => {
	const [
		{
			actions: { requests: newsActionsRequest, items: itemsActions },
		},
		newsDataDispatch,
	] = useNewsSharedState();

	const requestAction_map = {
		create: newsActionsRequest?.create,
		update: newsItemId && itemsActions[newsItemId]?.requests?.update,
		delete: newsItemId && itemsActions[newsItemId]?.requests?.update,
	};

	const createOrUpdateRequestAction = requestAction_map[actionType] || {
		isLoading:
			(actionType === 'update' || actionType === 'delete') &&
			isLoadingContentProps?.newsItemData &&
			!isLoadingContentProps.newsItemData.type_data.content
				? true
				: false,
		error: '',
		success: false,
	};

	const contentRequestAction = useMemo(
		() =>
			(newsItemId &&
				itemsActions[newsItemId]?.requests?.init?.modal
					?.getTypeBlogContent) || {
				isLoading: false,
				error: '',
				success: false,
			},
		[itemsActions, newsItemId]
	);
	useEffect(() => {
		// let timeoutId: NodeJS.Timeout;

		if (
			(actionType === 'update' || actionType === 'delete') &&
			isLoadingContentProps?.isModalVisible &&
			isLoadingContentProps?.newsItemData &&
			isLoadingContentProps.newsItemData.type === 'blog' &&
			!isLoadingContentProps.newsItemData.type_data.content &&
			!contentRequestAction.success &&
			!contentRequestAction.isLoading
		) {
			initGetNewsItemTypeBlogContent(newsDataDispatch, {
				news_id: isLoadingContentProps.newsItemData.news_id,
				urlOptions: {
					params: {
						news_id: isLoadingContentProps.newsItemData.news_id,
					},
				},
			});
			return;
		}
	}, [
		actionType,
		contentRequestAction,
		isLoadingContentProps,
		newsDataDispatch,
	]);

	return {
		createOrUpdateRequestAction,
		contentRequestAction,
		newsDataDispatch,
	};
};
