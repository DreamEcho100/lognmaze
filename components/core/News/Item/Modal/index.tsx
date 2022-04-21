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
	modalProps: { isModalVisible, modalVisibilityHandler, modalClasses },
	newsItemProps,
}) => {
	return (
		<ModalComponent
			isModalVisible={isModalVisible}
			modalVisibilityHandler={modalVisibilityHandler}
			modalClasses={modalClasses}
		>
			<Fragment key='body'>
				<NewsItemHeader
					newsItemData={newsItemProps.newsItemData}
					hideHeaderSettings={newsItemProps.hideHeaderSettings}
				/>
				<NewsItemDetails
					newsItemData={newsItemProps.newsItemData}
					isThisAModal={true}
					newsItemDetailsType={newsItemProps.detailsType || 'content'}
					newsItemModelDetailsType={
						newsItemProps.modelDetailsType || 'description'
					}
					handleSetIsModalVisible={modalVisibilityHandler}
				/>
				<NewsItemFooter
					news_id={newsItemProps.newsItemData.news_id}
					hideFooterSettings={newsItemProps.hideFooterSettings}
				/>
			</Fragment>
		</ModalComponent>
	);
};

export default NewsItemModal;
