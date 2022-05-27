import { Fragment } from 'react';
import ModalComponent from '@commonComponentsIndependent/Modal';

import classes from './index.module.css';

type Props = {
	isModalVisible: boolean;
	modalVisibilityHandler: () => void;
	actionType: 'create' | 'update' | 'delete';
	HeaderComponent?: JSX.Element;
	BodyComponent: JSX.Element;
	FooterComponent?: JSX.Element;
};

const NewsItemActionModal = ({
	isModalVisible,
	modalVisibilityHandler,
	actionType,
	HeaderComponent,
	BodyComponent,
	FooterComponent,
}: Props) => {
	return (
		<ModalComponent
			isModalVisible={isModalVisible}
			modalVisibilityHandler={modalVisibilityHandler}
			modalClasses={{
				containerBody: {
					new: classes.containerBody,
				},
				container: {
					new:
						actionType === 'delete'
							? `${classes.container} ${classes.deleteModalContainer}`
							: classes.container,
				},
			}}
		>
			<Fragment key='header'>{HeaderComponent}</Fragment>
			<Fragment key='body'>{BodyComponent}</Fragment>
			<Fragment key='footer'>{FooterComponent}</Fragment>
		</ModalComponent>
	);
};

export default NewsItemActionModal;
