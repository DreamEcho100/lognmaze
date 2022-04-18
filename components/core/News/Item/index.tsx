import dynamic from 'next/dynamic';
import { FC, useEffect, useState } from 'react';

import classes from './index.module.css';

import { TDate, TNewsItemData } from '@coreLib/ts/global';
import { useNewsSharedState } from '@store/NewsContext';
import { handleAllClasses } from '@commonLibIndependent/className';

import NewsItemHeader from './Header';
import NewsItemDetails from './Details';
import NewsItemFooter from './Footer';
// import TempNewsItemFooter from './_temp_Footer';

const DynamicNewsItemModal = dynamic(() => import('./Modal'), {
	ssr: false,
});
import { initGetNewsItemTypeBlogContent } from '@store/NewsContext/actions';
import { memo } from 'react-tracked';

interface INewsItemProvidedContextProps {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
	newsItemData: TNewsItemData;
	isThisAModal?: boolean;
	hideHeaderSettings?: boolean;
	hideFooterSettings?: boolean;
	updatedToRenderDate?: TDate;
}

export interface INewsItemProps extends INewsItemProvidedContextProps {
	// handleSetIsModalVisible: (isModalVisible: boolean) => void;
	// isFooterSettingsVisible: boolean;
	// handleIsFooterSettingsVisible: (isFooterSettingsVisible: boolean) => void;
	hideHeaderSettings?: boolean;
	hideFooterSettings?: boolean;
}

const NewsItem: FC<INewsItemProps> = (props) => {
	const {
		newsItemData,
		// handleSetIsModalVisible,
		// isFooterSettingsVisible,
		// handleIsFooterSettingsVisible,
		// isModalVisible,
		isThisAModal,
		hideHeaderSettings,
		hideFooterSettings,
		defaultClasses,
		extraClasses,
		className,
		// updatedToRenderDate,
	} = props;
	const [
		{
			data: { newsExtra: newsExtraData },
			actions: {
				// 	init: {
				// 		modal: { getTypeBlogContent },
				// 	},
				// },
				items: itemsActions,
			},
		},
		newsDispatch,
	] = useNewsSharedState();

	const [isModalVisible, setIsModalVisible] = useState(false);
	// const [isFooterSettingsVisible, setIsFooterSettingsVisible] = useState(false);
	// const [isCommentsVisible, setIsCommentsVisible] = useState({
	// 	main: false,
	// 	modal: false,
	// });
	// const [isCommentsCounterVisible, setIsCommentsCounterVisible] = useState(0);
	// const [focusCommentTextarea, setFocusCommentTextarea] = useState(false);

	// const [
	// 	{
	// 		actions: { items: newsItemsActions },
	// 	},
	// ] = useNewsSharedState();

	// const initGetMainComments =
	// 	newsItemsActions[newsItemData.news_id]?.requests?.init?.getMainComments;

	// const handleSetIsCommentsVisible = (
	// 	isCommentsVisible: SetStateAction<{ main: boolean; modal: boolean }>
	// ) => {
	// 	return setIsCommentsVisible(isCommentsVisible);
	// };

	const handleSetIsModalVisible = (isModalVisible?: boolean) => {
		setIsModalVisible((prevState) =>
			typeof isModalVisible === 'boolean' ? isModalVisible : !prevState
		);

		if (!isModalVisible) {
			document.body.style.overflowX = 'hidden';
			document.body.style.overflowY = 'auto';
		} else {
			document.body.style.overflow = 'hidden';
		}
	};

	const getTypeBlogContent =
		itemsActions[newsItemData.news_id]?.requests?.init?.modal
			?.getTypeBlogContent;
	const newsItemDetailsType =
		newsExtraData[newsItemData.news_id]?.newsItemDetailsType || 'description';
	const newsItemModelDetailsType =
		newsExtraData[newsItemData.news_id]?.newsItemModelDetailsType || 'content';

	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	useEffect(() => {
		// let timeoutId: NodeJS.Timeout;

		if (
			// getTypeBlogContent &&
			isThisAModal &&
			newsItemData.type === 'blog' &&
			!newsItemData.type_data.content &&
			(!getTypeBlogContent ||
				(getTypeBlogContent &&
					!getTypeBlogContent.success &&
					!getTypeBlogContent.isLoading))
		) {
			if (!getTypeBlogContent || !getTypeBlogContent?.error) {
				initGetNewsItemTypeBlogContent(newsDispatch, {
					news_id: newsItemData.news_id,
					urlOptions: {
						params: {
							news_id: newsItemData.news_id,
						},
					},
				});
			} else {
				console.warn('Error with loading the content!');
			}
			return;
		}

		// () => clearTimeout(timeoutId);
	}, [
		getTypeBlogContent,
		isThisAModal,
		newsDispatch,
		newsItemData.news_id,
		newsItemData.type,
		newsItemData.type_data.content,
	]);

	const newsItemProps = {
		className: allClasses,
	};

	return (
		<>
			<article {...newsItemProps}>
				<NewsItemHeader
					newsItemData={newsItemData}
					hideHeaderSettings={hideHeaderSettings}
				/>
				<NewsItemDetails
					newsItemData={newsItemData}
					handleSetIsModalVisible={handleSetIsModalVisible}
					isThisAModal={isThisAModal}
					newsItemDetailsType={newsItemDetailsType}
					newsItemModelDetailsType={newsItemModelDetailsType}
				/>
				<NewsItemFooter
					// newsItemData={newsItemData}
					news_id={newsItemData.news_id}
					comments_counter={newsItemData.comments_counter}
					comments={newsItemData.comments}
					hit_comments_limit={newsItemData.hit_comments_limit}
					// isFooterSettingsVisible={isFooterSettingsVisible}
					// handleIsFooterSettingsVisible={handleIsFooterSettingsVisible}
					hideFooterSettings={hideFooterSettings}
					// isThisAModal={isThisAModal}
				/>
				{/* <TempNewsItemFooter
					isLoadingSkeleton={undefined}
					hideFooterSettings={undefined}
					isLoadingUserVote={undefined}

					
				newsItemData={newsItemData}
				/> */}
			</article>
			<DynamicNewsItemModal
				modalProps={{
					isModalVisible: isModalVisible,
					modalVisibilityHandler: handleSetIsModalVisible,
					modalClasses: {
						container: {
							new: classes.modalContainer,
						},
					},
				}}
				newsItemProps={props}
			/>
		</>
	);
};

/*
export const NewsItemProvidedContextMiddleware = (
	props: INewsItemProvidedContextProps
) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	// const [isFooterSettingsVisible, setIsFooterSettingsVisible] = useState(false);

	const handleSetIsModalVisible = (isModalVisible?: boolean) => {
		setIsModalVisible((prevState) =>
			typeof isModalVisible === 'boolean' ? isModalVisible : !prevState
		);

		if (!isModalVisible) {
			document.body.style.overflowX = 'hidden';
			document.body.style.overflowY = 'auto';
		} else {
			document.body.style.overflow = 'hidden';
		}
	};

	// const handleIsFooterSettingsVisible = (isFooterSettingsVisible: boolean) => {
	// 	if (isFooterSettingsVisible)
	// 		return setIsFooterSettingsVisible(isFooterSettingsVisible);
	// 	if (isFooterSettingsVisible)
	// 		return setIsFooterSettingsVisible((prevState) => !prevState);
	// };

	return (
		<>
			<NewsItem
				{...props}
				handleSetIsModalVisible={handleSetIsModalVisible}
				// isFooterSettingsVisible={isFooterSettingsVisible}
				// handleIsFooterSettingsVisible={handleIsFooterSettingsVisible}
			/>
			{isModalVisible && (
				<>
					<NewsItemModal
						modalProps={{
							isModalVisible: isModalVisible,
							modalVisibilityHandler: handleSetIsModalVisible,
							modalClasses:{
								container: {
									new: classes.modalContainer,
								},
							}
						}}
						newsItemProps={{
							...props,
							handleSetIsModalVisible: handleSetIsModalVisible
						}}
					/>
				<DynamicModalComponent
					isModalVisible={isModalVisible}
					modalVisibilityHandler={handleSetIsModalVisible}
					modalClasses={{
						container: {
							new: classes.modalContainer,
						},
					}}
				>
					<Fragment key='body'>
						<NewsItem
							{...props}
							handleSetIsModalVisible={handleSetIsModalVisible}
							// isFooterSettingsVisible={isFooterSettingsVisible}
							// handleIsFooterSettingsVisible={handleIsFooterSettingsVisible}
							isThisAModal
						/>
					</Fragment>
				</DynamicModalComponent>
				</>
			)}
		</>
	);
};
*/

export default memo(NewsItem, (prevProps, nextProps) => {
	return prevProps.updatedToRenderDate === nextProps.updatedToRenderDate;
});
