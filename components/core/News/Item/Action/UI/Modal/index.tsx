import { Fragment } from 'react';
import ModalComponent from '@commonComponentsIndependent/Modal';

import classes from './index.module.css';

type Props = {
	isModalVisible: boolean;
	modalVisibilityHandler: () => void;
	HeaderComponent?: JSX.Element;
	BodyComponent: JSX.Element;
	FooterComponent?: JSX.Element;
};

const NewsItemActionModal = ({
	isModalVisible,
	modalVisibilityHandler,
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
				wrapper: {
					new: classes.wrapper,
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
