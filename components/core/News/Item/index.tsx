import { FC, Fragment, memo, useEffect, useState } from 'react';

import classes from './index.module.css';

import { TNewsItemData } from '@coreLib/ts/global';
import {
	setNewsItemContextStore,
	useNewsItemSharedState,
} from '@store/newsContext/Item';
import { handleAllClasses } from '@commonLibIndependent/className';

import NewsItemHeader from './Header';
import NewsItemDetails from './Details';
import NewsItemFooter from './Footer';
import ModalComponent from '@commonComponentsIndependent/Modal';
import { initGetNewsItemTypeBlogContent } from '@store/newsContext/Item/actions';

interface INewsItemProvidedContextProps {
	defaultClasses?: string;
	extraClasses?: string;
	className?: string;
	newsItemData: TNewsItemData;
	initActions?: {
		initWithMainComments?: boolean;
		initModalWithGetTypeBlogContent: boolean;
	};
	newsItemDetailsType?: 'description' | 'content';
	hit_comments_limit?: boolean;
	priorityForHeaderImage?: boolean;
}

interface INewsItemProps {
	allClasses: string;
	handleSetIsModalVisible: (isModalVisible: boolean) => void;
	handleIsFooterSettingsVisible: (isFooterSettingsVisible: boolean) => void;
	// isModalVisible: boolean;
	isFooterSettingsVisible: boolean;
	priorityForHeaderImage: boolean;
	isThisAModal?: boolean;
}

const NewsItem: FC<INewsItemProps> = ({
	allClasses,
	handleSetIsModalVisible,
	handleIsFooterSettingsVisible,
	// isModalVisible,
	isFooterSettingsVisible,
	priorityForHeaderImage,
	isThisAModal,
	// newsItemData,
}) => {
	const [
		{
			data: { newsItem: newsItemData },
			actions: {
				init: {
					modal: { getTypeBlogContent },
				},
			},
		},
		newsItemDispatch,
	] = useNewsItemSharedState();

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;

		if (
			isThisAModal &&
			(getTypeBlogContent.isLoading || getTypeBlogContent.error) &&
			newsItemData.type === 'blog' &&
			!newsItemData.type_data.content
		) {
			if (!getTypeBlogContent.error) {
				initGetNewsItemTypeBlogContent(newsItemDispatch, {
					urlOptions: {
						params: {
							news_id: newsItemData.news_id,
						},
					},
				});
				return;
			}

			timeoutId = setTimeout(() => {
				initGetNewsItemTypeBlogContent(newsItemDispatch, {
					urlOptions: {
						params: {
							news_id: newsItemData.news_id,
						},
					},
				});
			}, 1500);
		}

		() => clearTimeout(timeoutId);
	}, [
		getTypeBlogContent.error,
		getTypeBlogContent.isLoading,
		isThisAModal,
		newsItemData.news_id,
		newsItemData.type,
		newsItemData.type_data.content,
		newsItemDispatch,
	]);

	const newsItemProps = {
		className: allClasses,
	};

	return (
		<article {...newsItemProps}>
			<NewsItemHeader priorityForHeaderImage={priorityForHeaderImage} />
			<NewsItemDetails
				handleSetIsModalVisible={handleSetIsModalVisible}
				isThisAModal={isThisAModal}
			/>
			<NewsItemFooter
				isFooterSettingsVisible={isFooterSettingsVisible}
				handleIsFooterSettingsVisible={handleIsFooterSettingsVisible}
			/>
		</article>
	);
};

interface INewsItemProvidedContextMiddlewareProps {
	allClasses: string;
	priorityForHeaderImage: boolean;
}

export const NewsItemProvidedContextMiddleware = ({
	allClasses,
	priorityForHeaderImage,
}: INewsItemProvidedContextMiddlewareProps) => {
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isFooterSettingsVisible, setIsFooterSettingsVisible] = useState(false);

	const handleSetIsModalVisible = (isModalVisible?: boolean) => {
		if (isModalVisible) return setIsModalVisible(isModalVisible);

		return setIsModalVisible((prevState) => !prevState);
	};

	// isModalVisible: boolean,
	// handleSetIsModalVisibleOptions?: { [key: string]: any }
	const handleIsFooterSettingsVisible = (isFooterSettingsVisible: boolean) => {
		if (isFooterSettingsVisible)
			return setIsFooterSettingsVisible(isFooterSettingsVisible);
		if (isFooterSettingsVisible)
			return setIsFooterSettingsVisible((prevState) => !prevState);
	};

	return (
		<>
			<NewsItem
				allClasses={allClasses}
				handleSetIsModalVisible={handleSetIsModalVisible}
				handleIsFooterSettingsVisible={handleIsFooterSettingsVisible}
				// isModalVisible={isModalVisible}
				isFooterSettingsVisible={isFooterSettingsVisible}
				priorityForHeaderImage={priorityForHeaderImage}
			/>
			<ModalComponent
				isModalVisible={isModalVisible}
				modalVisibilityHandler={{
					handleSetIsModalVisible,
				}}
			>
				{/* <Fragment key='header'>
					<header>
						<h2>Header</h2>
					</header>
				</Fragment> */}
				<Fragment key='body'>
					<NewsItem
						allClasses={allClasses}
						handleSetIsModalVisible={handleSetIsModalVisible}
						handleIsFooterSettingsVisible={handleIsFooterSettingsVisible}
						// isModalVisible={isModalVisible}
						isFooterSettingsVisible={isFooterSettingsVisible}
						priorityForHeaderImage={priorityForHeaderImage}
						isThisAModal
					/>
				</Fragment>
				{/* <Fragment key='footer'>
					<footer>
						<h2>footer</h2>
					</footer>
				</Fragment> */}
			</ModalComponent>
		</>
	);
};

export const NewsItemProvidedContext: FC<INewsItemProvidedContextProps> = ({
	defaultClasses = 'newsItem',
	extraClasses,
	className,
	newsItemData,
	newsItemDetailsType = 'description',
	initActions = {
		initWithMainComments: false,
		initModalWithGetTypeBlogContent: true,
	},
	hit_comments_limit = false,
	priorityForHeaderImage = false,
}) => {
	const { NewsItemContextSharedProvider } = setNewsItemContextStore({
		newsItem: newsItemData,
		newsItemDetailsType,
		initActions,
		hit_comments_limit,
	});

	const allClasses = handleAllClasses({
		classes,
		defaultClasses,
		extraClasses,
		className,
	});

	return (
		<NewsItemContextSharedProvider>
			<NewsItemProvidedContextMiddleware
				allClasses={allClasses}
				priorityForHeaderImage={priorityForHeaderImage}
			/>
		</NewsItemContextSharedProvider>
	);
};

const timeAndDatePropsAreEqual = (
	prevNewsItem: INewsItemProvidedContextProps,
	nextNewsItem: INewsItemProvidedContextProps
) => {
	return (
		!prevNewsItem ||
		!prevNewsItem?.newsItemData ||
		new Date(prevNewsItem.newsItemData.updated_at).getTime() >
			new Date(nextNewsItem.newsItemData.updated_at).getTime()
	);
};

const MemoizedNewsItem = memo(
	NewsItemProvidedContext,
	timeAndDatePropsAreEqual
);

export default MemoizedNewsItem;
