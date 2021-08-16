import { useContext, useState } from 'react';

import UserContext from '@store/UserContext';

import Action from '@components/UI/V1/News/Action/Action';
import Button from '@components/UI/V1/Button';

const CreateNewsButton = () => {
	const { userExist } = useContext(UserContext);

	if (!userExist) {
		return <></>;
	}

	const [showCreateNewsButtonModal, setShowCreateNewsButtonModal] =
		useState(false);

	return (
		<>
			<Button
				title='Create A News'
				onClick={() => setShowCreateNewsButtonModal(true)}
			>
				Create A News
			</Button>
			<Action
				closeModal={() => setShowCreateNewsButtonModal(false)}
				showModal={showCreateNewsButtonModal}
				setShowModal={setShowCreateNewsButtonModal}
				news={{ type: 'article', action: 'create', route: 'add' }}
			/>
		</>
	);
};

export default CreateNewsButton;
