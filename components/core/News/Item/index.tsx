import { FC, Fragment, memo, useEffect, useState } from 'react';

import classes from './index.module.css';

import { TNewsItemData } from '@coreLib/ts/global';
import { useNewsSharedState } from '@store/newsContext';
import { handleAllClasses } from '@commonLibIndependent/className';

import NewsItemHeader from './Header';
import NewsItemDetails from './Details';
import NewsItemFooter from './Footer';
import ModalComponent from '@commonComponentsIndependent/Modal';
import { initGetNewsItemTypeBlogContent } from '@store/newsContext/actions';

interface INewsItemProvidedContextProps {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
	newsItemData: TNewsItemData;
	isThisAModal?: boolean;
	priorityForHeaderImage?: boolean;
}

interface INewsItemProps extends INewsItemProvidedContextProps {
	handleSetIsModalVisible: (isModalVisible: boolean) => void;
	handleIsFooterSettingsVisible: (isFooterSettingsVisible: boolean) => void;
	isFooterSettingsVisible: boolean;
}

const NewsItem: FC<INewsItemProps> = ({
	newsItemData,
	priorityForHeaderImage = false,
	handleSetIsModalVisible,
	handleIsFooterSettingsVisible,
	// isModalVisible,
	isFooterSettingsVisible,
	isThisAModal,
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
		itemsActions[newsItemData.news_id]?.init?.modal?.getTypeBlogContent;
	const newsItemDetailsType =
		newsExtraData[newsItemData.news_id]?.newsItemDetailsType || 'description';
	const newsItemModelDetailsType =
		newsExtraData[newsItemData.news_id]?.newsItemModelDetailsType || 'content';

	// const priorityForHeaderImage = items[newsItemData.news_id]?.init?.priorityForHeaderImageForFirstIndex;

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
				priorityForHeaderImage={priorityForHeaderImage}
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
				isFooterSettingsVisible={isFooterSettingsVisible}
				handleIsFooterSettingsVisible={handleIsFooterSettingsVisible}
			/>
		</article>
	);
};

export const NewsItemProvidedContextMiddleware = (
	props: INewsItemProvidedContextProps
) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isFooterSettingsVisible, setIsFooterSettingsVisible] = useState(false);

	const handleSetIsModalVisible = (isModalVisible?: boolean) => {
		if (isModalVisible) return setIsModalVisible(isModalVisible);

		return setIsModalVisible((prevState) => !prevState);
	};

	const handleIsFooterSettingsVisible = (isFooterSettingsVisible: boolean) => {
		if (isFooterSettingsVisible)
			return setIsFooterSettingsVisible(isFooterSettingsVisible);
		if (isFooterSettingsVisible)
			return setIsFooterSettingsVisible((prevState) => !prevState);
	};

	return (
		<>
			<NewsItem
				{...props}
				handleSetIsModalVisible={handleSetIsModalVisible}
				handleIsFooterSettingsVisible={handleIsFooterSettingsVisible}
				isFooterSettingsVisible={isFooterSettingsVisible}
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
						handleIsFooterSettingsVisible={handleIsFooterSettingsVisible}
						isFooterSettingsVisible={isFooterSettingsVisible}
						isThisAModal
					/>
				</Fragment>
			</ModalComponent>
		</>
	);
};

export default NewsItemProvidedContextMiddleware;
