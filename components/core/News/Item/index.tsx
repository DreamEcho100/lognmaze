import { FC, Fragment, memo, useEffect, useState } from 'react';

import classes from './index.module.css';

import { TNewsItemData } from '@coreLib/ts/global';
import { useNewsSharedState } from '@store/NewsContext';
import { handleAllClasses } from '@commonLibIndependent/className';

import NewsItemHeader from './Header';
import NewsItemDetails from './Details';
import NewsItemFooter from './Footer';
import ModalComponent from '@commonComponentsIndependent/Modal';
import { initGetNewsItemTypeBlogContent } from '@store/NewsContext/actions';

interface INewsItemProvidedContextProps {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
	newsItemData: TNewsItemData;
	isThisAModal?: boolean;
	hideHeaderSettings?: boolean;
	hideFooterSettings?: boolean;
}

interface INewsItemProps extends INewsItemProvidedContextProps {
	handleSetIsModalVisible: (isModalVisible: boolean) => void;
	// isFooterSettingsVisible: boolean;
	// handleIsFooterSettingsVisible: (isFooterSettingsVisible: boolean) => void;
	hideHeaderSettings?: boolean;
	hideFooterSettings?: boolean;
}

const NewsItem: FC<INewsItemProps> = ({
	newsItemData,
	handleSetIsModalVisible,
	// isFooterSettingsVisible,
	// handleIsFooterSettingsVisible,
	// isModalVisible,
	isThisAModal,
	hideHeaderSettings,
	hideFooterSettings,
	defaultClasses,
	extraClasses,
	className,
}) => {
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
			initGetNewsItemTypeBlogContent(newsDispatch, {
				news_id: newsItemData.news_id,
				urlOptions: {
					params: {
						news_id: newsItemData.news_id,
					},
				},
			});
			return;

			// timeoutId = setTimeout(() => {
			// 	initGetNewsItemTypeBlogContent(newsDispatch, {
			// 		news_id: newsItemData.news_id,
			// 		urlOptions: {
			// 			params: {
			// 				news_id: newsItemData.news_id,
			// 			},
			// 		},
			// 	});
			// }, 1500);
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
				newsItemData={newsItemData}
				// isFooterSettingsVisible={isFooterSettingsVisible}
				// handleIsFooterSettingsVisible={handleIsFooterSettingsVisible}
				hideFooterSettings={hideFooterSettings}
			/>
		</article>
	);
};

export const NewsItemProvidedContextMiddleware = (
	props: INewsItemProvidedContextProps
) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	// const [isFooterSettingsVisible, setIsFooterSettingsVisible] = useState(false);

	const handleSetIsModalVisible = (isModalVisible?: boolean) => {
		if (isModalVisible) return setIsModalVisible(isModalVisible);

		return setIsModalVisible((prevState) => !prevState);
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
			<ModalComponent
				isModalVisible={isModalVisible}
				modalVisibilityHandler={{
					handleSetIsModalVisible,
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
			</ModalComponent>
		</>
	);
};

export default NewsItemProvidedContextMiddleware;