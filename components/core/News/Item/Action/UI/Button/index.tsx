import { useState } from 'react';

import { IUserAuthenticatedData, TNewsItemData } from '@coreLib/ts/global';

import ButtonComponent from '@commonComponentsIndependent/Button';
import NewsItemActionTypeCreate from '../../Type/Create';

interface IProps {
	actionType: 'create' | 'update' | 'delete';
	newsItemData?: TNewsItemData;
	userData: IUserAuthenticatedData;
	userToken?: string;
}

const NewsItemActionButton = ({
	actionType,
	newsItemData,
	userData,
	userToken,
}: IProps) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const ButtonComponent_Map = {
		create: 'Create a Blog/Post',
		update: newsItemData && `Update the ${newsItemData.type}`,
		delete: newsItemData && `Delete the ${newsItemData.type}`,
	};
	const modalVisibilityHandler = (isModalVisible?: boolean) =>
		setIsModalVisible((prevState) => isModalVisible || !prevState);

	return (
		<>
			<ButtonComponent onClick={() => modalVisibilityHandler()}>
				{ButtonComponent_Map[actionType]}
			</ButtonComponent>
			{actionType === 'create' && (
				<NewsItemActionTypeCreate
					userData={userData}
					userToken={userToken}
					modalVisibilityHandler={modalVisibilityHandler}
					isModalVisible={isModalVisible}
				/>
			)}
			{actionType === 'update' && <></>}
			{actionType === 'delete' && <></>}
		</>
	);
};

export default NewsItemActionButton;
