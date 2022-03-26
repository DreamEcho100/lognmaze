import { TNewsItemData } from '@coreLib/ts/global';
import { useNewsSharedState } from '@store/NewsContext';

export const useCreateOrUpdateNewsItemNeeds = ({
	actionType = 'create',
	newsItemId,
}: {
	actionType: 'create' | 'update';
	newsItemId?: TNewsItemData['news_id'];
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
	};

	const createOrUpdateRequestAction = requestAction_map[actionType] || {
		isLoading: false,
		error: '',
		success: false,
	};

	const contentRequestAction = (newsItemId &&
		itemsActions[newsItemId]?.requests?.init?.modal?.getTypeBlogContent) || {
		isLoading: false,
		error: '',
		success: false,
	};

	return {
		createOrUpdateRequestAction,
		contentRequestAction,
		newsDataDispatch,
	};
};
