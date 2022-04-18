import { FC, Fragment } from 'react';

import ModalComponent, {
	IModalComponentProps,
} from '@commonComponentsIndependent/Modal';
import NewsItem, { INewsItemProps } from '..';

interface IProps {
	modalProps: Pick<
		IModalComponentProps,
		'isModalVisible' | 'modalVisibilityHandler' | 'modalClasses'
	>;
	newsItemProps: INewsItemProps;
}

const NewsItemModal: FC<IProps> = ({
	// children,
	modalProps: { isModalVisible, modalVisibilityHandler, modalClasses },
	newsItemProps,
}) => {
	// console.log('Math.random()', Math.random());
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
				<NewsItem
					{...newsItemProps}
					// handleSetIsModalVisible={modalVisibilityHandler}

					// isFooterSettingsVisible={isFooterSettingsVisible}
					// handleIsFooterSettingsVisible={handleIsFooterSettingsVisible}
					isThisAModal
				/>
			</Fragment>
		</ModalComponent>
	);
};

export default NewsItemModal;
