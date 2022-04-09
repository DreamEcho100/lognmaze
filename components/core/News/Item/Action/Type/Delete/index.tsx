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
	// const [userState, userDispatch] = useUserSharedState();
	// const [newsState, newsDispatch] = useNewsSharedState();
	// const [disableButtons, setDisableButtons] = useState(false);

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

/*
import { useEffect, useState } from 'react';

import { useUserSharedState } from '@store/UserContext';
import { useNewsSharedState } from '@store/NewsContext';
import {
	handleDeletingUserNewsItem,
	handleLoadingNewsItemContent,
} from '@store/NewsContext/actions';

import Button from '@components/UI/V1/Button';
import ActionModal from '../UI/Modal';
import NewsItem from '@components/UI/V1/News/Item';

const ActionHeader = ({ deleteNews, setShowModal, disableButtons }) => {
	return (
		<header>
			<h2>Are you sure you want to delete it?</h2>
			<div className='buttons-holder'>
				<Button
					title='Yes'
					onClick={() => deleteNews()}
					disabled={disableButtons}
				>
					Yes
				</Button>
				<Button
					title='No'
					onClick={() => setShowModal(false)}
					disabled={disableButtons}
				>
					No
				</Button>
			</div>
		</header>
	);
};

const ActionBody = ({ newsItemData }) => {
	return (
		<section>
			<NewsItem
				newsItemData={newsItemData}
				detailsType='content'
				hideHeaderSettings={true}
				hideFooterSettings={true}
			/>
		</section>
	);
};

const DeleteAction = ({ showModal, setShowModal, newsItemData }) => {
	const [userState, userDispatch] = useUserSharedState();
	const [newsState, newsDispatch] = useNewsSharedState();
	const [disableButtons, setDisableButtons] = useState(false);

	const deleteNews = async () => {
		// return {
		// 	news_id: newsItemData.news_id,
		// 	newsType: newsItemData.type,
		// 	tags: newsItemData.tags,
		// };

		setDisableButtons(true);

		const result = await handleDeletingUserNewsItem({
			newsDispatch,
			token: userState.token,
			news_id: newsItemData.news_id,
			newsType: newsItemData.type,
			tags: newsItemData.tags,
		});

		if (result.status === 'error') return setDisableButtons(false);

		if (showModal) setShowModal(false);
	};

	useEffect(() => {
		if (showModal && !newsItemData.content) {
			const loadContent = async () => {
				await handleLoadingNewsItemContent({
					newsDispatch,
					news_id: newsItemData.news_id,
				});
			};

			loadContent();
		}
	}, [newsDispatch, newsItemData.content, newsItemData.news_id, showModal]);

	return (
		<ActionModal
			showModal={showModal}
			setShowModal={setShowModal}
			Header={() => (
				<ActionHeader
					setShowModal={setShowModal}
					deleteNews={deleteNews}
					disableButtons={disableButtons}
				/>
			)}
			Body={() => (
				<ActionBody
					newsItemData={newsItemData}
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			)}
		/>
	);
};

export default DeleteAction;
*/
