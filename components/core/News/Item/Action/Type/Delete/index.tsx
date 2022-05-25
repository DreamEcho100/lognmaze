import { TNewsItemData } from '@coreLib/ts/global';
import useRequestState from '@commonLibDependent/requestState';
import networkReqArgs from '@coreLib/networkReqArgs';
import {
	handleRequestStateChanges,
	returnBearerTokenIfExist,
} from '@commonLibIndependent/fetch';
import NewsItemContextConstants from '@coreLib/constants/store/types/NewsContext/Item';

import NewsItemActionModal from '../../UI/Modal';
import ButtonComponent from '@commonComponentsIndependent/Button';
import NewsItem from '@coreComponents/News/Item';
import { useMemo } from 'react';
import { IDeleteNewsItemReqArgs } from '@coreLib/networkReqArgs/_app/news/[news_id]/ts';
import { useNewsSharedState } from '@store/NewsContext';

interface IProps {
	newsItemData: TNewsItemData;
	userToken?: string;
	modalVisibilityHandler: (isModalVisible?: boolean | undefined) => void;
	isModalVisible: boolean;
}

const NewsItemActionTypeDelete = ({
	newsItemData,
	userToken,
	modalVisibilityHandler,
	isModalVisible,
}: IProps) => {
	const [
		{
			actions: { items: itemsActions },
		},
		newsDispatch,
	] = useNewsSharedState();

	const { requestsState, requestsActionsDispatch, requestsConstants } =
		useRequestState({
			requestString: 'delete',
		});

	const contentRequestAction = useMemo(
		() =>
			(newsItemData.news_id &&
				itemsActions[newsItemData.news_id]?.requests?.init?.modal
					?.getTypeBlogContent) || {
				isLoading: false,
				error: '',
				success: false,
			},
		[itemsActions, newsItemData.news_id]
	);

	const itemsDisabled = useMemo(
		() =>
			!!(
				requestsState.delete.isLoading ||
				(!newsItemData.type_data.content && contentRequestAction.isLoading) ||
				contentRequestAction.error
			),
		[
			contentRequestAction.error,
			contentRequestAction.isLoading,
			requestsState.delete.isLoading,
			newsItemData.type_data.content,
		]
	);

	const deleteNews = async () => {
		await deleteNewsItem({
			bodyContent:
				newsItemData.type === 'blog'
					? { type: newsItemData.type, tags: newsItemData.type_data.tags }
					: { type: newsItemData.type },
		});
	};

	const deleteNewsItem = async ({
		bodyContent,
	}: {
		bodyContent: IDeleteNewsItemReqArgs['bodyContent'];
	}) => {
		await handleRequestStateChanges<string>({
			onInit: async () => {
				requestsActionsDispatch({
					type: requestsConstants.IS_LOADING,
					payload: {
						target: 'delete',
					},
				});

				const { requestInfo, requestInit } =
					networkReqArgs._app.news.item.delete({
						bodyContent,
						urlOptions: {
							params: {
								news_id: newsItemData.news_id,
							},
						},
						headersList: {
							Authorization:
								(userToken && returnBearerTokenIfExist(userToken)) || undefined,
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
				newsDispatch({
					type: NewsItemContextConstants.DELETE_NEWS_ITEM,
					payload: {
						news_id: newsItemData.news_id,
					},
				});
				requestsActionsDispatch({
					type: requestsConstants.SUCCESS,
					payload: {
						target: 'delete',
					},
				});
			},
			responseSuccessType: 'text',
		});
	};

	return (
		<NewsItemActionModal
			modalVisibilityHandler={modalVisibilityHandler}
			isModalVisible={isModalVisible}
			HeaderComponent={
				<header>
					<h2>Are you sure you want to delete it?</h2>
					{requestsState.delete.isLoading && (
						<p className='isLoadingLoader'>Loading missing data...</p>
					)}
					{requestsState.delete.error && (
						<p className='errorMessage'>{requestsState.delete.error}</p>
					)}
					<div className='buttons-holder'>
						<ButtonComponent
							title='Yes, I am sure about that'
							onClick={() => deleteNews()}
							disabled={itemsDisabled}
						>
							Yes
						</ButtonComponent>{' '}
						<ButtonComponent
							title='No, and close the modal'
							onClick={() => modalVisibilityHandler()}
							disabled={itemsDisabled}
						>
							No
						</ButtonComponent>
					</div>
				</header>
			}
			BodyComponent={
				<section>
					<NewsItem
						newsItemData={newsItemData}
						isThisAModal
						hideHeaderSettings
						hideFooterSettings
					/>
				</section>
			}
		/>
	);
};

export default NewsItemActionTypeDelete;
