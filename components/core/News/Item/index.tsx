import { FC, useState } from 'react';

import classes from './index.module.css';

import { TDate, TNewsItemData } from '@coreLib/ts/global';
import { handleAllClasses } from '@commonLibIndependent/className';

import NewsItemHeader from './Header';
import NewsItemDetails from './Details';
import NewsItemFooter from './Footer';

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
	hideHeaderSettings?: boolean;
	hideFooterSettings?: boolean;
}

const NewsItem: FC<INewsItemProps> = (props) => {
	const {
		newsItemData,
		isThisAModal,
		hideHeaderSettings,
		hideFooterSettings,
		detailsType = 'description',
		modelDetailsType = 'content',
		defaultClasses,
		extraClasses,
		className,
	} = props;

	const [isModalVisible, setIsModalVisible] = useState(false);
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

	const { NewsItemExtraDataContextSharedProvider } =
		setNewsItemExtraDataContextStore({
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
					news_id={newsItemData.news_id}
					hideFooterSettings={hideFooterSettings}
				/>
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

export default NewsItem;
// memo(NewsItem, (prevProps, nextProps) => {
// 	return prevProps.updatedToRenderDate === nextProps.updatedToRenderDate;
// });
