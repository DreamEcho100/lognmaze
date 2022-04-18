import { FC, Fragment } from 'react';

import ModalComponent, {
	IModalComponentProps,
} from '@commonComponentsIndependent/Modal';
import { INewsItemProps } from '..';
import NewsItemHeader from '../Header';
import NewsItemDetails from '../Details';
import NewsItemFooter from '../Footer';

interface IProps {
	modalProps: Pick<IModalComponentProps, 'isModalVisible' | 'modalClasses'> & {
		modalVisibilityHandler: (isModalVisible?: boolean) => void;
	};
	newsItemProps: INewsItemProps;
}

const NewsItemModal: FC<IProps> = ({
	// children,
	modalProps: { isModalVisible, modalVisibilityHandler, modalClasses },
	newsItemProps,
}) => {
	return (
		<ModalComponent
			isModalVisible={isModalVisible}
			modalVisibilityHandler={modalVisibilityHandler}
			modalClasses={modalClasses}
			// modalClasses={{
			// 	container: {
			// 		new: classes.modalContainer,
			// 	},
			// }}
		>
			<Fragment key='body'>
				{/* <NewsItem
					{...newsItemProps}
					// handleSetIsModalVisible={modalVisibilityHandler}

					// isFooterSettingsVisible={isFooterSettingsVisible}
					// handleIsFooterSettingsVisible={handleIsFooterSettingsVisible}
					isThisAModal
				/> */}
				<NewsItemHeader
					newsItemData={newsItemProps.newsItemData}
					hideHeaderSettings={newsItemProps.hideHeaderSettings}
				/>
				<NewsItemDetails
					newsItemData={newsItemProps.newsItemData}
					// handleSetIsModalVisible={newsItemProps.handleSetIsModalVisible}
					isThisAModal={true}
					newsItemDetailsType={newsItemProps.detailsType || 'content'}
					newsItemModelDetailsType={
						newsItemProps.modelDetailsType || 'description'
					}
					handleSetIsModalVisible={modalVisibilityHandler}
				/>
				<NewsItemFooter
					// newsItemData={newsItemData}
					news_id={newsItemProps.newsItemData.news_id}
					// isFooterSettingsVisible={isFooterSettingsVisible}
					// handleIsFooterSettingsVisible={handleIsFooterSettingsVisible}
					hideFooterSettings={newsItemProps.hideFooterSettings}
					// isThisAModal={isThisAModal}
				/>
			</Fragment>
		</ModalComponent>
	);
};

export default NewsItemModal;
