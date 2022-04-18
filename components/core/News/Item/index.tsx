import { FC, useState } from 'react';
import { memo } from 'react';

import classes from './index.module.css';

import { TDate, TNewsItemData } from '@coreLib/ts/global';
import { handleAllClasses } from '@commonLibIndependent/className';

import NewsItemHeader from './Header';
import NewsItemDetails from './Details';
import NewsItemFooter from './Footer';
// import TempNewsItemFooter from './_temp_Footer';

import NewsItemModal from './Modal';
import { setNewsItemExtraDataContextStore } from './context';

interface INewsItemProvidedContextProps {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
	newsItemData: TNewsItemData;
	isThisAModal?: boolean;
	hideHeaderSettings?: boolean;
	hideFooterSettings?: boolean;
	updatedToRenderDate?: TDate;
	detailsType?: 'description' | 'content';
	modelDetailsType?: 'description' | 'content';
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
		detailsType = 'description',
		modelDetailsType = 'content',
		defaultClasses,
		extraClasses,
		className,
		// updatedToRenderDate,
	} = props;

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
	};

	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	const newsItemProps = {
		className: allClasses,
	};

	const {
		NewsItemExtraDataContextSharedProvider,
		// , useNewsItemExtraDataSharedState
	} = setNewsItemExtraDataContextStore({
		data: {
			comments: [],
			comments_counter: newsItemData.comments_counter,
			hit_comments_limit: newsItemData.comments_counter === 0,
		},
	});

	return (
		<NewsItemExtraDataContextSharedProvider>
			<article {...newsItemProps}>
				<NewsItemHeader
					newsItemData={newsItemData}
					hideHeaderSettings={hideHeaderSettings}
				/>
				<NewsItemDetails
					newsItemData={newsItemData}
					handleSetIsModalVisible={handleSetIsModalVisible}
					isThisAModal={isThisAModal}
					newsItemDetailsType={detailsType}
					newsItemModelDetailsType={modelDetailsType}
				/>
				<NewsItemFooter
					// newsItemData={newsItemData}
					news_id={newsItemData.news_id}
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
			<NewsItemModal
				modalProps={{
					isModalVisible,
					modalVisibilityHandler: handleSetIsModalVisible,
					modalClasses: {
						container: {
							new: classes.modalContainer,
						},
					},
				}}
				newsItemProps={props}
			/>
		</NewsItemExtraDataContextSharedProvider>
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
