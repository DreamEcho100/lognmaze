import { TNewsItemData } from '@coreLib/ts/global';
// import { useUserSharedState } from '@store/UserContext';
// import { useNewsSharedState } from '@store/NewsContext';
import { deleteNewsItem } from '@store/NewsContext/actions';
import { useCreateUpdateDeleteNewsItemNeeds } from '../../utils/hooks';

import NewsItemActionModal from '../../UI/Modal';
import ButtonComponent from '@commonComponentsIndependent/Button';
import NewsItem from '@coreComponents/News/Item';
import { useMemo } from 'react';

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
	const { createOrUpdateRequestAction, contentRequestAction, newsDispatch } =
		useCreateUpdateDeleteNewsItemNeeds({
			actionType: 'delete',
			newsItemId: newsItemData.news_id,
			isLoadingContentProps: {
				isModalVisible,
				newsItemData,
			},
		});

	const itemsDisabled = useMemo(
		() =>
			!!(
				createOrUpdateRequestAction.isLoading ||
				(!newsItemData.type_data.content && contentRequestAction.isLoading) ||
				contentRequestAction.error
			),
		[
			contentRequestAction.error,
			contentRequestAction.isLoading,
			createOrUpdateRequestAction.isLoading,
			newsItemData.type_data.content,
		]
	);

	const deleteNews = async () => {
		await deleteNewsItem(newsDispatch, {
			bodyContent:
				newsItemData.type === 'blog'
					? { type: newsItemData.type, tags: newsItemData.type_data.tags }
					: { type: newsItemData.type },
			news_id: newsItemData.news_id,
			token: userToken,
		});
	};

	return (
		<NewsItemActionModal
			modalVisibilityHandler={modalVisibilityHandler}
			isModalVisible={isModalVisible}
			HeaderComponent={
				<header>
					<h2>Are you sure you want to delete it?</h2>
					{contentRequestAction.isLoading && (
						<p className='isLoadingLoader'>Loading missing data...</p>
					)}
					{contentRequestAction.error && (
						<p className='errorMessage'>{contentRequestAction.error}</p>
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
